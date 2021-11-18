<template>
  <div class="m-2 border border-dark p-2">
    <p><span> NAME:</span> {{ task.name }}</p>

    <p><span>WEIGHT</span> {{ task.weight }}</p>
    <i
      class="mdi mdi-trash-can-outline mdi-24px selectable"
      @click="removeTask(task)"
    ></i>
  </div>
</template>


<script>
import { tasksService } from "../services/TasksService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
export default {
  props: {
    task: Object
  },
  setup() {
    return {
      async removeTask(task) {
        try {
          if (await Pop.confirm('Are you sure you want to delete this task?')) {
            await tasksService.removeTask(task)
            Pop.toast('You have deleted this task!', 'success')
          }

        } catch (error) {
          logger.error(error)
          Pop.toast('error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>