<template>
  <div>
    <img v-if="imageData === ''" src="../../assets/images/placeholder-image.jpg" class="img-fluid"
         alt="sündmuse vaikimisi pilt">
    <img v-else :src="imageData" class="img-fluid" alt="sündmuse korraldaja valitud pilt">
  </div>
</template>
<script>
export default {
  name: 'EventImage',
  props: {
    imageData: String
  }
}
</script>