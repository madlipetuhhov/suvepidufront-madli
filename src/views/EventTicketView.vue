<template>
  <TicketModal ref="ticketModalRef"/>
  <div class="container text-center">
    <!--<h1>{{"Tere " + mainEventName}}</h1>-->
    <h1>mainEventNameTest</h1>
    <div class="row justify-content-center">
      <div class="col-8">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Piletitüüp</th>
            <th scope="col">Kogu piletite arv</th>
            <th scope="col">Saadaval</th>
            <th scope="col">Staatus</th>
            <th scope="col">Muuda</th>
            <th scope="col">Kustuta</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="ticketInfo in tickets" :key="ticketInfo.eventTicketId">
            <td>{{ ticketInfo.ticketTypeName }}</td>
            <td>{{ ticketInfo.total }}</td>
            <td>{{ ticketInfo.available }}</td>
            <td>{{ ticketInfo.status }}</td>
            <td><font-awesome-icon @click="navigateToEditEvent(mainEventInfo.mainEventId)" class="cursor-pointer"
                                   :icon="['far', 'pen-to-square']"/></td>
            <td><font-awesome-icon @click="openDeleteMainEventModal(mainEventInfo.mainEventId)" class="cursor-pointer"
                                   :icon="['far', 'trash-can']"/></td>
          </tr>
          </tbody>
        </table>
        <font-awesome-icon @click="openTicketModal" :icon="['fas', 'plus']" style="cursor: pointer"/>
      </div>
    </div>
  </div>
</template>
<script>
import router from "@/router";
import TicketModal from "@/components/modal/TicketModal.vue";
import {useRoute} from "vue-router";

export default {
  name: "EventTicketTypesView",
  components: {TicketModal},

  data() {
    return {
      mainEventId: useRoute().query.mainEventId,
      mainEventName: '',
      eventDetailId: 1,
      tickets: [
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
    navigateToFeaturesCategories() {
      router.push({name: 'featureCategoryRoute'})
    },
    openTicketModal() {
      this.$refs.ticketModalRef.$refs.modalRef.openModal()
    },
    sendGetEventTicketsRequest() {
      this.$http.get("/event/tickets", {
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
    this.sendGetEventTicketsRequest()
    // this.sendGetMainEventNameRequest()
  },
}
</script>