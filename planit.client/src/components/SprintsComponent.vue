<template>
  <div class="Sprint-component">
    <form @submit.prevent="createSprint(id)">
      <label>Sprint Name</label>
      <input
        type="text"
        placeholder="Sprint Name..."
        name="sprint"
        id="sprint"
        class="form-control"
        v-model="sprint.name"
      />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import { sprintsService } from "../services/SprintsService"
import { useRoute } from "vue-router"
export default {
  setup() {
    const route = useRoute()
    watchEffect(async () => {
      try {
        if (route.params.id) {
          await sprintsService.getSprints(route.params.id)
        }
        await sprintsService.createSprint(route.params.id)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      sprint: computed(() => AppState.sprints),
      project: computed(() => AppState.activeProjects)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>