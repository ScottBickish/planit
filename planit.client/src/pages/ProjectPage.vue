<template>
  <div class="row container-fluid ps-0">
    <div class="col-2 mt-3 ms-0 p-0" id="edit-div">
      <button
        class="btn gradient text-light px-5"
        data-bs-toggle="offcanvas"
        href="#projects-offcanvas"
        style="font-size: 45px"
      >
        P
      </button>
    </div>
    <div class="col-md-10 my-4">
      <div class="row align-items-center">
        <h1 style="font-size: 60px;" >{{ activeProject.name }}</h1>
      </div>
      <div class="row">
        <p>{{ activeProject.description }}</p>
      </div>
      <div class="row align-items-center">
        <div class="col-8 my-5">
          <h3 class="gradient-text">Sprints</h3>
          <p>Group your tasks into sprints for over-arching collections for better organization.</p>
        </div>
        <div class="col-4 text-end">
          <button
            style="font-size: 18px;"
            class="btn btn-lg rounded btn-outline-custom gradient-text px-5"
            data-bs-toggle="modal"
            data-bs-target="#SprintForm"
            title="create-sprint"
          >
            Add Sprint
          </button>
        </div>
      </div>
      <div class="row">

      </div>
    </div>
    <!-- NOTE this is just the off canvas on the page  -->
    <ProjectsComponent />
  </div>
  <Modal id="ProjectForm">
    <template #modal-title> Create Project! </template>

    <template #modal-body> <ProjectForm /> </template>
  </Modal>

  <!-- NOTE inject the sprint template here -->
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
    watchEffect(async () => {
      try {
        await projectsService.getProjectById(route.params.id)
      } catch (error) {
        logger.error(error)
        Pop.toast("Something went wrong", 'error')
      }
    })
    return {
      projects: computed(() => AppState.projects),
      activeProject: computed(() => AppState.activeProject),
      account: computed(() => AppState.account)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>