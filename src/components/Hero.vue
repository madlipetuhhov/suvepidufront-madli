<template>
  <header>
    <div class="hero-container">
      <h2 class="hero-title">Hea pidu hea ilmaga!</h2>
      <p class="hero-text">Kõik piletid Eesti suvesündmustele ühest kohast - loo konto ning osta ja müü pileteid!</p>
      <div v-if="isNewUser" class="hero-button">
        <button @click="navigateToNewUserView" type="submit"
                class="btn-neutral btn-hero">
          Loo konto
        </button>
      </div>
    </div>
  </header>
</template>
<script>
import router from "@/router";
import LoginModal from "@/components/modal/login/LoginModal.vue";

export default {
  name: 'Hero',
  components: {LoginModal},
  data() {
    return {
      isNewUser: true
    }
  },
  //  created lifecycle hook calls checkUserStatus when the component is created.
  //  This ensures the user's login status is checked as soon as the component is loaded.
  created() {
    this.checkUserStatus();
  },
  methods: {
    navigateToNewUserView() {
      router.push({ name: 'newUserRoute' });
    },

    // Checks the session storage for userId to determine if the user is logged in. If userId exists,
    // isNewUser is set to false; otherwise, it remains true.
    checkUserStatus() {
      let userId = sessionStorage.getItem('userId');
      this.isNewUser = userId === null;
    }
  }
}
</script>

<style scoped>

</style>