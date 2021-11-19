<template>
  <div class="row m-2 border border-dark p-2 align-items-center">
    <div class="col d-flex justify-content-start align-items-center">
      <input
        v-model="task.isComplete"
        class="form-check-input me-4"
        type="checkbox"
        name=""
        id="chkbx"
        @click="toggleCheckbox()"
      />
      <h5 class="m-0">{{ task.name }}</h5>
      <i
        class="mdi mdi-trash-can-outline mdi-24px selectable ms-4"
        v-if="account.id === task.creatorId"
        @click="removeTask(task)"
      ></i>
    </div>
    <div class="row">
      <div class="col-1">
        <p>
          Nct
          <i
            class="
              mdi mdi-comment-text-multiple-outline mdi-24px
              gradient-text
              selectable
            "
            data-bs-toggle="offcanvas"
            href="#notes-offcanvas"
            @click="setactiveTask()"
          ></i>
        </p>
      </div>
      <div class="col-1">
        <p>
          {{ task.weight }}
          <i class="mdi mdi-weight mdi-24px gradient-text2"></i>
        </p>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { tasksService } from "../services/TasksService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { AppState } from "../AppState"
import { useRoute } from "vue-router"
export default {
  props: {
    task: Object
  },
  setup(props) {
    const route = useRoute()
    return {
      account: computed(() => AppState.account),
      setactiveTask() {
        AppState.activeTaskId = props.task.id
      },
      route,
      project: computed(() => AppState.projects),
      async toggleCheckbox() {
        try {
          await tasksService.toggleCheckbox(route.params.id, props.task)
        } catch (error) {
          logger.error(error)
          Pop.toast("Somthing went wrong!", 'error')
        }
      },
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