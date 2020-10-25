<template>
  <div class="soundbar-controls">
    <!-- Prev -->
    <div class="soundbar-controls__previous">
      <v-btn
        class="rounded-0 soundbar-controls__btn"
        color="black"
        text
        x-small
        @click="onClickPrevious"
      >
        <v-icon>
          mdi-skip-previous
        </v-icon>
      </v-btn>
    </div>

    <!-- Pause / Play -->
    <div class="soundbar-controls__play-pause">
      <v-btn
        v-if="!playing"
        class="rounded-0 soundbar-controls__btn"
        color="black"
        text
        x-small
        @click="onClickPlay"
      >
        <v-icon>
          mdi-play
        </v-icon>
      </v-btn>

      <v-btn
        v-else
        class="rounded-0 soundbar-controls__btn"
        color="black"
        text
        x-small
        @click="onClickPause"
      >
        <v-icon>
          mdi-pause
        </v-icon>
      </v-btn>
    </div>

    <!-- Next -->
    <div class="soundbar-controls__next">
      <v-btn
        class="rounded-0 soundbar-controls__btn"
        color="black"
        text
        x-small
        @click="onClickNext"
      >
        <v-icon>
          mdi-skip-next
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'SoundbarControls',
})
export default class SoundbarControls extends Vue {
  @Prop({ required: true, default: false })
  private readonly playing!: boolean;

  private onClickPrevious() {
    this.$emit('prev');
  }

  private onClickPlay() {
    this.$emit('play');
  }

  private onClickPause() {
    this.$emit('pause');
  }

  private onClickNext() {
    this.$emit('next');
  }
}
</script>

<style lang="scss">
.soundbar-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__btn {
    height: 2vw !important;
    width: 2vw !important;
    min-height: 2.5rem;
    min-width: 2.5rem;
  }
}
</style>
