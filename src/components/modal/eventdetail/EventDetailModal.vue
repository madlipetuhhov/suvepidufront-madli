<template>
  <Modal ref="modalRef">
    <template #title>

    </template>
    <template #body>
      <div class="mb-3">
        <label class="form-label">Kuupäev</label>
        <input v-model="eventDetailInfo.date" type="date" class="form-control">
      </div>
      <div class="mb-3">
        <label class="form-label">Algus</label>
        <input v-model="eventDetailInfo.startTime" type="text" class="form-control" placeholder="_:_">

      </div>
      <div class="mb-3">
        <label class="form-label">Lõpp</label>
        <input v-model="eventDetailInfo.endTime" type="text" class="form-control" placeholder="_:_">
      </div>
      <div class="mb-3">
        <label class="form-label">Maakond</label>
        <CountyDropdown ref="countyDropdownRef" @event-selected-county-change="setSelectedCountyId"/>
      </div>
      <div class="mb-3">
        <label class="form-label">Aadress</label>
        <input v-model="eventDetailInfo.address" type="text" class="form-control">
      </div>
      <div class="mb-3">
        <label class="form-label">Pikkuskraad</label>
        <input v-model="eventDetailInfo.longitude" type="text" class="form-control">
      </div>
      <div class="mb-3">
        <label class="form-label">Laiuskraad</label>
        <input v-model="eventDetailInfo.latitude" type="text" class="form-control">
      </div>
    </template>
    <template #buttons>
      <button v-if="isAdd" @click="addEventDetail" type="submit"
              class="button-success btn btn-primary text-center text-nowrap">Lisa
      </button>
      <button v-else @click="editEventDetail" type="submit"
              class="button-cancel btn btn-primary text-center text-nowrap">Salvesta
      </button>
      <button @click="closeEventDetailModal" type="submit"
              class="button-danger btn btn-primary text-center text-nowrap">Loobu
      </button>
    </template>

  </Modal>
</template>
<script>

import Modal from "@/components/modal/Modal.vue";
import CountyDropdown from "@/components/event/CountyDropdown.vue";
import router from "@/router";
import {useRoute} from "vue-router";

export default {
  name: "EventDetailModal",
  components: {Modal, CountyDropdown},
  data() {
    return {
      isAdd: true,
      mainEventId: Number(useRoute().query.mainEventId),
      // saab kasutada routerit modalil, kui ei pea seda mujal lehel kasutama ja jääme samale lehele
      eventDetailId: 0,

      eventDetailInfo: {
        countyId: 0,
        date: '',
        startTime: '',
        endTime: '',
        address: '',
        longitude: 0,
        latitude: 0
      },
    }
  },
  methods: {
    handleOpenEventDetailModalAsEdit(eventDetailId) {
      this.isAdd = false
      this.eventDetailId = eventDetailId
      this.sendGetEventDetailRequest();
    },

    addEventDetail() {
      this.sendAddEventDetailRequest()
    },

    editEventDetail() {
      this.sendPutEventDetailRequest()
    },

    sendAddEventDetailRequest() {
      this.$http.post("/event/detail", this.eventDetailInfo, {
            params: {
              mainEventId: this.mainEventId
            }
          }
      ).then(() => {
        this.closeEventDetailModal()
        router.push({name: 'eventDetailRoute'})
        this.$emit('event-detail-edited-or-added')
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    sendPutEventDetailRequest() {
      this.$http.put("/event/detail", this.eventDetailInfo, {
            params: {
              eventDetailId: this.eventDetailId
            }
          }
      ).then(() => {
        this.closeEventDetailModal()
        this.$emit('event-detail-edited-or-added')
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    closeEventDetailModal() {
      this.$refs.modalRef.closeModal()
    },

    setCountyDropdownSelectedCountyId() {
      this.$refs.countyDropdownRef.selectedCountyId = this.eventDetailInfo.countyId
    },
    sendGetEventDetailRequest() {
      this.$http.get("/event/detail", {
            params: {
              eventDetailId: this.eventDetailId
            }
          }
      ).then(response => {
        this.eventDetailInfo = response.data
        this.$refs.modalRef.openModal()
        setTimeout(this.setCountyDropdownSelectedCountyId, 500)
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    setSelectedCountyId(selectedCountyId) {
      this.eventDetailInfo.countyId = selectedCountyId
    },

  }
}
</script>
