import { formatCPF, isValidCPF } from "@/utils/cpf";
import { formatWhatsApp } from "@/utils/whatsapp";
import type { Ref } from "vue";

export function useFormUtils(form: any, alertState: any, isLoading: Ref<boolean>, resetForm: () => void, modalRef: Ref<any>) {
  async function handleSubmit(): Promise<void> {
    if (isLoading.value) return; // Prevent multiple submissions

    // Reset alert state before request
    alertState.error = false;
    alertState.message = "";
    alertState.statusCode = 0;
    isLoading.value = true;

    if (form.cpf.replace(/\D/g, "").length !== 11) {
      alertState.error = true;
      alertState.message = "CPF deve ter 11 dígitos!";
      alertState.statusCode = 400; // Bad Request
      isLoading.value = false;
      return;
    }

    if (!isValidCPF(form.cpf)) {
      alertState.error = true;
      alertState.message = "CPF inválido!";
      alertState.statusCode = 400; // Bad Request
      isLoading.value = false;
      return;
    }

    if (form.whatsapp.replace(/\D/g, "").length !== 11) {
      alertState.error = true;
      alertState.message = "Número de celular inválido!";
      alertState.statusCode = 400; // Bad Request
      isLoading.value = false;
      return;
    }

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      let result;
      try {
        result = await response.json();
      } catch (error) {
        // In case parsing fails, set a default message
        result = { message: "Resposta inesperada do servidor." };
      }

      if (response.ok) {
        alertState.error = false;
        alertState.message = "Formulário enviado com sucesso!";
        alertState.statusCode = response.status;

        // Use optional chaining to avoid errors if modalRef.value is null
        modalRef.value?.openModal();
        resetForm();
      } else {
        alertState.error = true;
        alertState.message =
          result.message || `Erro ${response.status}: ${response.statusText}`;
        alertState.statusCode = response.status;
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      alertState.error = true;
      alertState.message = "Erro inesperado. Tente novamente mais tarde.";
      alertState.statusCode = 500;
    } finally {
      isLoading.value = false;
    }
  }

  const updateCPF = (): void => {
    form.cpf = formatCPF(form.cpf);
  };

  const updateWhatsApp = (): void => {
    form.whatsapp = formatWhatsApp(form.whatsapp);
  };

  return { handleSubmit, updateCPF, updateWhatsApp };
}
