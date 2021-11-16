<template>
   <div class="post a post component row container-fluid">
    <form @submit.prevent="create()">
      <div class="col">
        <input type="text" name:="projectTitle" placeholder="Title here.."
        v-model="project.name" />
        <textarea
          name="post-body"
          id=""
          cols="40"
          rows="5"
          placeholder="Text Here..."
          required
          v-model="project.description"
        ></textarea>
      </div>
      <div class="col">
        <span>
          <button type="submit" class="bg-success ms-2">
            POST
          </button>
        </span>
      </div>
    </form>
  </div>
</template>


<script>
import { ref } from "@vue/reactivity";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { projectsService } from "../services/ProjectsService"
export default {
  setup(){
    const project = ref ({})
    return {
      project,
      async createProject() {
        try {
          await projectsService.createProject(projects.value)
          Modal.getOrCreateInstance(document.getElementById("PostForm")).hide();
          projects.value = {}
        } catch (error) {
          logger.error(error)
          Pop.toast("Something is not right", 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>