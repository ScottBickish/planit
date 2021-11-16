<template>
  <div class="component">


  </div>
</template>


<script>
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
export default {
  setup(){
    return {
      async createProject() {
        try {
          await projectsController.createProject()
        } catch (error) {
          logger.error(error)
          Pop.toast("Something is not right!", 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>