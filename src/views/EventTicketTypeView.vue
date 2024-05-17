<template>
  <div class="container text-center">
    <h1>{{ "Nimi: " + mainEventName }}</h1>
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
              <font-awesome-icon @click="openTicketTypesModalEdit(ticketType.ticketTypeId)" class="cursor-pointer"
                                 :icon="['far', 'pen-to-square']"/>
            </td>
          </tr>
          </tbody>
        </table>
        <font-awesome-icon @click="openTicketTypesModalNew" :icon="['fas', 'plus']"/>
      </div>
    </div>

    <div>
      <TicketTypeModal ref="ticketTypesModalRef" @event-ticket-type-edited-or-added="sendGetTicketTypesRequest"/>
    </div>

  </div>
</template>

<script>
import {useRoute} from "vue-router";
import router from "@/router";
import TicketTypeModal from "@/components/modal/TicketTypeModal.vue";

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
    openTicketTypesModalNew() {
      this.$refs.ticketTypesModalRef.decideIfNewOrEditTicketType(0, this.mainEventId);
      this.$refs.ticketTypesModalRef.$refs.modalRef.openModal()
    },

    openTicketTypesModalEdit(ticketTypeId) {
      this.$refs.ticketTypesModalRef.decideIfNewOrEditTicketType(ticketTypeId, this.mainEventId);
      // siin panen ticketTypeId kaasa
      this.$refs.ticketTypesModalRef.$refs.modalRef.openModal()
    },

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
  },

  beforeMount() {
    this.sendGetTicketTypesRequest()
    this.sendGetMainEventNameRequest()
  }
}

</script>
