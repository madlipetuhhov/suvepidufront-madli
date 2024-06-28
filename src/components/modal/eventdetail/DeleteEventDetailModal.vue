<template>
  <Modal ref="modalRef">
    <template #title>
      Sündmuse toimumiskoha kustutamine
    </template>
    <template #body>
      <p>Kas sa oled kindel, et soovid sündmuse toimumiskoha kustutada?</p>
    </template>
    <template #buttons>
      <button @click="sendDeleteEventDetailRequest" type="submit"
              class="button-danger btn btn-primary text-center text-nowrap">
        Jah
      </button>
      <button @click="closeDeleteEventDetailModal" type="submit"
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
  name: 'DeleteEventDetailModal',
  components: {Modal},
  props: {
    eventDetailId: Number
  },
  data() {
    return {
      selectedMainEventId: Number(useRoute().query.selectedMainEventId),
      eventDetailId: 0
    }
  },
  methods: {
    sendDeleteEventDetailRequest() {
      this.$http.delete("/event/detail"
      ).then(() => {
        this.closeDeleteEventDetailModal()
        router.push({name: 'eventDetailRoute'})
        this.$emit('event-detail-deleted')
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    closeDeleteEventDetailModal() {
      this.$refs.modalRef.closeModal()
    },
  }
}
</script>
