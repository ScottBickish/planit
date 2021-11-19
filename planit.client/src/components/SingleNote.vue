<template>
  <div class="row" v-if="note.creator">
    <div class="col-md-10 card-sprints">
      <div class="row">
        <div class="col text-end">
          <i
            class="mdi mdi-trash-can-outline mdi-24px selectable"
            @click="removeNote(note)"
          ></i>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <img class="img-container" :src="note.creator.picture" alt="" />
          {{ note.creator.name }}
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h6>
            {{ note.body }}
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { useRoute } from "vue-router"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { notesService } from "../services/NotesService"
export default {
  props: { note: Object },
  setup(props) {
    return {
      async removeNote(note) {
        try {
          if (await Pop.confirm('Are you sure you want to delete this note?')) {
            await notesService.removeNote(note)
          }
        } catch (error) {
          logger.error(error)
          Pop.toast('error')
        }
      },
      account: computed(() => AppState.account),

    }
  }
}
</script>


<style lang="scss" scoped>
</style>