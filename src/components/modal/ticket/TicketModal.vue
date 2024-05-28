<template>
  <Modal ref="modalRef">
    <template #title>
      Lisa pilet
    </template>
    <template #body>
      <div class="row">
        <div class="container text-center">
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Vali piletitüüp</label>
            <TicketTypeDropdown v-model="selectedTypeId" @change="getAndSetSelectedTypeId"/>
          </div>
          <div class="mb-3">
            <label for="" class="form-label">Kogu piletite arv</label>
            <input v-model="total" type="number" class="form-control" id="">
          </div>
          <button @click="addEventTicket" type="submit" class="btn btn-primary">Lisa</button>
        </div>
      </div>
    </template>
  </Modal>
</template>
<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";
import TicketTypeDropdown from "@/components/event/TicketTypeDropdown.vue";

export default {
  name: "TicketModal",
  components: {TicketTypeDropdown, Modal},

  data() {
    return {
      selectedTypeId: 0,
      eventTicketInfo: {
        eventDetailId: 1,
        ticketTypeId: 0,
        total: 0
      }
    }
  },
  methods: {
    addEventTicket() {
      this.$http.post("/event/ticket", this.eventTicketInfo
      ).then(() => {
        this.closeTicketModal()
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },
    closeTicketModal() {
      this.$refs.ticketModalRef.$refs.modalRef.closeModal()
    },
    getAndSetSelectedTypeId() {
      this.eventTicketInfo.ticketTypeId = this.selectedTypeId
    },
  }
}
</script>