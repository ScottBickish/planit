<template>
  <div class="row container-fluid" v-if="account.id">
      <div class="col-1 mt-3" id="edit-div">
        <button
          class="btn gradient text-light px-5"
          data-bs-toggle="offcanvas"
          href="#projects-offcanvas"
          style="font-size: 50px;">
          P
        </button>
      </div>
      <div class="col">
        <h1>{{activeProject.name}}</h1>
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
import { onMounted, watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { projectsService } from "../services/ProjectsService"
import { useRoute } from "vue-router"
export default {
  setup() { 
    const route = useRoute()
    watchEffect (async () => {
      try {
        await projectsService.getProjectById(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast("Something went wrong", 'error')
      }
    })
    return {
      projects: computed (() => AppState.projects),
      activeProject: computed (() => AppState.activeProject),
      account: computed(() => AppState.account)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>