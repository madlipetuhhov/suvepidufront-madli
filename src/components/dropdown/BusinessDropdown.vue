<template>
  <select v-model="selectedBusinessId" @change="emitSelectedBusinessId" class="form-select">
    <option selected disabled value="0">Vali ettevõte</option>
    <option v-for="business in businesses" :value="business.businessId" :key="business.businessId">
      {{ business.companyName }}
    </option>
  </select>
</template>

<script>

import router from "@/router";

export default {
  name: 'BusinessDropdown',

  data() {
    return {
      userId: sessionStorage.getItem('userId'),
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
        console.error('User ID not found in session storage.');
        router.push({name: 'errorRoute'});
      }

    },

    handleUserBusinessesDropdownSelection() {
      if (this.businesses.length > 0) {
        this.selectedBusinessId = this.businesses[0].businessId
        this.emitSelectedBusinessId()
      } else {
        this.errorMessage = 'Sul ei ole ühtegi ettevõtet lisatud.'
        setTimeout(this.resetAlertMessages, 4000)
      }
    },

    emitSelectedBusinessId() {
      this.$emit('event-selected-business-change', this.selectedBusinessId)
    },

    resetAlertMessages() {
      this.errorMessage = ''
      this.successMessage = ''
    },

  },

  beforeMount() {
    this.sendGetBusinessesRequest()
  }

}
</script>

