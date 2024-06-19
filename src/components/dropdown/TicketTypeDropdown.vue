<template>
  <select v-model="selectedTicketTypeId" @change="emitSelectedTicketTypeId" class="form-select">
    <option selected disabled value="0">Vali piletitüüp</option>
    <option v-for="type in ticketTypes" :value="type.ticketTypeId" :key="type.ticketTypeId">
      {{ type.ticketTypeName }}
    </option>
  </select>
</template>
<script>
import router from "@/router";
import {useRoute} from "vue-router";

export default {
  name: 'TicketTypeDropdown',
  data() {
    return {
      eventDetailId: Number(useRoute().query.eventDetailId),
      selectedTicketTypeId: 0,
      ticketTypes: [
        {
          ticketTypeId: 0,
          ticketTypeName: '',
        }
      ]
    }
  },

  methods: {
    sendGetTicketTypesRequest() {
      this.$http.get("/ticket-types", {
            params: {
              eventDetailId: this.eventDetailId
            }
          }
      ).then(response => {
        this.ticketTypes = response.data
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    emitSelectedTicketTypeId() {
      this.$emit('event-selected-ticket-type-change', this.selectedTicketTypeId)
    },
  },

  beforeMount() {
    this.sendGetTicketTypesRequest()
  }
}
</script>
