<template>
  <div class="container text-center page-content">
    <div>

      <div>
        <AlertDanger :message="errorMessage"/>
        <AlertSuccess :message="successMessage"/>
        <DeleteMainEventModal ref="deleteMainEventModal" @event-main-event-removed="handleMainEventRemovedEvent"/>
      </div>

      <h1>Minu sündmused - lisa ja muuda</h1>

      <div class="dropdown-add">
        <div class="input-group business-dropdown">
          <BusinessDropdown v-model="selectedBusinessId" @event-selected-business-change="setSelectedBusinessId"
                            @event-no-businesses-found="handleNoBusinessesFoundEvent"/>
        </div>
      </div>

    </div>

    <div class="event-cards">

      <figure class="event-card" v-for="mainEventInfo in mainEvents" :key="mainEventInfo.mainEventId">
        <EventImage class="event-img" :image-data="mainEventInfo.imageData"/>
        <div class="event-info">
          <h3>{{ mainEventInfo.title }}</h3>
          <ul class="buttons-event-card">
            <li>
              <button @click="navigateToFeaturesCategories(mainEventInfo.mainEventId)" type="button"
                      class="btn-event-card btn">Võimalused & kategooriad
              </button>
            </li>
            <li>
              <button @click="navigateToTicketTypes(mainEventInfo.mainEventId)" type="button"
                      class="btn-event-card btn">
                Piletitüübid
              </button>
            </li>
            <li>
              <button @click="navigateToEventDetail(mainEventInfo.mainEventId)" type="button"
                      class="btn-event-card btn">
                Toimumiskohad & piletid
              </button>
            </li>
          </ul>
        </div>
        <ul class="icons-event-card">
          <li>
            <font-awesome-icon @click="navigateToEditEvent(mainEventInfo.mainEventId)" class="icon"
                               :icon="['far', 'pen-to-square']"/>
          </li>
          <li>
            <font-awesome-icon @click="navigateToViewEvent(mainEventInfo.mainEventId)" class="icon-view"
                               :icon="['far', 'eye']"/>
          </li>
          <li>
            <font-awesome-icon @click="openDeleteMainEventModal(mainEventInfo.mainEventId)"
                               class="icon-delete"
                               :icon="['far', 'trash-can']"/>
          </li>
        </ul>
      </figure>

      <figure class="event-card">
        <div class="event-img">
          <img class="img-fluid" src="../../assets/images/placeholder-image.jpg" alt="placeholder image"/>
        </div>
        <div class="event-info">
          <h3>Lisa sündmus</h3>
          <div class="icon-event-card-new">
            <font-awesome-icon @click="navigateToAddEvent" :icon="['fas', 'plus']" class="icon"/>
          </div>
        </div>
      </figure>

    </div>
  </div>

</template>
<script>
import router from "@/router";
import DeleteMainEventModal from "@/components/modal/mainevent/DeleteMainEventModal.vue";
import BusinessDropdown from "@/components/dropdown/BusinessDropdown.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import EventImage from "@/components/image/EventImage.vue";

export default {
  name: "EventsView",
  components: {EventImage, AlertSuccess, AlertDanger, BusinessDropdown, DeleteMainEventModal},
  data() {
    return {
      errorMessage: '',
      successMessage: '',
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
            this.handleNoMainEventsFound()
          }
      ).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    setSelectedBusinessId(selectedBusinessId) {
      this.selectedBusinessId = selectedBusinessId;
      this.sendGetMainEventsRequest()
    },

    handleNoBusinessesFoundEvent() {
      this.errorMessage = 'Sul ei ole ühtegi ettevõtet ja sündmust lisatud.'
    },

    handleNoMainEventsFound() {
      if (this.mainEvents.length === 0) {
        this.errorMessage = 'Sul ei ole ühtegi sündmust lisatud.';
        setTimeout(this.resetAlertMessages, 4000)
      }
    },

    handleMainEventRemovedEvent() {
      this.successMessage = 'Sündmus on edukalt kustutatud.'
      setTimeout(this.resetAlertMessages, 4000)
      this.sendGetMainEventsRequest()
    },

    openDeleteMainEventModal(mainEventId) {
      this.$refs.deleteMainEventModal.mainEventId = mainEventId
      this.$refs.deleteMainEventModal.$refs.modalRef.openModal()
    },

    resetAlertMessages() {
      this.errorMessage = ''
      this.successMessage = ''
    },
  },
}
</script>
