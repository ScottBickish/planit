<template>
 <div class="d-flex justify-content-between">
    <div class="text-end" v-if="account.id">
      <button
        title="create-project"
        class="mdi mdi-plus bg-success m-3"
        data-bs-toggle="modal"
        data-bs-target="#ProjectForm">
      </button>
    </div>
  </div>

  <Modal id="ProjectForm">
    <template #modal-title> Create Project! </template>

    <template #modal-body> <ProjectForm /> </template>
  </Modal>
</template>

<script>
import { AppState } from "../AppState"
import { computed } from "@vue/runtime-core"
export default {
  name: 'Home',
  setup() {
    return {
      projects: computed(() => AppState.projects)
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
