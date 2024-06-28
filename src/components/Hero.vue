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
      rgba(34, 34, 34, 0.4),
      rgba(34, 34, 34, 0.4)
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
  top: 25%;
  left: 50%;
  transform: translate(-50%, 0);
}

.hero-container h2 {
  color: #e1e2db;
  font-size: 52px;
  margin-bottom: 32px;
  line-height: 1.05;
}

.hero-container p {
  color: #e1e2db;
  font-size: 24px;
  line-height: 1.6;
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