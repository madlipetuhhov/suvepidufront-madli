<template>
  <div>
    <div class="input-group mb-3">
      <span class="input-group-text me-3">Kasutajanimi</span>
      <input v-model="username" type="text" class="form-control ">
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text me-3">Parool</span>
      <input v-model="password" type="password" class="form-control">
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text me-3">Parool uuesti</span>
      <input type="password" class="form-control">
    </div>
  </div>
</template>
<script>
export default {
  name: 'UserInfo',
  data() {
    return {
      username: '',
      password: ''
    }
  }
}

</script>