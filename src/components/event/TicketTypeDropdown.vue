<template>
  <select v-model="selectedTypeId" @change="emitSelectedTypeId" class="form-select">
    <option selected disabled value="0">Piletitüübid</option>
    <option v-for="type in types" :value="type.ticketTypeId" :key="type.ticketTypeId">
<!--      {{ type.ticketTypeName }}-->
      <p>test</p>
    </option>
  </select>
</template>
<script>
import router from "@/router";

export default {
  name: 'TicketTypeDropdown',
  data() {
    return {
      mainEventId: 1,
      selectedTypeId: 0,
      types: [
        {
          ticketTypeId: 0,
          ticketTypeName: '',
        }
      ]
    }
  },
  methods: {
    sendGetEventTicketTypeRequest() {
      this.$http.get("/event/ticket-types", {
            params: {
              mainEventId: this.mainEventId
            }
          }
      ).then(response => {
        this.types = response.data
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },
    emitSelectedTypeId() {
      this.$emit('event-selected-ticketType-change', this.selectedTypeId)
    },
  },
  beforeMount() {
    this.sendGetEventTicketTypeRequest()
  }
}
</script>
