<template>
  <Modal ref="modalRef">
    <template #title>
      <h3>Piletite kustutamine</h3>
    </template>
    <template #body>
      <p>Kas sa oled kindel, et soovid kustutada sündmuse piletid?</p>
    </template>
    <template #buttons>
      <button @click="sendDeleteTicketRequest" type="submit"
              class="button-danger btn btn-primary text-center text-nowrap">
        Jah
      </button>
      <button @click="closeDeleteTicketModal" type="submit"
              class="button-neutral btn btn-primary text-center text-nowrap">Loobu
      </button>
    </template>
  </Modal>
</template>


<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";
import {useRoute} from "vue-router";

export default {
  name: 'DeleteTicketModal',
  components: {Modal},
  props: {
    eventTicketId: Number
  },
  data() {
    return {
      eventTicketId: 0
    }
  },
  methods: {
    sendDeleteTicketRequest() {
      this.$http.delete("/ticket", {
            params: {
              eventTicketId: this.eventTicketId
            }
          }
      ).then(() => {
        this.closeDeleteTicketModal()
        this.$emit('event-tickets-removed')
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    closeDeleteTicketModal() {
      this.$refs.modalRef.closeModal()
    },
  }
}
</script>
