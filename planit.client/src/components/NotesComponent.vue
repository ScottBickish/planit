<template>
  <div class="Notes">
    <form class="input-group" action="">
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="notes-offcanvas"
        aria-labelledby="create-note"
      >
        <div class="offcanvas-header">
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
          <h4 class="offcanvas-title" id="offcanvasWithBackdropLabel">
            <!-- S{{ index + 1 }}
            {{ sprint.name }} -->
            Notes
          </h4>
        </div>
        <div class="offcanvas-body container-fluid scrollbar-ripe-malinka">
          <div class="row align-items-center">
            <div style="display: inline;" class="col">
              <form class="" @submit.prevent="createNote()">
                <input v-model="note.body" class="form-control" type="text" id="note" placeholder="Say something..."><button class="gradient rounded" @click="closeCanvas()"><i class="mdi mdi-send text-light"></i>
                </button>
              </form>
            </div>
          </div>
          <div v-for="note in notes" :key="note.id">
            <SingleNote :note = "note"/>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity"
import { useRoute } from "vue-router"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { notesService } from "../services/NotesService"
import { AppState } from "../AppState"
import { Offcanvas } from "bootstrap"
export default {

  setup() {
    const route = useRoute()
    const note = ref({})
    return {
      route,
      note,
      async createNote() {
        try {
          await notesService.createNote(route.params.id, note.value)
          note.value = {}
        } catch (error) {
          logger.error(error)
          Pop.toast("Something went wrong!", 'error')
        }
      },
      closeCanvas() {
        const myOffcanvas = Offcanvas.getOrCreateInstance(document.getElementById('notes-offcanvas'))
        myOffcanvas.hide()
      },
      notes: computed(() => AppState.notes)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>