<template>
  <Modal ref="modalRef">
    <template #title>
      <h3>Logi sisse</h3>
    </template>
    <template #body>
      <div class="container text-start">
        <div class="row justify-content-center">
          <div class="col">
            <div class="mb-3">
              <label for="username" class="form-label">Kasutajanimi</label>
              <input v-model="username" type="text" class="form-control" id="username">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Parool</label>
              <input v-model="password" type="password" class="form-control" id="password">
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #buttons>
      <button @click="sendLogInRequest" type="submit" class="button-success btn btn-primary text-center text-nowrap">
        Logi sisse
      </button>
      <button @click="executeNewUser" type="submit" class="button-cancel btn btn-primary text-center text-nowrap">Loo
        konto
      </button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";


export default {
  name: 'LoginModal',
  components: {Modal},
  data() {
    return {
      username: '',
      password: '',

      loginResponse: {
        userId: 0,
        roleName: ''
      },

      errorResponse: {
        message: '',
        errorCode: 0
      }

    }
  },
  methods: {
    executeNewUser() {
      this.$refs.modalRef.closeModal()
      router.push({name: 'newUserRoute'})
    },

    sendLogInRequest() {
      this.$http.get('/login', {
            params: {
              username: this.username,
              password: this.password
            }
          }
      ).then(response => {
        this.loginResponse = response.data
        this.handleLoginRequestResponse()
      }).catch(() => {
        router.push({name: 'errorRoute'})
        this.$refs.modalRef.closeModal()
      })
    },

    handleLoginRequestResponse() {
      this.saveLoginResponseInfoToSessionStorage()
      this.$emit('event-update-nav-menu')
      this.resetAllInputField()
      this.$refs.modalRef.closeModal()
      router.push({name: 'homeRoute'})
    },

    saveLoginResponseInfoToSessionStorage() {
      sessionStorage.setItem('userId', this.loginResponse.userId)
      sessionStorage.setItem('roleName', this.loginResponse.roleName)
    },

    resetAllInputField() {
      this.username = ''
      this.password = ''
    },
  },

}


</script>
