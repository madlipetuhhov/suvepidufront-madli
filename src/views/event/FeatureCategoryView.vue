<template>
  <div class="container text-center page-content">
    <h1>{{ mainEventName }}</h1>
    <div class="row justify-content-center">
      <div class="col-8">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Võimalused</th>
            <th scope="col">Kategooriad</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <p v-for="feature in selectedFeatures" :key="feature.featureId">
                {{ feature.featureName }} </p>
            </td>
            <td>
              <p v-for="category in selectedCategories" :key="category.categoryId">
                {{ category.categoryName }}</p>
            </td>
          </tr>
          <tr>
            <td v-if="this.selectedFeatures.length > 0">
              <font-awesome-icon @click="openFeatureModal(mainEventId)" class="icon"
                                 :icon="['far', 'pen-to-square']"/>
            </td>
            <td v-else>
              <font-awesome-icon @click="openFeatureModal(mainEventId)" :icon="['fas', 'plus']" class="icon"/>
            </td>
            <td v-if="this.selectedCategories.length > 0">
              <font-awesome-icon @click="openCategoryModal(mainEventId)" class="icon"
                                 :icon="['far', 'pen-to-square']"/>
            </td>
            <td v-else>
              <font-awesome-icon @click="openCategoryModal(mainEventId)" :icon="['fas', 'plus']" class="icon"/>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div>
    <FeatureModal ref="featureModalRef" @event-feature-edited-or-added="sendGetSelectedFeaturesRequest"/>
  </div>
  <div>
    <CategoryModal ref="categoryModalRef" @event-category-edited-or-added="sendGetSelectedCategoriesRequest"/>
  </div>
</template>

<script>
import router from "@/router";
import {useRoute} from "vue-router";
import FeatureModal from "@/components/modal/featurecategory/FeatureModal.vue";
import CategoryModal from "@/components/modal/featurecategory/CategoryModal.vue";

export default {
  name: "FeatureCategoryView",
  components: {CategoryModal, FeatureModal},
  data() {
    return {
      mainEventId: useRoute().query.mainEventId,
      mainEventName: '',

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

    openFeatureModal() {
      this.$refs.featureModalRef.decideIfNewOrEditFeatures(this.mainEventId)
      this.$refs.featureModalRef.$refs.modalRef.openModal()
    },

    openCategoryModal() {
      this.$refs.categoryModalRef.decideIfNewOrEditCategories(this.mainEventId)
      this.$refs.categoryModalRef.$refs.modalRef.openModal()
    },
  },

  beforeMount() {
    this.sendGetSelectedFeaturesRequest()
    this.sendGetSelectedCategoriesRequest()
    this.sendGetMainEventNameRequest()
  }
}


</script>
