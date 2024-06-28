<template>
  <div>
    <header>
      <Hero/>
    </header>
    <section class="container text-center">
      <h2>Homeview vaade</h2>
    </section>

  </div>
</template>

<script>

import Hero from "@/components/Hero.vue"

export default {
  name: 'HomeView',
  components: {Hero},
}
</script>
