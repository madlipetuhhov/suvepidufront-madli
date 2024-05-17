<template>
  <div class="row justify-content-center">
    <div class="col col-5">

      <div v-if="this.mainEventId === undefined" class="input-group mb-3">
        <BusinessDropdown v-model="selectedBusinessId" @event-selected-business-change="setSelectedBusinessId"/>
      </div>

      <div class="input-group mb-3">
        <span class="input-group-text me-3">Pealkiri</span>
        <input v-model="mainEventInfo.title" type="text" class="form-control ">
      </div>

      <div class="input-group mb-3">
        <div class="form-floating">
            <textarea v-model="mainEventInfo.description" class="form-control" placeholder="Leave a comment here"
                      id="floatingTextarea2"
                      style="height: 100px"></textarea>
          <label for="floatingTextarea2">Sündmuse kirjeldus</label>
        </div>
      </div>

      <div class="input-group mb-3">
        <ImageInput @event-new-image-file-selected="setImageData"/>
      </div>

      <button @click="addOrUpdateMainEvent" type="submit"
              class="button-success btn btn-primary text-center text-nowrap">
        OK
      </button>
      <button @click="navigateToEventsView" type="submit" class="button-danger btn btn-primary text-center text-nowrap">
        Loobu
      </button>

    </div>
  </div>

</template>
<script>
import BusinessDropdown from "@/components/event/BusinessDropdown.vue";
import ImageInput from "@/components/event/ImageInput.vue";
import router from "@/router";
import FeatureCategoryInfo from "@/views/FeatureCategoryView.vue";
import {useRoute} from "vue-router";

export default {
  name: 'MainEventView',

  components: {FeatureCategoryInfo, ImageInput, BusinessDropdown},
  data() {
    return {
      selectedBusinessId: 0,
      mainEventId: useRoute().query.mainEventId,

      mainEventInfo: {
        title: '',
        description: '',
        imageData: '',
        mainEventId: 0
      },
    }
  },
  methods: {
    addOrUpdateMainEvent() {
      if (this.mainEventInfo.mainEventId !== 0) {
        this.sendPutEditMainEventRequest()
      } else {
        this.sendPostAddMainEventRequest()
      }
    },

    sendPutEditMainEventRequest() {
      this.$http.put("/event/main", this.mainEventInfo
      ).then(() => {
        router.push({name: 'eventsRoute'})
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    sendPostAddMainEventRequest() {
      const newEventInfoDto = {
        title: this.mainEventInfo.title,
        description: this.mainEventInfo.description,
        imageData: this.mainEventInfo.imageData
      }

      this.$http.post("/event/main", newEventInfoDto, {
            params: {
              businessId: this.selectedBusinessId
            }
          }
      ).then(response => {
        const mainEventId = response.data
        router.push({name: 'eventsRoute', query: {mainEventId: mainEventId}})
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    sendGetMainEventRequest(mainEventId) {
      this.$http.get("/event/main", {
            params: {
              mainEventId: mainEventId
            }
          }
      ).then(response => {
        this.mainEventInfo = response.data
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    setImageData(imageData) {
      this.mainEventInfo.imageData = imageData
    },

    setSelectedBusinessId(selectedBusinessId) {
      this.selectedBusinessId = selectedBusinessId
    },

    getMainEventIdFromUrlQueryParameter() {
      if (this.mainEventId !== undefined) {
        const mainEventId = Number(this.mainEventId);
        this.sendGetMainEventRequest(mainEventId)
      }
    },

    navigateToEventsView() {
      router.push({name: 'eventsRoute'})
    }
  },
  beforeMount() {
    this.getMainEventIdFromUrlQueryParameter()
  }


}
</script>