<template>
  <div class="col card-sprints rounded p-2">
    <div class="row align-items-center">
      <div class="col-6 d-flex align-items-center">
        <i class="mdi mdi-rhombus-outline mdi-48px me-3 gradient-text2"></i>
        <h4
          class="me-5 selectable"
          data-bs-toggle="collapse"
          :data-bs-target="'#s' + sprint.id"
        >
          S{{ index + 1 }}
          {{ sprint.name }}
        </h4>
        <!-- NOTE tasks from Appstate computed -->
        <!-- {{tasks.weight}} -->
        <!-- {{task.weight}} -->
        {{task.weight}}
        <i class="mdi mdi-weight mdi-48px mb-4 ms-5 gradient-text2"></i>
      </div>
      <div class="col-md-2 text-end">
        <button
          style="font-size: 15px"
          class="btn rounded btn-outline-custom gradient-text px-4"
          data-bs-toggle="modal"
          data-bs-target="#TaskForm"
          title="add-task"
          @click="setActiveSprint(sprint)"
        >
          Add Task <i class="ms-2 mdi mdi-plus-thick mdi-16px"></i>
        </button>
      </div>
      <div class="col-4 text-end px-5">
        <h4>
          <!-- NOTE need tasks in AppState and computed -->
          <!-- {{tasks.isCompleted.length}} / {{tasks.length}} -->
          0/0 Tasks Complete
        </h4>
      </div>
      <div
        :id="'s' + sprint.id"
        class="collapse"
        v-for="task in tasks"
        :key="task.id"
      >
        <SingleTask :task="task" />
        <div class="row">
          <div class="col text-end text-danger">
            Delete S{{ index + 1 }}
            <i
              class="mdi mdi-trash-can-outline mdi-24px selectable"
              @click="removeSprint(project.id, sprint.id)"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { sprintsService } from "../services/SprintsService"
export default {
  props: {
    sprint: Object,
    index: Number

  },
  setup(props) {
    return {
      async removeSprint(projectId, sprintId) {
        try {
          if (await Pop.confirm('Are you sure you want to delete this sprint?')) {
            await sprintsService.removeSprint(projectId, sprintId)
            Pop.toast('You have deleted this sprint!', 'success')
          }
        } catch (error) {
          logger.error(error)
          Pop.toast('You cannot delete this sprint')
        }
      },
      project: computed(() => AppState.activeProject),
      tasks: computed(() => AppState.tasks.filter(t => t.sprintId == props.sprint.id)),
      setActiveSprint(sprint) {
        AppState.activeSprintId = sprint.id
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>