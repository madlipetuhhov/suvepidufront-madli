<template>
  <div >
    <img style="height: 50px" v-if="imageData === ''" src="../../assets/logo.png" class="img-thumbnail" alt="pangaautomaadi vaikimisi pilt">
    <img style="height: 50px" v-else :src="imageData" class="img-thumbnail" alt="pangaautomaadi kasutaia valitud pilt">
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