<script lang="ts" setup>
import AlertComponent from "@/components/AlertComponent.vue";
import { Button } from "@/components/ui/button";
import { useFormState } from "@/states/formState";
import { useFormUtils } from "@/utils/formUtils";
import { ref } from "vue";
import ModalComponent from "@/components/ModalComponent.vue"; // Correct import

// Form state
const { form, alertState, isLoading, resetForm } = useFormState();

// Reference for the ModalComponent
const modalRef = ref<InstanceType<typeof ModalComponent> | null>(null);

const { handleSubmit, updateCPF, updateWhatsApp } = useFormUtils(form, alertState, isLoading, resetForm, modalRef);
</script>

<template>
  <!-- Alert Component -->
  <AlertComponent v-if="alertState.message" :message="alertState.message" :statusCode="alertState.statusCode" />

  <div class="shadow-lg bg-white p-4 rounded-lg">
    <form class="space-y-4" @submit.prevent="handleSubmit">
      <div>
        <label for="cpf">CPF</label>
        <input id="cpf" v-model="form.cpf" @input="updateCPF" class="p-2 w-full" placeholder="000.000.000-00" required
          type="text" inputmode="numeric" />
      </div>

      <div>
        <label for="nome">Nome</label>
        <input id="nome" v-model="form.nome" class="p-2 w-full" placeholder="Nome completo" required type="text" />
      </div>

      <div>
        <label for="dataNascimento">Data de Nascimento</label>
        <input id="dataNascimento" v-model="form.dataNasc" class="text-neutral-400 p-2 w-full" required type="date" />
      </div>

      <div>
        <label for="whatsapp">WhatsApp</label>
        <input id="whatsapp" v-model="form.whatsapp" @input="updateWhatsApp" class="p-2 w-full"
          placeholder="ddd + telefone" required type="text" inputmode="numeric" maxlength="15" />
      </div>

      <div>
        <label for="email">Email</label>
        <input id="email" v-model="form.email" class="p-2 w-full" placeholder="email@gmail.com" required type="email"
          inputmode="email" />
      </div>

      <div>
        <label for="anoFormacao">
          Ano em que se formou no Rainha
        </label>
        <input id="anoFormacao" min="1950" max="2024" v-model="form.dataFormacao" class="p-2 w-full"
          placeholder="Ex: 2005" type="number" inputmode="numeric" />
      </div>

      <div>
        <label for="anoSaida">
          Caso não tenha terminado o Ensino Médio no Rainha, em que ano saiu do Colégio?
        </label>
        <input id="anoSaida" min="1950" max="2024" v-model="form.dataSaida" placeholder="Ex: 2005" class="p-2 w-full"
          type="number" inputmode="numeric" />
      </div>

      <div>
        <label for="possuiFilho">
          Possui filho matriculado no Rainha?
        </label>
        <select id="possuiFilho" v-model="form.filhoMatriculado" class="p-2 w-full border block">
          <option value="" disabled>Selecione uma opção</option>
          <option value="Sim">Sim</option>
          <option value="Não">Não</option>
        </select>
      </div>

      <Button class="flex w-50 hover:bg-[#415272]" :disabled="isLoading">Enviar</Button>
    </form>
  </div>

  <!-- Include ModalComponent with ref -->
  <ModalComponent v-if="alertState.statusCode === 200" ref="modalRef" />
</template>

<style scoped>
input,
option,
select {
  @apply bg-neutral-50 border rounded-md px-3;
}

input::placeholder {
  @apply text-neutral-400;
}

option[disabled] {
  @apply text-neutral-300;
}

.opcional {
  opacity: 0.5;
  font-size: 11px;
}
</style>
