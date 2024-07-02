<template>
  <Modal ref="modalRef">
    <template #title>
      Lisa või muuda piletite kogust
    </template>

    <template #body>
      <div>
        <div class="mb-3">
          <label for="ticket-type" class="form-label">Valitud piletitüüp</label>
          <input v-model="eventTicketInfo.ticketTypeName" type="text" class="form-control" readonly="readonly" disabled>
        </div>
        <div class="mb-3">
          <label for="ticket-price" class="form-label">Piletite arv</label>
          <input v-model="eventTicketInfo.total" type="number" class="form-control">
        </div>
        <div class="mb-3">
          <label for="ticket-price" class="form-label">Saadaval piletid</label>
          <input v-model="eventTicketInfo.available" type="number" class="form-control">
        </div>
      </div>

    </template>

    <template #buttons>
      <button @click="sendPutEditTicketsRequest" type="button" class="btn button-neutral btn-primary">Salvesta
      </button>
      <button @click="closeTicketModal" type="button" class="button-danger btn btn-primary text-center text-nowrap">
        Loobu
      </button>
    </template>

  </Modal>
</template>
<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";
import {useRoute} from "vue-router";

export default {
  name: "TicketModal",
  components: {Modal},

  data() {
    return {
      eventDetailId: Number(useRoute().query.eventDetailId),
      eventTicketId: 0,

      eventTicketRequest: {
        ticketTypeId: 0,
        total: 0
      },

      eventTicketInfo: {
        eventTicketId: 0,
        ticketTypeName: '',
        total: 0,
        available: 0,
        status: ''
      },
    }
  },
  methods: {
    // sendAddTicketsRequest() {
    //   this.$http.post("/ticket", this.eventTicketRequest, {
    //         params: {
    //           eventDetailId: this.eventDetailId
    //         }
    //       }
    //   ).then(() => {
    //     this.closeTicketModal()
    //     this.$emit('event-tickets-edited-or-added')
    //   }).catch(() => {
    //     router.push({name: 'errorRoute'})
    //   })
    // },

    // Esialgu ainult put meetod, sest piletitüüpide lisamine ei toimu siin.
    // Koguste muutmine siin vaates, st ka kogust 0 muudetakse, mitte lisatakse.

    sendPutEditTicketsRequest() {
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

    handleOpenTicketModalAsEdit(eventTicketId) {
      this.eventTicketId = eventTicketId
      this.sendGetTicketRequest(eventTicketId)
      this.$refs.modalRef.openModal()
    },

    closeTicketModal() {
      this.$refs.modalRef.closeModal()
    },
  }
}
</script>