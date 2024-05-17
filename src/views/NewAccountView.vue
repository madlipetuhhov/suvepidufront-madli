<template>
  <h1>{{ successMessage }}</h1>

  <div class="container text-center">

    <div class="row justify-content-center">
      <div class="col col-5">
        <div class="input-group mb-3">
          <span class="input-group-text me-3">Vali konto tüüp</span>
          <RolesDropdown @event-selected-role-change="setSelectedRoleId"/>
        </div>
      </div>
    </div>

    <div class="row justify-content-center mt-3">
      <div class="col col-5">

        <div>
          <UserInfo ref="userInfoRef"/>
        </div>

        <div v-if="selectedRoleId === 2">
          <BusinessInfo ref="businessInfoRef"/>
        </div>

      </div>
    </div>

    <div class="row mt-3">
      <div class="col">
        <button @click="addNewUser" type="submit" class="button-success btn btn-primary text-center text-nowrap">
          OK
        </button>
        <button @click="navigateToHomeView" type="submit" class="button-danger btn btn-primary text-center text-nowrap">Loobu</button>
      </div>
    </div>

  </div>

</template>

<script>

import RolesDropdown from "@/components/newaccount/RolesDropdown.vue";
import router from "@/router";
import UserInfo from "@/components/newaccount/UserInfo.vue";
import BusinessInfo from "@/components/newaccount/BusinessInfo.vue";

export default {
  name: 'NewUserView',
  components: {BusinessInfo, UserInfo, RolesDropdown},
  data() {
    return {
      selectedRoleId: 0,
      successMessage: '',

      userInfo: {
        roleId: 0,
        username: '',
        password: ''
      },

      businessInfo: {
        roleId: 0,
        username: '',
        password: '',
        companyName: '',
        registryCode: '',
        vatNumber: '',
        phone: '',
        email: ''
      },

    }
  },

  methods: {
    addNewUser() {
      if (this.selectedRoleId === 1) {
        this.getAndSetUserValues()
        this.sendPostNewUser()
      } else if (this.selectedRoleId === 2) {
        this.getAndSetBusinessValues()
        this.sendPostNewBusiness()
      }
    },

    getAndSetUserValues() {
      this.userInfo.roleId = this.selectedRoleId
      this.userInfo.username = this.$refs.userInfoRef.username
      this.userInfo.password = this.$refs.userInfoRef.password
    },

    getAndSetBusinessValues() {
      this.businessInfo.roleId = this.selectedRoleId
      this.businessInfo.username = this.$refs.userInfoRef.username
      this.businessInfo.password = this.$refs.userInfoRef.password
      this.businessInfo.companyName = this.$refs.businessInfoRef.companyName
      this.businessInfo.registryCode = this.$refs.businessInfoRef.registryCode
      this.businessInfo.vatNumber = this.$refs.businessInfoRef.vatNumber
      this.businessInfo.phone = this.$refs.businessInfoRef.phone
      this.businessInfo.email = this.$refs.businessInfoRef.email
    },

    sendPostNewUser() {
      this.$http.post("/account/user", this.userInfo
      ).then(() => {
        this.successMessage = "Uus kasutaja " + this.userInfo.username + " registreeritud!"
        // this.resetAllInputFieldsUser()
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    sendPostNewBusiness() {
      this.$http.post("/account/business", this.businessInfo
      ).then(() => {
        this.successMessage = "Uus korraldaja " + this.businessInfo.companyName + " registreeritud!"
        this.resetAllInputFieldsBusiness()
      }).catch(() => {
        router.push({name: 'errorRoute'})
      })
    },

    setSelectedRoleId(selectedRoleId) {
      this.selectedRoleId = selectedRoleId
    },

    resetAllInputFieldsUser() {
      this.userInfo.roleId = 0
      this.userInfo.username = ''
      this.userInfo.password = ''
    },

    resetAllInputFieldsBusiness() {
      this.businessInfo.roleId = 0
      this.businessInfo.username = ''
      this.businessInfo.password = ''
      this.businessInfo.companyName = ''
      this.businessInfo.registryCode = ''
      this.businessInfo.vatNumber = ''
      this.businessInfo.phone = ''
      this.businessInfo.email = ''
    },

    navigateToHomeView() {
      router.push({name: 'homeRoute'})
    },

  },

}

</script>


