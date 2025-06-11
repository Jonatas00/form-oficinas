import { reactive, ref } from "vue";

// Define the type for the form
type FormType = {
  cpf: string;
  nome: string;
  whatsapp: string;
  email: string;
  dataFormacao: string;
  dataSaida: string;
  dataNasc: string;
  filhoMatriculado: string;
};

export function useFormState() {
  // Form state
  const form = reactive<FormType>({
    cpf: "",
    nome: "",
    whatsapp: "",
    email: "",
    dataFormacao: "",
    dataSaida: "",
    dataNasc: "",
    filhoMatriculado: "",
  });

  // Alert state
  const alertState = reactive({
    error: false,
    message: "",
    statusCode: 0,
  });

  // Loading state
  const isLoading = ref(false);

  // Reset form and alert state
  const resetForm = (): void => {
    Object.assign(form, {
      cpf: "",
      nome: "",
      whatsapp: "",
      email: "",
      dataFormacao: "",
      dataSaida: "",
      dataNasc: "",
      filhoMatriculado: "",
    });
  };

  return { form, alertState, isLoading, resetForm };
}
