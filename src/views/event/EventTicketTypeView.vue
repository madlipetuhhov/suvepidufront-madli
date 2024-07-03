<template>
  <div>
    <TicketTypeModal ref="ticketTypesModalRef" @event-ticket-type-edited-or-added="sendGetTicketTypesRequest"/>
  </div>
  <div class="container text-center page-content">
    <h1>{{ mainEventName }}</h1>
    <div class="row justify-content-center">
      <div class="col-8">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Piletitüüp</th>
            <th scope="col">Hind</th>
            <th scope="col">Muuda</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="ticketType in ticketTypes" :key="ticketType.ticketTypeId">
            <td>{{ ticketType.ticketTypeName }}</td>
            <td>{{ ticketType.ticketTypePrice }}</td>
            <td>
              <font-awesome-icon @click="openTicketTypeEditModal(ticketType.ticketTypeId)" class="icon"
                                 :icon="['far', 'pen-to-square']"/>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <font-awesome-icon @click="openTicketTypeModal" :icon="['fas', 'plus']" class="icon"/>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {useRoute} from "vue-router";
import router from "@/router";
import TicketTypeModal from "@/components/modal/ticket/TicketTypeModal.vue";

export default {
  name: "EventTicketTypeView",
  components: {TicketTypeModal},
  data() {
    return {
      mainEventId: Number(useRoute().query.mainEventId),
      mainEventName: '',

      ticketTypes: [
        {
          ticketTypeName: '',
          ticketTypePrice: 0,
          ticketTypeId: 0,
          mainEventId: 0
        }
      ]
    }
  },
  methods: {
    sendGetTicketTypesRequest() {
      this.$http.get("/ticket-types", {
            params: {
              mainEventId: this.mainEventId
            }
          }
      ).then(response => {
        this.ticketTypes = response.data
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    sendGetMainEventNameRequest() {
      this.$http.get("/event/main", {
            params: {
              mainEventId: this.mainEventId
            }
          }
      ).then(response => {
        this.mainEventName = response.data.title
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    openTicketTypeModal() {
      this.$refs.ticketTypesModalRef.handleOpenTicketTypeModal()
    },

    openTicketTypeEditModal(ticketTypeId) {
      this.$refs.ticketTypesModalRef.handleOpenTicketTypeModalAsEdit(ticketTypeId)
    },

  },

  beforeMount() {
    this.sendGetTicketTypesRequest()
    this.sendGetMainEventNameRequest()
  }
}
</script>
