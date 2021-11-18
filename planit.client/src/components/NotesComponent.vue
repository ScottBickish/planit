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
          <h4 class="offcanvas-title" id="offcanvasWithBackdropLabel">Notes</h4>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body container-fluid scrollbar-ripe-malinka">
          <div class="row align-items-center">
            <div class="me-auto col-8 selectable"></div>
            <div class="col-2 text-center">
              <i
                class="mdi mdi-trash-can-outline mdi-24px selectable"
                @click="removeNote(id)"
              ></i>
            </div>
          </div>
        </div>
        <div class="text-end">
          <button
            class="btn rounded mx-3 my-2 gradient"
            title="create-note"
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
export default {
  setup() {
    return {
      closeCanvas() {
        const myOffcanvas = Offcanvas.getOrCreateInstance(document.getElementById('notes-offcanvas'))
        myOffcanvas.hide()
      },
    }
  }
}
</script>


<style lang="scss" scoped>
</style>