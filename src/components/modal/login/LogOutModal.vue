<template>
  <Modal ref="modalRef">
    <template #title>
      <h3>Soovid välja logida?</h3>
    </template>
    <template #buttons>
      <button @click="executeLogOut" type="submit" class="button-danger btn btn-primary text-center text-nowrap">Logi välja</button>
      <button @click="closeLogOutModal" type="submit" class="button-cancel btn btn-primary text-center text-nowrap">Loobu</button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";


export default {
  name: 'LogOutModal',
  components: {Modal},
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
