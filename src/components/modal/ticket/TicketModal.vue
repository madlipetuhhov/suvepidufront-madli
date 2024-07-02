<template>
  <Modal ref="modalRef">
    <template #title>
      Lisa või muuda piletite kogust
    </template>

    <template #body>
      <div>
        <div v-if="isAdd" class="mb-3">
          <label class="form-label">Maakond</label>
          <TicketTypeDropdown ref="ticketTypeDropdownRef" @event-selected-ticket-type-change="setSelectedTicketTypeId" :mainEventId="mainEventId"/>
        </div>
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
      <button v-if="isAdd" @click="sendAddTicketsRequest" type="button" class="btn button-neutral btn-primary">Salvesta
      </button>
      <button v-else @click="sendPutEditTicketsRequest" type="button" class="btn button-neutral btn-primary">Salvesta
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
import TicketTypeDropdown from "@/components/dropdown/TicketTypeDropdown.vue";

export default {
  name: "TicketModal",
  components: {TicketTypeDropdown, Modal},
  props: {
    mainEventId: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      isAdd: true,
      eventDetailId: Number(useRoute().query.eventDetailId),
      eventTicketId: 0,
      selectedTicketTypeId: 0,

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
    sendAddTicketsRequest() {
      this.$http.post("/ticket", this.eventTicketRequest, {
            params: {
              eventDetailId: this.eventDetailId
            }
          }
      ).then(() => {
        this.closeTicketModal()
        this.$emit('event-tickets-edited-or-added')
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

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

    setSelectedTicketTypeId(selectedTicketTypeId) {
      this.eventTicketRequest.ticketTypeId = selectedTicketTypeId
    },

    handleOpenTicketModal() {
      this.isAdd = true
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

    emitMainEventId() {
      this.$emit('send-main-event-id', this.mainEventId);
    }
  },
  mounted() {
    this.emitMainEventId();
  }
}
</script>