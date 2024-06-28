<template>
  <OutModal ref="modalRef">
    <template #title>
      Soovid välja logida?
    </template>
    <template #buttons>
      <button @click="executeLogOut" type="submit" class="button-danger btn btn-primary text-center text-nowrap">Logi välja</button>
      <button @click="closeLogOutModal" type="submit" class="button-neutral btn btn-primary text-center text-nowrap">Loobu</button>
    </template>
  </OutModal>
</template>

<script>
import router from "@/router";
import OutModal from "@/components/modal/OutModal.vue";


export default {
  name: 'LogOutModal',
  components: {OutModal},
    methods: {
      executeLogOut(){
        sessionStorage.clear()
        this.$emit('event-update-nav-menu')
        this.$refs.modalRef.closeModal()
        router.push({name: 'homeRoute'})
      },

      closeLogOutModal() {
        this.$refs.modalRef.closeModal()
      },
  },

}


</script>
