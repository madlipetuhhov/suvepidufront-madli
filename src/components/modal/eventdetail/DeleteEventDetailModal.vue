<template>
  <Modal ref="modalRef">
    <template #title>
      <h3>Kustutamine</h3>
    </template>
    <template #body>
      <p>Kas sa oled kindel, et soovid lisainfo kustutada?</p>
    </template>
    <template #buttons>
      <button @click="sendDeleteEventDetailRequest" type="submit"
              class="button-success btn btn-primary text-center text-nowrap">
        Jah
      </button>
      <button @click="closeDeleteEventDetailModal" type="submit"
              class="button-cancel btn btn-primary text-center text-nowrap">Loobu
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
