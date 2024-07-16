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

      <div>
        <h4 class="event-view-fc-header">Võimalused</h4>
        <ul class="list">
          <li class="list-item" v-for="feature in selectedFeatures" :key="feature.featureId">
            <font-awesome-icon :icon="['fas', 'check']" class="list-icon"/>
            <span> {{ feature.featureName }} </span>
          </li>
        </ul>
        <h4 class="event-view-fc-header">Kategooriad</h4>
        <ul class="list">
          <li class="list-item" v-for="category in selectedCategories" :key="category.categoryId">
            <font-awesome-icon :icon="['fas', 'check']" class="list-icon"/>
            <span> {{ category.categoryName }} </span>
          </li>
        </ul>
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
        <font-awesome-icon @click="navigateToEventView(mainEventInfo.mainEventId)" class="icon-view"
                           :icon="['far', 'eye']"/>
      </li>
      <li>
        <font-awesome-icon @click="openDeleteMainEventModal(mainEventInfo.mainEventId)"
                           class="icon-delete"
                           :icon="['far', 'trash-can']"/>
      </li>
    </ul>
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

      eventDetailInfo:{

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
      ]
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
  },
  beforeMount() {
    this.sendGetSelectedFeaturesRequest()
    this.sendGetSelectedCategoriesRequest()
  }
}
</script>