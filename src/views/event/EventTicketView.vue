<template>
  <div class="container text-center">

    <div>
      <AlertSuccess :message="successMessage"/>
      <TicketModal ref="ticketModalRef" @event-tickets-edited-or-added="sendGetEventTicketsRequest"/>
      <DeleteTicketModal ref="deleteTicketModalRef" @event-tickets-removed="handleTicketsRemovedEvent"/>
    </div>

    <h1>{{ mainEventName }}</h1>

    <div class="row justify-content-center">
      <div class="col-8">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Piletitüüp</th>
            <th scope="col">Piletite kogus</th>
            <th scope="col">Saadaval piletid</th>
            <th scope="col">Muuda</th>
            <th scope="col">Kustuta</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="tickets in eventTicketInfo" :key="tickets.eventTicketId">
            <td>{{ tickets.ticketTypeName }}</td>
            <td>{{ tickets.total }}</td>
            <td>{{ tickets.available }}</td>
            <td>
              <font-awesome-icon @click="openTicketEditModal(tickets.eventTicketId)" class="cursor-pointer"
                                 :icon="['far', 'pen-to-square']"/>
            </td>
            <td>
              <font-awesome-icon @click="openDeleteTicketModal(tickets.eventTicketId)"
                                 class="cursor-pointer icon-delete"
                                 :icon="['far', 'trash-can']"/>
            </td>
          </tr>
          </tbody>
        </table>

        <div>
          <font-awesome-icon @click="openTicketModal" :icon="['fas', 'plus']" class="cursor-pointer"/>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import router from "@/router";
import TicketModal from "@/components/modal/ticket/TicketModal.vue";
import {useRoute} from "vue-router";
import DeleteTicketModal from "@/components/modal/ticket/DeleteTicketModal.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";

export default {
  name: "EventTicketView",
  components: {AlertSuccess, DeleteTicketModal, TicketModal},

  data() {
    return {
      eventDetailId: Number(useRoute().query.eventDetailId),
      mainEventName: '',
      successMessage: '',

      eventTicketInfo: [
        {
          eventTicketId: 0,
          ticketTypeName: '',
          total: 0,
          available: 0,
          status: ''
        }
      ]
    }
  },
  methods: {
    sendGetEventTicketsRequest() {
      this.$http.get("/tickets", {
        params: {
          eventDetailId: this.eventDetailId
        }
      }).then(response => {
        this.eventTicketInfo = response.data
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    sendGetMainEventNameRequest() {
      this.$http.get("/event/name", {
            params: {
              eventDetailId: this.eventDetailId
            }
          }
      ).then(response => {
        this.mainEventName = response.data
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    openTicketModal() {
      this.$refs.ticketModalRef.handleOpenTicketModal()
    },

    openTicketEditModal(eventTicketId) {
      this.$refs.ticketModalRef.handleOpenTicketModalAsEdit(eventTicketId)
    },

    openDeleteTicketModal(eventTicketId) {
      this.$refs.deleteTicketModalRef.eventTicketId = eventTicketId
      this.$refs.deleteTicketModalRef.$refs.modalRef.openModal()
    },

    handleTicketsRemovedEvent() {
      this.successMessage = 'Piletid on edukalt kustutatud.'
      setTimeout(this.resetSuccessMessage, 4000)
      this.sendGetEventTicketsRequest()
    },

    resetSuccessMessage() {
      this.successMessage = ''
    },

  },
  beforeMount() {
    this.sendGetEventTicketsRequest()
    this.sendGetMainEventNameRequest()
  }
}
</script>