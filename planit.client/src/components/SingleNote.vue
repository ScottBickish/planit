<template>
  <div class="row" v-if="note.creator">
    <div class="col-md-10 card-sprints">
      <div class="row">
        <div class="col">
          <img :src="note.creator.picture" alt="">
          {{note.creator.name}}
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h6>
            {{note.body}}
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  props: {note: Object},
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>