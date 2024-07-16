<template>
  <Modal ref="modalRef">
    <template #title>
      {{ isAdd ? "Lisa sündmuse asukoha info" : "Muuda sündmuse asukoha infot" }}
    </template>
    <template #body>
      <div class="mb-3">
        <label class="form-label">Kuupäev</label>
        <input v-model="eventDetailInfo.date" type="date" class="form-control">
      </div>
      <div class="mb-3">
        <label class="form-label">Algus </label>
        <input v-model="eventDetailInfo.startTime" class="time-picker" type="time">
      </div>
      <div class="mb-3">
        <label class="form-label">Lõpp </label>
        <input v-model="eventDetailInfo.endTime" class="time-picker" type="time">
      </div>
      <div class="mb-3">
        <label class="form-label">Maakond</label>
        <CountyDropdown ref="countyDropdownRef" @event-selected-county-change="setSelectedCountyId"/>
      </div>
      <div class="mb-3">
        <label class="form-label">Aadress</label>
        <input v-model="eventDetailInfo.address" type="text" class="form-control">
      </div>
      <div>TODO: pikkuskraad ja laiuskraad ei ole kaardiga implementeeritud</div>
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
      <button v-if="isAdd" @click="sendAddEventDetailRequest" type="submit"
              class="btn-success btn">Lisa
      </button>
      <button v-else @click="sendPutEventDetailRequest" type="submit"
              class="btn-neutral btn">Salvesta
      </button>
      <button @click="closeEventDetailModal" type="submit"
              class="btn-danger btn">Loobu
      </button>
    </template>

  </Modal>
</template>
<script>

import Modal from "@/components/modal/Modal.vue";
import CountyDropdown from "@/components/dropdown/CountyDropdown.vue";
import router from "@/router";
import {useRoute} from "vue-router";

export default {
  name: "EventDetailModal",
  components: {Modal, CountyDropdown},
  data() {
    return {
      isAdd: true,
      mainEventId: Number(useRoute().query.mainEventId),
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
    sendAddEventDetailRequest() {
      this.$http.post("/event/detail", this.eventDetailInfo, {
            params: {
              mainEventId: this.mainEventId
            }
          }
      ).then(() => {
        this.closeEventDetailModal()
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

    handleOpenEventDetailModal() {
      this.isAdd = true
      this.resetEventDetailModalData()
      this.$refs.modalRef.openModal()
    },

    handleOpenEventDetailModalAsEdit(eventDetailId) {
      this.isAdd = false
      this.eventDetailId = eventDetailId
      this.sendGetEventDetailRequest();
    },

    setCountyDropdownSelectedCountyId() {
      this.$refs.countyDropdownRef.selectedCountyId = this.eventDetailInfo.countyId
    },

    setSelectedCountyId(selectedCountyId) {
      this.eventDetailInfo.countyId = selectedCountyId
    },

    resetEventDetailModalData() {
      this.eventDetailInfo = {}
    },

    closeEventDetailModal() {
      this.$refs.modalRef.closeModal()
    },

  }
}
</script>
