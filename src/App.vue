<template>
  <LoginModal ref="loginModalRef" @event-update-nav-menu="updateNavMenu"/>
  <LogOutModal ref="logOutModalRef" @event-update-nav-menu="updateNavMenu"/>

  <nav ref="navbar" class="global-nav">
    <div class="container">
      <div class="left">
        <router-link to="/">
          <img class="logo" src="../src/assets/images/logo.png" alt="company logo"/>
        </router-link>
      </div>

      <div class="right">
        <template v-if="isLoggedIn">
          <template v-if="isAdmin">
            <router-link to="/events">MINU SÜNDMUSED</router-link>
          </template>
          <a href="#" @click="openLogOutModal">LOGI VÄLJA</a>
        </template>

        <template v-else>
          <a href="#" @click="openLoginModal">LOGI SISSE</a>
        </template>
      </div>
    </div>
  </nav>

  <router-view/>
</template>

<script>

import LoginModal from "@/components/modal/login/LoginModal.vue";
import LogOutModal from "@/components/modal/login/LogOutModal.vue";
import Hero from "@/components/Hero.vue";

export default {
  name: 'App',
  components: {Hero, LogOutModal, LoginModal},
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
      lastScrollY: 0,
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

    handleScroll() {
      const currentScrollY = window.scrollY;
      const navbar = this.$refs.navbar;

      if (currentScrollY > this.lastScrollY) {
        navbar.style.top = '-220px';
      } else {
        navbar.style.top = '0';
      }
      this.lastScrollY = currentScrollY;
    },
  },

  created() {
    this.updateNavMenu();
    this.$nextTick(() => {
      const navbar = this.$refs.navbar;
      if (navbar) {
        window.addEventListener('scroll', this.handleScroll);
      }
    });
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

