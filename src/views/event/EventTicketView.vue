<template>
  <div class="container text-center">
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
          </tr>
          </thead>
          <tbody>
          <tr v-for="ticketInfo in tickets" :key="ticketInfo.eventTicketId">
            <td>{{ ticketInfo.ticketTypeName }}</td>
            <td>{{ ticketInfo.total }}</td>
            <td>{{ ticketInfo.available }}</td>
            <td>
              <font-awesome-icon @click="openTicketEditModal(ticketInfo.eventTicketId)" class="cursor-pointer"
                                 :icon="['far', 'pen-to-square']"/>
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

  <div>
    <TicketModal ref="ticketModalRef" @event-tickets-edited-or-added="sendGetEventTicketsRequest"/>
  </div>

</template>
<script>
import router from "@/router";
import TicketModal from "@/components/modal/ticket/TicketModal.vue";
import {useRoute} from "vue-router";

export default {
  name: "EventTicketView",
  components: {TicketModal},

  data() {
    return {
      eventDetailId: Number(useRoute().query.eventDetailId),
      mainEventName: '',
      tickets: [
        {
          eventTicketId: 0,
          ticketTypeName: '',
          total: 0,
          available: 0
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
        this.tickets = response.data
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
  },
  beforeMount() {
    this.sendGetEventTicketsRequest()
    this.sendGetMainEventNameRequest()
  }
}
</script>