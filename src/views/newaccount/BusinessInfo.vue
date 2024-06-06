<template>
  <div>
    <div class="input-group mb-3">
      <span class="input-group-text me-3">Ettevõtte ärinimi</span>
      <input v-model="companyName" type="text" class="form-control ">
    </div>

    <div class="input-group mb-3">
      <span class="input-group-text me-3">Registrikood</span>
      <input v-model="registryCode" type="text" class="form-control ">
    </div>

    <div class="input-group mb-3">
      <span class="input-group-text me-3">KMKR number</span>
      <input v-model="vatNumber" type="text" class="form-control ">
    </div>

    <div class="input-group mb-3">
      <span class="input-group-text me-3">Telefon</span>
      <input v-model="phone" type="text" class="form-control ">
    </div>

    <div class="input-group mb-3">
      <span class="input-group-text me-3">E-post</span>
      <input v-model="email" type="email" class="form-control ">
    </div>

  </div>
</template>
<script>
export default {
  name: 'BusinessInfo',
  data() {
    return {
      companyName: '',
      registryCode: '',
      vatNumber: '',
      phone: '',
      email: ''
    }
  },
}
</script>