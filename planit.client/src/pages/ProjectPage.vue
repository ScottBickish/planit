<template>
  <div class="d-flex justify-content-between">
    <div v-if="account.id" class="row justify-content-end" id="">
      <div class="col-3 m-4" id="edit-div">
        <button
          class="btn btn-outline-primary rounded px-4"
          data-bs-toggle="offcanvas"
          href="#projects-offcanvas"
        >
          P
        </button>
      </div>
    </div>
    <ProjectsComponent />
  </div>
  <Modal id="ProjectForm">
    <template #modal-title> Create Project! </template>

    <template #modal-body> <ProjectForm /> </template>
  </Modal>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>