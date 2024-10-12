<template>
  <v-app>
    <v-main>
      <Mapa />
    </v-main>
  </v-app>
</template>

<script setup>
  import { inject } from 'vue'

  const marcadores = inject('marcadores')
  //setInterval (() => { marcadores.shift(); }, 5000)

</script>
