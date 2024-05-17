<template>
  <Modal ref="modalRef">
    <template #title>
      <h3>Sündmuse kustutamine</h3>
    </template>
    <template #body>
      <p>Kas sa oled kindel, et soovid sündmust kustutada?</p>
    </template>
    <template #buttons>
      <button @click="sendDeleteMainEventRequest" type="submit"
              class="button-success btn btn-primary text-center text-nowrap">
        Jah
      </button>
      <button @click="closeDeleteMainEventModal" type="submit"
              class="button-danger btn btn-primary text-center text-nowrap">Loobu
      </button>
    </template>
  </Modal>
</template>


<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";
import {useRoute} from "vue-router";

export default {
  name: 'DeleteMainEventModal',
  components: {Modal},
  props: {
    mainEventId: Number
  },
  data() {
    return {
      selectedMainEventId: Number(useRoute().query.selectedMainEventId),
      mainEventId: 0
    }
  },
  methods: {
    sendDeleteMainEventRequest() {
      this.$http.delete("/event/main", {
            params: {
              mainEventId: this.mainEventId
            }
          }
      ).then(() => {
        this.closeDeleteMainEventModal()
        router.push({name: 'eventsRoute'})
        this.$emit('event-deleted')
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    closeDeleteMainEventModal() {
      this.$refs.modalRef.closeModal()
    },
  }
}
</script>
