<template>
  <LoginModal ref="heroLoginModalRef"/>
  <header>
    <div class="hero-container">
      <h2>Hea pidu hea ilmaga!</h2>
      <p>Kõik piletid Eesti suvesündmustele ühest kohast - loo konto, vali sündmus, osta piletid ja pidutse!</p>

      <div class="hero-buttons">
        <button @click="openLogInModal" type="submit"
                class="button-success btn btn-primary text-center text-nowrap">
          Logi sisse
        </button>
        <button @click="navigateToNewUserView" type="submit"
                class="button-neutral btn btn-primary text-center text-nowrap">
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
  methods: {
    openLogInModal() {
      this.$refs.heroLoginModalRef.$refs.modalRef.openModal()
    },

    navigateToNewUserView() {
      router.push({name: 'newUserRoute'})
    },
  }
}
</script>

<style scoped>
header {
  position: relative;
  height: 100vh;
  background-image: linear-gradient(
      to bottom,
      rgba(34, 34, 34, 0.3), /* Lighter color at the top */ rgba(34, 34, 34, 0.3) /* Darker color towards the bottom */
  ), url(../assets/images/hero-aranxa-esteve-unsplash.jpg);
  background-size: cover;
  background-position: center;
  transition: height 0.3s ease-in-out;
}

.hero-container {
  width: 100%;
  max-width: 1200px;
  position: absolute;
  text-align: center;
  padding: 0 15px;
  top: 20%;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: column;
  gap: 35px;
}

.hero-container h2 {
  color: #f0f1ed;
  font-size: 62px;
  line-height: 1.3;
}

.hero-container p {
  color: #e1e2db;
  font-size: 30px;
  line-height: 1.05;
  font-weight: 500;
}

.btn {
  font-size: 20px;
  font-weight: 600;
  display: inline-block;
  padding: 16px 32px;
  border-radius: 9px;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 32px;
}


/* Responsive Adjustments */
@media (max-width: 1200px) {
  .hero-container {
    width: 80%;
  }
}

@media (max-width: 992px) {
  .hero-container {
    width: 70%;
  }
}

@media (max-width: 768px) {
  .hero-container {
    width: 80%;
  }
}

@media (max-width: 576px) {
  .hero-container {
    width: 90%;
  }
}
</style>