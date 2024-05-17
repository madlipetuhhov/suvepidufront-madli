<template>
  <select v-model="selectedCountyId" @change="emitSelectedCountyId" class="form-select">
    <option selected disabled value="0">Vali maakond</option>
    <option v-for="county in counties" :value="county.countyId" :key="county.countyId">
      {{ county.countyName }}
    </option>
  </select>
</template>


<script>

import router from "@/router";

export default {
  name: 'CountyDropdown',
  data() {
    return {
      selectedCountyId: 0,
      counties: [
        {
          countyId: 0,
          countyName: '',
        }
      ]
    }
  },

  methods: {
    sendGetCountyRequest() {
      this.$http.get('/counties')
          .then(response => {
            this.counties = response.data
          })
          .catch(() => {
            router.push({name: 'errorRoute'})
          })
    },

    emitSelectedCountyId() {
      this.$emit('event-selected-county-change', this.selectedCountyId)
    }
  },

  beforeMount() {
    this.sendGetCountyRequest()
  }

}
</script>

