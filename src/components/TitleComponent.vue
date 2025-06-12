<template>
  <header class="non-draggable pointer-events-none">
    <img src="/cabecalho-form.png" alt="Banner Rainha da Paz" class="w-full object-cover mb-4 rounded-md shadow" />

    <div class="text-justify space-y-2 px-4 text-sm md:text-md lg:text-lg">
      <h1 class="text-[--primary] text-xl font-semibold">Inscrição para oficina no evento de 75 do Rainha</h1>

      <p>
        Caras professoras e professores,
      </p>
      <p>
        Pedimos que selecionem abaixo a oficina e o horário de sua preferência para participação no dia do aniversário do Rainha (23/08). Haverá dois turnos (das 9h30 às 11h30 e das 11h30 às 13h30) e é necessário se inscrever apenas em um turno.


        <!-- <br> -->

      </p>
      <p>
        Quando as vagas para determinada oficina estiverem esgotadas, a inscrição ficará inabilitada. <br>
        Prazo para inscrições: até o dia 23/06.
        Muito obrigado!
      </p>
      <!-- <p>
        O evento acontecerá no <strong>dia xx de xxxxx de 2025</strong>, das <strong>xxh às xxh</strong>.
      </p>

      <p class="bg-neutral-50 p-3 rounded-md border text-[--primary] font-medium">
        Para isso, pedimos que escolha uma das oficinas disponíveis, de acordo com sua preferência e disponibilidade.
        Fique atento ao número de vagas por turno (manhã ou tarde), pois são limitadas.
      </p> -->
    </div>
  </header>
</template>

<style scoped>
.non-draggable {
  user-select: none;
  -webkit-user-drag: none;
  -moz-user-drag: none;
  -ms-user-drag: none;
}
</style>
