<template>
  <Modal ref="modalRef">
    <template #title>
      <h3>{{ isAdd ? "Lisa pileti kogus" : "Muuda piletite kogust" }}</h3>
    </template>

    <template #body>
      <div class="row">
        <div class="container text-center">

          <div class="mb-3">
            <label for="ticket-type" class="form-label">Piletitüüp</label>
            <input v-model="eventTicketInfo.ticketTypeName" type="text" class="form-control">
          </div>
          <div class="mb-3">
            <label for="ticket-price" class="form-label">Piletite arv</label>
            <input v-model="eventTicketInfo.total" type="number" class="form-control">
          </div>
<!--          <div class="mb-3">-->
<!--            <label for="ticket-price" class="form-label">Saadaval piletid</label>-->
<!--            <input v-model="eventTicketInfo.available" type="number" class="form-control">-->
<!--          </div>-->

          <!--          <div class="mb-3">-->
          <!--            <label class="form-label">Vali piletitüüp</label>-->
          <!--            -->
          <!--            <TicketTypeDropdown v-model="eventTicketRequest.ticketTypeId" ref="ticketTypeDropdownRef"-->
          <!--                                @event-selected-ticket-type-change="setSelectedTicketTypeId"/>-->
          <!--          </div>-->
          <!--          <div class="mb-3">-->
          <!--            <label for="" class="form-label">Kogu piletite arv</label>-->
          <!--            <input v-model="eventTicketRequest.total" type="number" class="form-control" id="">-->
          <!--          </div>-->
        </div>
      </div>
    </template>

    <template #buttons>
      <button v-if="isAdd" @click="sendAddTicketsRequest" type="button" class="btn button-success btn-primary">Lisa
      </button>
      <button v-else @click="sendPutTicketsRequest" type="button" class="btn button-neutral btn-primary">Salvesta
      </button>
      <button @click="closeTicketModal" type="button"
              class="button-danger btn btn-primary text-center text-nowrap">Loobu
      </button>
    </template>

  </Modal>
</template>
<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";
// import TicketTypeDropdown from "@/components/dropdown/TicketTypeDropdown.vue";
import {useRoute} from "vue-router";

export default {
  name: "TicketModal",
  components: {Modal},

  data() {
    return {
      isAdd: true,
      eventDetailId: Number(useRoute().query.eventDetailId),
      selectedTicketTypeId: 0,
      eventTicketId: 0,

      eventTicketRequest: {
        eventDetailId: 0,
        ticketTypeId: 0,
        total: 0
      },

      eventTicketInfo: {
        eventTicketId: 0,
        ticketTypeName: '',
        total: 0,
        available: 0,
        status: ''
      }
    }
  },
  methods: {
    sendAddTicketsRequest() {
      this.$http.post("/ticket", this.eventTicketRequest
      ).then(() => {
        this.closeTicketModal()
        this.$emit('event-tickets-edited-or-added')
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    sendPutTicketsRequest() {
      this.$http.put("/ticket", this.eventTicketInfo
      ).then(() => {
        this.closeTicketModal()
        this.$emit('event-tickets-edited-or-added')
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    sendGetTicketRequest(eventTicketId) {
      this.$http.get("/ticket", {
            params: {
              eventTicketId: eventTicketId
            }
          }
      ).then(response => {
        this.eventTicketInfo = response.data
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    handleOpenTicketModal() {
      this.isAdd = true
      this.resetTicketModalData()
      this.$refs.modalRef.openModal()
    },

    handleOpenTicketModalAsEdit(eventTicketId) {
      this.isAdd = false
      this.eventTicketId = eventTicketId
      this.sendGetTicketRequest(eventTicketId)
      this.$refs.modalRef.openModal()
    },

    closeTicketModal() {
      this.$refs.modalRef.closeModal()
    },

    setSelectedTicketTypeId(selectedTicketTypeId) {
      this.eventTicketRequest.ticketTypeId = selectedTicketTypeId
    },

    resetTicketModalData() {
      this.eventTicketRequest = {}
    },
  }
}
</script>