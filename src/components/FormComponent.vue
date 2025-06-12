<script lang="ts" setup>
import AlertComponent from "@/components/AlertComponent.vue";
import ModalComponent from "@/components/ModalComponent.vue";
import { Button } from "@/components/ui/button";
import { ref, onMounted } from "vue";

// Tipagens
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

// Refs e estado
const nome = ref("");
const email = ref("");
const oficinaId = ref<string>("");
const turno = ref("");
const oficinas = ref<Oficina[]>([]);
const mensagem = ref("");
const sucesso = ref(false);
const modalRef = ref<InstanceType<typeof ModalComponent> | null>(null);

const API = import.meta.env.VITE_API_URL as string;

async function carregarOficinas() {
  const res = await fetch(`${API}/oficinas`);
  oficinas.value = await res.json();
}

async function inscrever() {
  mensagem.value = "";
  sucesso.value = false;

  const oficinaSelecionada = oficinas.value.find(
    (o) => o.id === parseInt(oficinaId.value)
  );

  if (!oficinaSelecionada) {
    mensagem.value = "Oficina inválida.";
    return;
  }

  const vagasDisponiveis =
    turno.value === "turno1"
      ? oficinaSelecionada.limite_turno1
      : oficinaSelecionada.limite_turno2;

  if (vagasDisponiveis <= 0) {
    mensagem.value = "Limite de vagas atingido para o turno selecionado.";
    return;
  }

  const res = await fetch(`${API}/inscrever`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome: nome.value,
      email: email.value,
      oficina_id: parseInt(oficinaId.value),
      turno: turno.value,
    }),
  });

  const data: RespostaInscricao = await res.json();

  if (res.ok && data.sucesso) {
    mensagem.value = "Inscrição realizada com sucesso!";
    sucesso.value = true;
    await carregarOficinas();
    modalRef.value?.openModal();
  } else {
    mensagem.value = data.error || "Erro ao realizar inscrição.";
  }
}

onMounted(carregarOficinas);
</script>

<template>
  <AlertComponent v-if="mensagem" :message="mensagem" :statusCode="sucesso ? 200 : 400" />

  <div class="shadow-lg bg-white p-4 rounded-lg">
    <form class="space-y-4" @submit.prevent="inscrever">
      <div>
        <label for="nome">Nome</label>
        <input id="nome" v-model="nome" class="p-2 w-full" required type="text" placeholder="Seu nome" />
      </div>

      <div>
        <label for="email">Email</label>
        <input id="email" v-model="email" class="p-2 w-full" required type="email" placeholder="email@email.com" />
      </div>

      <div>
        <label for="oficina">Oficina</label>
        <select id="oficina" v-model="oficinaId" required class="p-2 w-full border block">
          <option disabled value="">Selecione</option>
          <option v-for="oficina in oficinas" :key="oficina.id" :value="oficina.id"
            :disabled="oficina.limite_turno1 === 0 && oficina.limite_turno2 === 0">
            {{ oficina.nome }} ({{ oficina.local }}) |
            Vagas: T1 {{ oficina.limite_turno1 }}, T2 {{ oficina.limite_turno2 }}
          </option>
        </select>
      </div>

      <div>
        <label for="turno">Turno</label>
        <select id="turno" v-model="turno" required class="p-2 w-full border block">
          <option disabled value="">Selecione</option>
          <option value="turno1">Turno 1</option>
          <option value="turno2">Turno 2</option>
        </select>
      </div>

      <Button class="flex w-full hover:bg-blue-700" :disabled="false">Inscrever</Button>
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
