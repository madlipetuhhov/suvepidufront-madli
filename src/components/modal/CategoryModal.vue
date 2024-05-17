<template>
  <Modal ref="modalRef">
    <template #title>
      <h3>Lisa sündmuse kategooriad</h3>
    </template>
    <template #body>
      <div class="row text-start mx-5">
        <div class="col">
          <div v-for="category in categories" :key="category.categoryId" class="form-check form-switch">
            <input v-model="category.isAvailable" class="form-check-input" type="checkbox" role="switch"
                   id="flexSwitchCheckDefault">
            <label class="form-check-label"
                   for="flexSwitchCheckDefault">{{ category.categoryName }}</label>
          </div>
        </div>
      </div>
    </template>
    <template #buttons>
      <button @click="sendPutCategoriesRequest" type="submit"
              class="button-success btn btn-primary text-center text-nowrap">
        OK
      </button>
      <button @click="closeCategoryModal" type="submit" class="button-danger btn btn-primary text-center text-nowrap">
        Loobu
      </button>
    </template>
  </Modal>
</template>
<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";

export default {
  name: 'CategoryModal',
  components: {Modal},
  data() {
    return {
      mainEventId: 0,
      categories: [
        {
          categoryId: 0,
          categoryName: '',
          isAvailable: false
        }
      ],
    }
  },
  methods: {
    sendGetCategoriesRequest() {
      this.$http.get("/categories"
      ).then(response => {
        this.categories = response.data
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    sendGetSelectedCategoriesForModalRequest(mainEventId) {
      this.$http.get("/event/categories-modal", {
            params: {
              mainEventId: mainEventId
            }
          }
      ).then(response => {
        this.categories = response.data
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    sendPutCategoriesRequest() {
      this.$http.put("/event/categories-modal", this.categories, {
            params: {
              mainEventId: this.mainEventId
            }
          }
      ).then(() => {
        this.closeCategoryModal()
        this.$emit('event-category-edited-or-added')
        router.push({name: 'featureCategoryRoute', query: {mainEventId: this.mainEventId}})
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    decideIfNewOrEditCategories(mainEventId) {
      this.mainEventId = mainEventId
      if (mainEventId !== 0) {
        this.sendGetSelectedCategoriesForModalRequest(mainEventId)
      }
    },

    closeCategoryModal() {
      this.$refs.modalRef.closeModal()
    },

  },
  beforeMount() {
    this.sendGetCategoriesRequest()
  }
}
</script>