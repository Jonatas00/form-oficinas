<script lang="ts" setup>
import AlertComponent from "@/components/AlertComponent.vue";
import ModalComponent from "@/components/ModalComponent.vue";
import { Button } from "@/components/ui/button";
import { ref, onMounted, computed } from "vue";

interface Oficina {
  id: number;
  nome: string;
  local: string;
  limite_turno1: number;
  limite_turno2: number;
}

interface RespostaInscricao {
  sucesso?: boolean;
  error?: string;
}

const nome = ref("");
const email = ref("");
const oficinaId = ref<string>("");
const turno = ref("");
const oficinas = ref<Oficina[]>([]);
const mensagem = ref("");
const sucesso = ref(false);
const modalRef = ref<InstanceType<typeof ModalComponent> | null>(null);

const API_URL = import.meta.env.VITE_API_URL as string;

const carregarOficinas = async () => {
  const response = await fetch(`${API_URL}/oficinas`);
  oficinas.value = await response.json();
};

const oficinaSelecionada = computed(() =>
  oficinas.value.find(oficina => oficina.id === Number(oficinaId.value))
);

const turnoDisponivel = (oficina: Oficina) =>
  turno.value === "turno1" ? oficina.limite_turno1 : oficina.limite_turno2;

const validarInscricao = () => {
  const oficina = oficinaSelecionada.value;
  if (!oficina) return "Oficina inválida.";
  if (turnoDisponivel(oficina) <= 0)
    return "Limite de vagas atingido para o turno selecionado.";
  return null;
};

const inscrever = async () => {
  mensagem.value = "";
  sucesso.value = false;

  const erro = validarInscricao();
  if (erro) {
    mensagem.value = erro;
    return;
  }

  const response = await fetch(`${API_URL}/inscrever`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome: nome.value,
      email: email.value,
      oficina_id: Number(oficinaId.value),
      turno: turno.value,
    }),
  });

  const data: RespostaInscricao = await response.json();

  if (response.ok && data.sucesso) {
    mensagem.value = "Inscrição realizada com sucesso!";
    sucesso.value = true;
    await carregarOficinas();
    modalRef.value?.openModal();

    nome.value = "";
    email.value = "";
    oficinaId.value = "";
    turno.value = "";
  } else {
    mensagem.value = data.error || "Erro ao realizar inscrição.";
  }
};

onMounted(carregarOficinas);
</script>

<template>
  <AlertComponent v-if="mensagem" :message="mensagem" :sucesso="sucesso" />

  <div class="shadow-lg bg-white p-4 rounded-lg">
    <form class="space-y-4" @submit.prevent="inscrever">
      <div>
        <label for="nome">Nome</label>
        <input id="nome" v-model="nome" type="text" required placeholder="Seu nome" class="p-2 w-full" />
      </div>

      <div>
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" required placeholder="email@email.com" class="p-2 w-full" />
      </div>

      <div>
        <label for="oficina">Oficina</label>
        <select id="oficina" v-model="oficinaId" required class="p-2 w-full border block">
          <option disabled value="">Selecione</option>
          <option v-for="oficina in oficinas" :key="oficina.id" :value="oficina.id"
            :disabled="oficina.limite_turno1 === 0 && oficina.limite_turno2 === 0">
            {{ oficina.nome }} ({{ oficina.local }}) |
            Vagas manhã: {{ oficina.limite_turno1 }},
            Vagas tarde: {{ oficina.limite_turno2 }}
          </option>
        </select>
      </div>

      <div>
        <label for="turno">Turno</label>
        <select id="turno" v-model="turno" required class="p-2 w-full border block">
          <option disabled value="">Selecione</option>
          <option value="turno1" :disabled="oficinaSelecionada && oficinaSelecionada.limite_turno1 === 0">
            9h30 às 11h30
          </option>
          <option value="turno2" :disabled="oficinaSelecionada && oficinaSelecionada.limite_turno2 === 0">
            11h30 às 13h30
          </option>
        </select>
      </div>

      <Button class="flex w-full hover:bg-[(--btn-hover)]">Inscrever</Button>
    </form>
  </div>

  <ModalComponent v-if="sucesso" ref="modalRef" />
</template>

<style scoped>
input,
select,
option {
  @apply bg-neutral-50 border rounded-md px-3;
}

input::placeholder {
  @apply text-neutral-400;
}

option[disabled] {
  @apply text-neutral-300;
}
</style>
