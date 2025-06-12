<template>
  <header class="non-draggable pointer-events-none">
    <img src="/banner.png" alt="Banner Rainha da Paz" class="w-full object-cover mb-4 rounded-md shadow" />

    <div class="text-justify space-y-4 p-4">
      <h1 class="text-[--primary] text-xl font-semibold">Inscrições para oficina</h1>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, aliquid corrupti! Illo atque voluptates mollitia
        libero impedit explicabo nobis fugiat vero, deserunt asperiores itaque accusantium, repudiandae corrupti maxime
        laboriosam sit.
      </p>
      <p>
        O evento acontecerá no <strong>dia xx de xxxxx de 2025</strong>, das <strong>xxh às xxh</strong>.
      </p>

      <p class="bg-neutral-50 p-3 rounded-md border text-[--primary] font-medium">
        Para isso, pedimos que escolha uma das oficinas disponíveis, de acordo com sua preferência e disponibilidade.
        Fique atento ao número de vagas por turno (manhã ou tarde), pois são limitadas.
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