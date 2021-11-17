<template>
  <div class="Projects">
    <form class="input-group" action="">
      <div
        class="offcanvas offcanvas-start"
        tabindex="-1"
        id="projects-offcanvas"
        aria-labelledby="create-project"
      >
        <div class="offcanvas-header">
          <h4 class="offcanvas-title" id="offcanvasWithBackdropLabel">
            Projects
          </h4>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body container-fluid scrollbar-ripe-malinka">
          <div v-for="p in projects" :key="p.id" class="selectable">
            <router-link :to="{ name: 'ProjectPage', params: { id: p.id } }">
              {{ p.name }}
            </router-link>
          </div>
        </div>
        <div class="text-end">
          <button
            class="btn rounded mx-3 my-2 gradient"
            data-bs-toggle="modal"
            data-bs-target="#ProjectForm"
            title="create-project"
            @click="closeCanvas()"
          >
            Create
          </button>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
import *as bootstrap from "bootstrap"
import { projectsService } from "../services/ProjectsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { Offcanvas } from "bootstrap"
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  // props: {projects: {type: Object, required: true}},
  setup() {
    // logger.log(AppState.projects)
    return {
      closeCanvas() {
        const myOffcanvas = Offcanvas.getOrCreateInstance(document.getElementById('projects-offcanvas'))
        myOffcanvas.hide()
      },
      projects: computed(() => AppState.projects)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>