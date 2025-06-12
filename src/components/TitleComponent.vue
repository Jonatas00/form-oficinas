<template>
  <header class="non-draggable pointer-events-none">

    <img src="/banner.png" alt="Banner-rainha">
    <div class="text-justify space-y-1 max-w-[90%] lg:max-w mx-auto text-sm sm:text-base md:text-lg">

      <h1 class="text-[#] text-lg">Teste</h1>
      <p>
        Com alegria, convidamos você, que fez e ainda faz parte da nossa trajetória, para partilharmos desse momento
        especial!
      </p>
      <p>
        Será no dia 09 de agosto 2025, das 10h às 12h, aqui no Colégio Rainha da Paz.
      </p>
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
