<template>
  <select v-model="selectedBusinessId" @change="emitSelectedBusinessId" class="form-select">
    <option selected disabled value="0">Vali ettevõte</option>
    <option v-for="business in businesses" :value="business.businessId" :key="business.businessId">
      {{ business.companyName }}
    </option>
  </select>
  <AlertDanger :message="errorMessage"/>
</template>

<script>

import router from "@/router";
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: 'BusinessDropdown',
  components: {AlertDanger},

  data() {
    return {
      userId: sessionStorage.getItem('userId'),
      errorMessage: '',
      selectedBusinessId: 0,
      businesses: [
        {
          businessId: 0,
          companyName: ''
        }
      ]
    }
  },

  methods: {
    sendGetBusinessesRequest() {
      const userId = this.userId
      if (userId) {
        this.$http.get('/businesses', {
          params: {
            userId: userId
          }
        })
            .then(response => {
              this.businesses = response.data
              this.handleUserBusinessesDropdownSelection()
            })
            .catch(() => {
              router.push({name: 'errorRoute'})
            });
      } else {
        router.push({name: 'errorRoute'});
      }
    },

    handleUserBusinessesDropdownSelection() {
      if (this.businesses.length > 0) {
        this.selectedBusinessId = this.businesses[0].businessId
        this.emitSelectedBusinessId()
      } else {
        this.$emit('event-no-businesses-found')
      }
    },

    emitSelectedBusinessId() {
      this.$emit('event-selected-business-change', this.selectedBusinessId)
    },

  },

  beforeMount() {
    this.sendGetBusinessesRequest()
  }

}
</script>

