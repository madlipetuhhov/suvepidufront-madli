<template>
  <Modal ref="modalRef">
    <template #title>
      <h3>Lisa sündmusele võimalused</h3>
    </template>
    <template #body>
      <div class="row text-start mx-5">
        <div class="col">
          <div v-for="feature in features" :key="feature.featureId" class="form-check form-switch">
            <input v-model="feature.isAvailable" class="form-check-input" type="checkbox" role="switch"
                   id="flexSwitchCheckDefault">
            <label class="form-check-label"
                   for="flexSwitchCheckDefault">{{ feature.featureName }}</label>
          </div>
        </div>
      </div>
    </template>
    <template #buttons>
      <button @click="sendPutFeaturesRequest" type="submit"
              class="button-success btn btn-primary text-center text-nowrap">
        OK
      </button>
      <button @click="closeFeatureModal" type="submit" class="button-danger btn btn-primary text-center text-nowrap">
        Loobu
      </button>
    </template>
  </Modal>
</template>
<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";

export default {
  name: 'FeatureModal',
  components: {Modal},
  data() {
    return {
      mainEventId: 0,
      features: [
        {
          featureId: 0,
          featureName: '',
          isAvailable: false
        }
      ],
    }
  },
  methods: {
    sendGetFeaturesRequest() {
      this.$http.get("/features"
      ).then(response => {
        this.features = response.data
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    sendGetSelectedFeaturesForModalRequest(mainEventId) {
      this.$http.get("/event/features-modal", {
            params: {
              mainEventId: mainEventId
            }
          }
      ).then(response => {
        this.features = response.data
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    sendPutFeaturesRequest() {
      this.$http.put("/event/features-modal", this.features, {
            params: {
              mainEventId: this.mainEventId
            }
          }
      ).then(() => {
        this.closeFeatureModal()
        this.$emit('event-feature-edited-or-added')
        router.push({name: 'featureCategoryRoute', query: {mainEventId: this.mainEventId}})
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    decideIfNewOrEditFeatures(mainEventId) {
      this.mainEventId = mainEventId
      if (mainEventId !== 0) {
        this.sendGetSelectedFeaturesForModalRequest(mainEventId)
      }
    },

    closeFeatureModal() {
      this.$refs.modalRef.closeModal()
    },
  },
  beforeMount() {
    this.sendGetFeaturesRequest()
  }
}
</script>