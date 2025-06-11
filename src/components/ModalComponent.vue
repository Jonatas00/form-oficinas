<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@/components/ui/button';

const showModal = ref(true);

const openModal = () => {
	showModal.value = true;
};

const closeModal = () => {
	showModal.value = false;
};

// Expose the openModal function so the parent can call it
defineExpose({ openModal });
</script>
<template>
	<div v-if="showModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
		<div class="sm:mx-5 bg-white p-6 rounded-lg shadow-lg">
			<div class="flex flex-col items-center">
				<h3 class="text-xl font-semibold text-green-600">Agradecemos pelas informações</h3>
				<div class="py-5 text-justify">
					<p>Será um prazer recebe-lo novamente no Rainha!</p>
					<p>
						Em breve você receberá via e-mail o convite nominal para seu ingresso no evento.
					</p>
				</div>
				<Button class="w-[50%] hover:bg-[#415272]" @click="closeModal">Fechar</Button>
			</div>
		</div>
	</div>
</template>
<style scoped>
.bg-opacity-75 {
	background-color: rgba(0, 0, 0, 0.75);
}
</style>
