<script setup>
const carregarEExportar = async () => {
    try {
        const response = await fetch('/dados.json'); // <- arquivo na raiz do projeto
        const jsonData = await response.json();

        const ws = XLSX.utils.json_to_sheet(jsonData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Planilha");

        XLSX.writeFile(wb, "dados_oficinas_professores.xlsx");
    } catch (error) {
        alert("Erro ao carregar o JSON: " + error.message);
    }
}
</script>

<template>
        <button
            @click="carregarEExportar()"
            class="my-3 border px-4 border-gray-400 hover:bg-gray-200 rounded-sm">
            Gerar planilha
        </button>
</template>
