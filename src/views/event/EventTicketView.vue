<template>
  <div class="container text-center page-content">

    <div>
      <AlertSuccess :message="successMessage"/>
      <TicketModal ref="ticketModalRef" @event-tickets-edited-or-added="sendGetEventTicketsRequest"
                   @event-send-main-event-id="sendMainEventId" :mainEventId="mainEventInfoShort.mainEventId"/>
      <DeleteTicketModal ref="deleteTicketModalRef" @event-tickets-removed="handleTicketsRemovedEvent"/>
    </div>

    <h1>{{ mainEventInfoShort.mainEventTitle }}</h1>
    <div>TODO: puudu kuvamine, mis tüüpidel on hind-kogus puudu</div>
    <div>
      <button @click="navigateToTicketTypes(mainEventInfoShort.mainEventId)" type="submit"
              class="button-success btn btn-primary text-center text-nowrap">
        Lisa piletitüübid & hinnad
      </button>
    </div>

    <div>
      <button @click="openTicketModal" type="submit"
              class="button-success btn btn-primary text-center text-nowrap">
        Lisa piletite kogused
      </button>
    </div>

    <div class="row justify-content-center mt-3">
      <div class="col-9">
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
              <font-awesome-icon @click="openTicketEditModal(tickets.eventTicketId)" class="icon"
                                 :icon="['far', 'pen-to-square']"/>
            </td>
            <td>
              <font-awesome-icon @click="openTicketDeleteModal(tickets.eventTicketId)"
                                 class="icon-delete"
                                 :icon="['far', 'trash-can']"/>
            </td>
          </tr>
          </tbody>
        </table>
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
      successMessage: '',

      eventTicketInfo: [
        {
          eventTicketId: 0,
          ticketTypeName: '',
          total: 0,
          available: 0,
          status: ''
        }
      ],

      mainEventInfoShort: {
        mainEventId: 0,
        mainEventTitle: ''
      },
    }
  },
  methods: {
    navigateToTicketTypes(mainEventId) {
      router.push({name: 'eventTicketTypeRoute', query: {mainEventId: mainEventId}});
    },

    sendMainEventId() {
      this.$refs.ticketModalRef.$emit('mainEventId', this.mainEventInfoShort.mainEventId);
    },

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

    sendGetMainEventInfoShortRequest() {
      this.$http.get("/event/name-id", {
            params: {
              eventDetailId: this.eventDetailId
            }
          }
      ).then(response => {
        this.mainEventInfoShort = response.data
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

    openTicketDeleteModal(eventTicketId) {
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
    this.sendGetMainEventInfoShortRequest()
    this.sendGetEventTicketsRequest()
  }
}
</script>