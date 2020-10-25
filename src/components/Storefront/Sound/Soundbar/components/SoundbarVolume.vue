<template>
  <div class="soundbar-volume">
    <v-slider
      v-model="value"
      class="soundbar-volume__slider"
      min="0"
      max="100"
      tick-size="1"
      hide-details
      @end="onAdjustVolume"
    >
      <v-btn
        slot="prepend"
        text
        color="primary"
        @click="muted = !muted"
      >
        <v-icon>
          mdi-volume-source
        </v-icon>
      </v-btn>
    </v-slider>
  </div>
</template>

<script lang="ts">
import {
  Vue, Component, Prop, Watch,
} from 'vue-property-decorator';

@Component({
  name: 'SoundbarVolume',
})
export default class SoundbarVolume extends Vue {
  @Prop({ required: true, default: 0.5 })
  private readonly volume!: number;

  private value = 50;

  private muted = false;

  created() {
    this.value = this.volume * 100;
  }

  @Watch('volume')
  private watchVolume() {
    this.value = this.volume * 100;
  }

  @Watch('muted')
  private watchMuted(isMuted: boolean) {
    this.$emit('mute', isMuted);
  }

  private onAdjustVolume(volume: number) {
    return this.$emit('adjust', volume / 100);
  }
}
</script>

<style lang="scss">
.soundbar-volume {
  width: 100%;

  &__slider.v-input {
    align-items: center;
  }
}
</style>
