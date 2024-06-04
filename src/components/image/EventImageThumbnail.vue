<template>
  <div >
    <img style="height: 50px" v-if="imageData === ''" src="../../assets/images/placeholder-image.jpg" class="img-thumbnail" alt="sündmuse vaikimisi pilt">
    <img style="height: 50px" v-else :src="imageData" class="img-thumbnail" alt="sündmuse korraldaja valitud pilt">
  </div>
</template>
<script>
export default {
  name: 'EventImageThumbnail',
  props: {
    imageData: String
  }
}
</script>