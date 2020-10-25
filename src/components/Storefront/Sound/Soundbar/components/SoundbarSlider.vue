<template>
  <div class="soundbar-slider">
    <span class="soundbar-slider__time-indicator">
      {{ startTimeMinutes }}
    </span>
    <v-slider
      class="soundbar-slider__slider"
      :value="currentTime"
      :min="0"
      :max="totalTime"
      track-fill-color="primary"
      hide-details
      @start="onStart"
      @end="onEnd"
      @mousedown="onMousedown"
      @mouseup="onMouseup"
    />
    <span class="soundbar-slider__time-indicator">
      {{ totalTimeMinutes }}
    </span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Utilities } from '@/tools/Utilities';

@Component({
  name: 'SoundbarSlider',
})
export default class SoundbarSlider extends Vue {
  @Prop({ required: true, default: 0 })
  private readonly currentTime!: number;

  @Prop({ required: true, default: 100 })
  private readonly totalTime!: number;

  private get startTimeMinutes() {
    return Utilities.msToTime(this.currentTime);
  }

  private get totalTimeMinutes() {
    return Utilities.msToTime(this.totalTime);
  }

  private onStart(value: number) {
    this.$emit('start', value);
  }

  private onEnd(value: number) {
    this.$emit('end', value);
  }

  private onMousedown(event: MouseEvent) {
    this.$emit('mousedown', event);
  }

  private onMouseup(event: MouseEvent) {
    this.$emit('mouseup', event);
  }
}
</script>

<style lang="scss">
.soundbar-slider {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;

  &__time-indicator {
    opacity: 0.8;
    margin: 0 1rem;
  }
}
</style>
