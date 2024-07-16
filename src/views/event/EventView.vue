<template>
  <div class="container page-content">
    <h2 class="text-center">Test nimi{{ eventInfo.title }}</h2>

    <div class="event-grid">
      <EventImage class="event-img event-view-img" :image-data="eventInfo.imageData"/>
      <p class="event-description">test kirjeldus Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla semper
        enim vel mattis feugiat. Praesent eu mauris eros. Pellentesque sed congue justo, eu suscipit turpis. Integer
        vehicula, nulla vel vehicula semper, arcu nunc volutpat purus, eu consectetur lorem ante a erat. Integer
        tincidunt
        tortor id massa gravida hendrerit. Mauris fermentum sem massa, eget ultrices erat commodo at. Sed scelerisque
        augue ac congue elementum.</p>

      <div class="feature-category">
        <div>
          <h4 class="subheading-event-view">Võimalused</h4>
          <ul class="list">
            <li class="list-item" v-for="feature in selectedFeatures" :key="feature.featureId">
              <font-awesome-icon :icon="['fas', 'check']" class="list-icon"/>
              <span> {{ feature.featureName }} </span>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="subheading-event-view">Kategooriad</h4>
          <ul class="list">
            <li class="list-item" v-for="category in selectedCategories" :key="category.categoryId">
              <font-awesome-icon :icon="['fas', 'check']" class="list-icon"/>
              <span> {{ category.categoryName }} </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="event-detail-cards" v-for="eventDetail in eventDetails" :key="eventDetails.eventDetailId">
        <figure class="event-detail-card">
          <div class="event-detail-info">
            <div>
              <h4 class="subheading-event-view">Asukoht</h4>
              <ul class="list">
                <li class="list-item">
                  <font-awesome-icon :icon="['far', 'calendar-days']" class="list-icon"/>
                  <span> {{ eventDetail.date }} </span>
                </li>
                <li class="list-item">
                  <font-awesome-icon :icon="['far', 'clock']" class="list-icon"/>
                  <span> {{ eventDetail.startTime }} - {{ eventDetail.endTime }} </span>
                </li>
                <li class="list-item">
                  <font-awesome-icon :icon="['fas', 'location-dot']" class="list-icon"/>
                  <span> {{ eventDetail.address }} </span>
                </li>
                <li class="list-item">
                  <font-awesome-icon :icon="['fas', 'map-location-dot']" class="list-icon"/>
                  <span> {{ eventDetail.countyName }} </span>
                </li>
                <li class="list-item">
                  <font-awesome-icon :icon="['fas', 'globe']" class="list-icon"/>
                  <span> {{ eventDetail.latitude }}, {{ eventDetail.longitude }}</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 class="subheading-event-view">Piletid</h4>
              <div class="event-view-tickets" v-for="tickets in eventTicketInfo" :key="tickets.eventTicketId">
                <ul class="list">
                  <li class="list-item">
                    <font-awesome-icon :icon="['fas', 'ticket']" class="list-icon"/>
                    <span> {{ tickets.ticketTypeName }} </span>
                  </li>
                  <li class="list-item">
                    <font-awesome-icon :icon="['fas', 'hand-holding-dollar']" class="list-icon"/>
                    <span> {{ tickets.ticketTypePrice }} </span>
                  </li>
                  <li class="list-item">
                    <font-awesome-icon :icon="['fas', 'cart-shopping']" class="list-icon"/>
                    <span> {{ tickets.total }} </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </figure>
      </div>

    </div>
  </div>
</template>

<script>
import EventImage from "@/components/image/EventImage.vue";
import router from "@/router";
import {useRoute} from "vue-router";

export default {
  name: "EventView",
  components: {EventImage},
  data() {
    return {
      mainEventId: useRoute().query.mainEventId,

      eventInfo: {
        title: '',
        description: '',
        imageData: '',
      },

      selectedFeatures: [
        {
          featureId: 0,
          mainEventId: 0,
          featureName: '',
          isAvailable: false
        }
      ],

      selectedCategories: [
        {
          categoryId: 0,
          mainEventId: 0,
          categoryName: '',
          isAvailable: false
        }
      ],

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
      ],

      eventTicketInfo: [
        {
          eventTicketId: 0,
          ticketTypeName: '',
          ticketTypePrice: 0,
          total: 0,
        }
      ],
    }
  },

  methods: {
    sendGetSelectedFeaturesRequest() {
      this.$http.get("/event/features", {
            params: {
              mainEventId: this.mainEventId
            }
          }
      ).then(response => {
        this.selectedFeatures = response.data
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    sendGetSelectedCategoriesRequest() {
      this.$http.get("/event/categories", {
            params: {
              mainEventId: this.mainEventId
            }
          }
      ).then(response => {
        this.selectedCategories = response.data
        console.log(this.selectedCategories)
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

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
  },
  beforeMount() {
    this.sendGetSelectedFeaturesRequest()
    this.sendGetSelectedCategoriesRequest()
    this.sendGetEventDetailRequest()
  }
}
</script>