<template>
  <header>
    <div class="hero-container">
      <h2>Hea pidu hea ilmaga!</h2>
      <p>Kõik piletid Eesti suvesündmustele ühest kohast - vali, osta, pidutse!</p>
    </div>
  </header>
</template>
<script>
export default {
  name: 'Hero'
}
</script>


<style scoped>
header {
  position: relative;
  height: 100vh;
  background-image: linear-gradient(
      to bottom,
      rgba(34, 34, 34, 0.3), /* Lighter color at the top */
      rgba(34, 34, 34, 0.3) /* Darker color towards the bottom */
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
}

.hero-container h2 {
  color: #f0f1ed;
  font-size: 62px;
  margin-bottom: 32px;
  line-height: 1.3;
}

.hero-container p {
  color: #e1e2db;
  font-size: 30px;
  line-height: 1.05;
  font-weight: 500;
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