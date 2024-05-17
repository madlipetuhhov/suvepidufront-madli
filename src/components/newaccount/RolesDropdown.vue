<template>
  <select v-model="selectedRoleId" @change="emitSelectedRoleId" class="form-select">
    <option v-for="role in roles" :value="role.roleId" :key="role.roleId">{{ role.roleName }}</option>
  </select>
</template>

<script>
import router from "@/router";

export default {
  name: 'RolesDropdown',

  data() {
    return {
      selectedRoleId: 1,
      roles: [
        {
          roleId: 0,
          roleName: ''
        }
      ]
    }
  },

  methods: {
    sendGetRolesRequest() {
      this.$http.get('/roles')
          .then(response => {
            this.roles = response.data
          })
          .catch(() => {
            router.push({name: 'errorRoute'})
          })
    },

    emitSelectedRoleId() {
      this.$emit('event-selected-role-change', this.selectedRoleId)
    },

  },

  beforeMount() {
    this.sendGetRolesRequest()
  }

}
</script>

