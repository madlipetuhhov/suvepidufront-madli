<template>
  <div>
    <div class="input-group mb-3">
      <span class="input-group-text">Kasutajanimi</span>
      <input v-model="username" type="text" class="form-control ">
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text">Parool</span>
      <input v-model="password" type="password" class="form-control">
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text">Parool uuesti</span>
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