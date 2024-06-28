<template>
  <LoginModal ref="loginModalRef" @event-update-nav-menu="updateNavMenu"/>
  <LogOutModal ref="logOutModalRef" @event-update-nav-menu="updateNavMenu"/>

  <header>

    <nav class="container">
      <router-link to="/">
        <img src="../src/assets/images/logo.png" alt="company logo"/>
      </router-link>

      <!--      <router-link to="/">AVALEHT</router-link>-->

      <template v-if="isLoggedIn">
        <template v-if="isAdmin">
          <router-link to="/events">MINU SÜNDMUSED</router-link>

        </template>
        <a href="#" @click="openLogOutModal">LOGI VÄLJA</a>
      </template>

      <template v-else>
        <a href="#" @click="openLoginModal">LOGI SISSE</a>
      </template>
    </nav>

    <div class="hero-container">
      <h2>Hea pidu hea ilmaga!</h2>
      <p>Kõik piletid Eesti suvesündmustele ühest kohast - vali, osta, pidutse!</p>
    </div>

  </header>
  <router-view/>
</template>

<script>

import LoginModal from "@/components/modal/login/LoginModal.vue";
import LogOutModal from "@/components/modal/login/LogOutModal.vue";

export default {
  name: 'App',
  components: {LogOutModal, LoginModal},
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false
    }
  },
  methods: {
    updateNavMenu() {
      this.updateIsLoggedInValue()
      this.updateIsAdminValue()
    },

    updateIsLoggedInValue() {
      let userId = sessionStorage.getItem('userId')
      this.isLoggedIn = userId !== null
    },

    updateIsAdminValue() {
      if (this.isLoggedIn) {
        let roleName = sessionStorage.getItem('roleName');
        this.isAdmin = roleName === 'korraldaja'
      }
    },

    openLoginModal() {
      this.$refs.loginModalRef.$refs.modalRef.openModal()
    },

    openLogOutModal() {
      this.$refs.logOutModalRef.$refs.modalRef.openModal()
    },

  },
}
</script>

<style>

</style>
