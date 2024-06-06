<template>
  <div class="container text-center">
    <div>
      <DeleteMainEventModal @event-deleted="eventEventDeleted" ref="deleteMainEventModal"/>
    </div>
    <div>
      <!--      <AlertDanger :message="errorMessage"/>-->
      <!--      <AlertSuccess :message="successMessage"/>-->
      <h1>Minu sündmused - lisa ja muuda</h1>
      <div class="input-group business-dropdown mb-3">
        <BusinessDropdown v-model="selectedBusinessId" @event-selected-business-change="setSelectedBusinessId"/>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-12">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Nimi</th>
            <th scope="col">Pilt</th>
            <th scope="col">Võimalused ja kategooriad</th>
            <th scope="col">Toimumiskohad</th>
            <th scope="col">Piletitüübid</th>
            <th scope="col">Muuda</th>
            <th scope="col">Kustuta</th>
          </tr>
          </thead>

          <tbody v-if="this.selectedBusinessId !== 0">
          <tr v-for="mainEventInfo in mainEvents" :key="mainEventInfo.mainEventId">
            <td>{{ mainEventInfo.title }}</td>
            <td>
              <EventImageThumbnail :image-data="mainEventInfo.imageData"/>
            </td>
            <td>
              <button @click="navigateToFeaturesCategories(mainEventInfo.mainEventId)" type="button"
                      class="button-success btn btn-primary">Võimalused ja kategooriad
              </button>
            </td>
            <td>
              <button @click="navigateToEventDetail(mainEventInfo.mainEventId)" type="button"
                      class="button-success btn btn-primary">
                Toimumiskohad
              </button>
            </td>
            <td>
              <button @click="navigateToTicketTypes(mainEventInfo.mainEventId)" type="button"
                      class="button-success btn btn-primary">
                Piletitüübid
              </button>
            </td>
            <td>
              <font-awesome-icon @click="navigateToEditEvent(mainEventInfo.mainEventId)" class="cursor-pointer"
                                 :icon="['far', 'pen-to-square']"/>
            </td>
            <td>
              <font-awesome-icon @click="openDeleteMainEventModal(mainEventInfo.mainEventId)" class="cursor-pointer"
                                 :icon="['far', 'trash-can']"/>
            </td>
          </tr>
          </tbody>

        </table>
        <font-awesome-icon @click="navigateToAddEvent" :icon="['fas', 'plus']"/>
      </div>
    </div>
  </div>

</template>
<script>
import router from "@/router";
import DeleteMainEventModal from "@/components/modal/mainevent/DeleteMainEventModal.vue";
import BusinessDropdown from "@/components/dropdown/BusinessDropdown.vue";
import EventImageThumbnail from "@/components/image/EventImageThumbnail.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";


export default {
  name: "EventsView",
  components: {AlertSuccess, AlertDanger, EventImageThumbnail, BusinessDropdown, DeleteMainEventModal},
  data() {
    return {
      selectedBusinessId: 0,

      mainEvents: [
        {
          title: '',
          description: '',
          imageData: '',
          mainEventId: 0
        }
      ]
    }
  },
  methods: {
    navigateToFeaturesCategories(mainEventId) {
      router.push({name: 'featureCategoryRoute', query: {mainEventId: mainEventId}})
    },

    navigateToEventDetail(mainEventId) {
      router.push({name: 'eventDetailRoute', query: {mainEventId: mainEventId}})
    },

    navigateToAddEvent() {
      router.push({name: 'mainEventRoute'})
    },

    navigateToEditEvent(mainEventId) {
      router.push({name: 'mainEventRoute', query: {mainEventId: mainEventId}})
    },

    navigateToTicketTypes(mainEventId) {
      router.push({name: 'eventTicketTypeRoute', query: {mainEventId: mainEventId}})
    },

    sendGetMainEventsRequest() {
      this.$http.get("/events/main", {
            params: {
              businessId: this.selectedBusinessId
            }
          }
      ).then(response => {
        this.mainEvents = response.data
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    openDeleteMainEventModal(mainEventId) {
      this.$refs.deleteMainEventModal.mainEventId = mainEventId;
      this.$refs.deleteMainEventModal.$refs.modalRef.openModal()
    },

    setSelectedBusinessId(selectedBusinessId) {
      this.selectedBusinessId = selectedBusinessId
      this.sendGetMainEventsRequest()
    },

    eventEventDeleted() {
      this.sendGetMainEventsRequest()
    }


  },
}
</script>
