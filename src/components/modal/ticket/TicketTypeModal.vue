<template>
  <Modal ref="modalRef">
    <template #title>
      {{ isAdd ? "Lisa piletitüüp ja hind" : "Muuda piletitüüpi ja hinda" }}
    </template>
    <template #body>
      <div class="container text-start">
        <div class="row justify-content-center">
          <div class="col">
            <div class="mb-3">
              <label for="ticket-type" class="form-label">Piletitüüp</label>
              <input v-model="ticketTypeInfoExtended.ticketTypeName" type="text" class="form-control" id="ticket-type">
            </div>
            <div class="mb-3">
              <label for="ticket-price" class="form-label">Hind</label>
              <input v-model="ticketTypeInfoExtended.ticketTypePrice" type="number" class="form-control"
                     id="ticket-price">
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #buttons>
      <button v-if="isAdd" @click="sendAddTicketTypeRequest" type="button" class="btn button-success btn-primary">Lisa</button>
      <button v-else @click="sendPutEditTicketTypeRequest" type="button" class="btn button-neutral btn-primary">Salvesta</button>
      <button @click="closeTicketTypeModal" type="button"
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
  name: "TicketTypeModal",
  components: {Modal},
  data() {
    return {
      isAdd: true,
      mainEventId: Number(useRoute().query.mainEventId),
      ticketTypeId: 0,

      ticketTypeInfoExtended: {
        ticketTypeName: '',
        ticketTypePrice: 0,
        ticketTypeId: 0,
        mainEventId: 0
      }
    }
  },
  methods: {
    sendAddTicketTypeRequest() {
      const ticketTypeInfo = {
        ticketTypeName: this.ticketTypeInfoExtended.ticketTypeName,
        ticketTypePrice: this.ticketTypeInfoExtended.ticketTypePrice
      }

      this.$http.post("/ticket-type", ticketTypeInfo, {
            params: {
              mainEventId: this.mainEventId
            }
          }
      ).then(() => {
        this.closeTicketTypeModal()
        this.$emit('event-ticket-type-edited-or-added')
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    sendPutEditTicketTypeRequest() {
      this.$http.put("/ticket-type", this.ticketTypeInfoExtended
      ).then(() => {
        this.closeTicketTypeModal()
        this.$emit('event-ticket-type-edited-or-added')
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    sendGetTicketTypeRequest(ticketTypeId) {
      this.$http.get("/ticket-type", {
            params: {
              ticketTypeId: ticketTypeId
            }
          }
      ).then(response => {
        this.ticketTypeInfoExtended = response.data
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    handleOpenTicketTypeModal() {
      this.isAdd = true
      this.resetTicketTypeModalData()
      this.$refs.modalRef.openModal()
    },

    handleOpenTicketTypeModalAsEdit(ticketTypeId) {
      this.isAdd = false
      this.ticketTypeId = ticketTypeId
      this.sendGetTicketTypeRequest(ticketTypeId)
      this.$refs.modalRef.openModal()
    },

    closeTicketTypeModal() {
      this.$refs.modalRef.closeModal()
    },

    resetTicketTypeModalData() {
      this.ticketTypeInfoExtended = {}
    },

  }
}
</script>
