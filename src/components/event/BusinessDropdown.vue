<template>
  <select v-model="selectedBusinessId" @change="emitSelectedBusinessId" class="form-select">
<!--    <option selected disabled value="0">Vali ettevõte</option>-->
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
      this.$http.get('/businesses')
          .then(response => {
            this.businesses = response.data
            if (this.businesses.length > 0) {
              this.selectedBusinessId = this.businesses[0].businessId;
            }
            this.emitSelectedBusinessId()
          })
          .catch(() => {
            router.push({name: 'errorRoute'})
          })
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

