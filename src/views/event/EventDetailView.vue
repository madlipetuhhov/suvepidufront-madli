<template>
  <div>
    <EventDetailModal ref="eventDetailModalRef"/>
    <DeleteEventDetailModal @event-detail-deleted="eventEventDetailDeleted" ref="deleteEventDetailModalRef"/>
  </div>
  <div class="container text-center page-content">
    <h2>{{ mainEventName }}</h2>
    <div class="row justify-content-center">
      <div class="col-10">

        <table class="table">
          <thead>
          <tr>
            <th scope="col">Kuupäev</th>
            <th scope="col">Algus</th>
            <th scope="col">Lõpp</th>
            <th scope="col">Maakond</th>
            <th scope="col">Asukoht</th>
            <!--            <th scope="col">Pikkuskraad</th>-->
            <!--            <th scope="col">Laiuskraad</th>-->
            <th scope="col">Piletid</th>
            <th scope="col">Muuda</th>
            <th scope="col">Kustuta</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="eventDetail in eventDetails" :key="eventDetail.eventDetailId">
            <td>{{ eventDetail.date }}</td>
            <td>{{ eventDetail.startTime }}</td>
            <td>{{ eventDetail.endTime }}</td>
            <td>{{ eventDetail.countyName }}</td>
            <td>{{ eventDetail.address }}</td>
            <!--            <td>{{ eventDetail.longitude }}</td>-->
            <!--            <td>{{ eventDetail.latitude }}</td>-->
            <td>
              <button @click="navigateToEventTickets(eventDetail.eventDetailId)" type="button" class="btn-success btn">Piletid
              </button>
            </td>
            <td>
              <font-awesome-icon @click="openEventDetailEditModal(eventDetail.eventDetailId)" class="icon"
                                 :icon="['far', 'pen-to-square']"/>
            </td>
            <td>
              <font-awesome-icon @click="openDeleteEventDetailModal" class="icon-delete"
                                 :icon="['far', 'trash-can']"/>
            </td>
          </tr>
          <tr>
            <td colspan="8">
            <font-awesome-icon @click="openEventDetailModal" :icon="['fas', 'plus']" class="icon"/>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div>
      <EventDetailModal ref="eventDetailModalRef" @event-detail-edited-or-added="eventDetailEditedOrAdded"/>
    </div>

  </div>
</template>

<script>
import router from "@/router";
import EventDetailModal from "@/components/modal/eventdetail/EventDetailModal.vue";
import DeleteEventDetailModal from "@/components/modal/eventdetail/DeleteEventDetailModal.vue";
import {useRoute} from "vue-router";

export default {
  name: "EventDetailView",
  components: {EventDetailModal, DeleteEventDetailModal},
  data() {
    return {
      mainEventId: useRoute().query.mainEventId,
      mainEventName: '',
      eventDetails: [
        {
          eventDetailId: 0,
          countyId: 0,
          date: '',
          startTime: '',
          endTime: '',
          address: '',
          longitude: 0,
          latitude: 0,
          countyName: '',
        }
      ]

    }
  },

  methods: {
    sendGetEventDetailRequest() {
      this.$http.get("/event/details", {
            params: {
              mainEventId: this.mainEventId
            }
          }
      ).then(response => {
        this.eventDetails = response.data
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

    navigateToEventTickets(eventDetailId) {
      router.push({name: 'eventTicketRoute', query: {eventDetailId: eventDetailId}});
    },

    openEventDetailModal() {
      this.$refs.eventDetailModalRef.handleOpenEventDetailModal()
    },

    openEventDetailEditModal(eventDetailId) {
      this.$refs.eventDetailModalRef.handleOpenEventDetailModalAsEdit(eventDetailId)
    },

    eventDetailEditedOrAdded() {
      this.sendGetEventDetailRequest()
    },

    eventEventDetailDeleted() {
      this.sendGetEventDetailRequest()
    },

    openDeleteEventDetailModal(eventDetailId) {
      this.$refs.deleteEventDetailModalRef.eventDetailId = eventDetailId;
      this.$refs.deleteEventDetailModalRef.$refs.modalRef.openModal()
    },

  },

  beforeMount() {
    this.sendGetEventDetailRequest()
    this.sendGetMainEventNameRequest()
  }
}


</script>