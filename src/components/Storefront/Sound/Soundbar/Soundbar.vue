<template>
  <div class="soundbar__wrapper">
    <div class="soundbar">
      <div class="soundbar__container">
        <!--  Controls -->
        <soundbar-controls
          class="soundbar__controls"
          :playing="isPlaying"
          @prev="onControlsPrev"
          @play="onControlsPlay"
          @pause="onControlsPause"
          @next="onControlsNext"
        />

        <!-- Time slider -->
        <!-- Time indicators (current and total time) -->
        <soundbar-slider
          class="soundbar__slider"
          :current-time="currentTime"
          :total-time="totalTime"
          :skeleton="!isPlaying"
          @start="onSliderStart"
          @end="onSliderEnd"
          @mousedown="onSliderMousedown"
          @mouseup="onSliderMouseup"
        />

        <!-- Volume & Mute -->
        <soundbar-volume
          class="soundbar__volume"
          :volume="volume"
          :mute="isMuted"
          @adjust="onVolumeAdjust"
          @mute="onVolumeMute"
        />

        <!-- Track image, title, artist -->
        <soundbar-info
          class="soundbar__info"
          :artist="song.artist"
          :title="song.title"
          :img="song.img"
        />

        <!-- Add to cart button -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { SoundcloudService } from '@/services/SoundcloudService';
import { SoundcloudStreamer } from '@/lib/SoundcloudStreamer';
import { Logger } from '@/tools/Logger';
import SoundbarControls from './components/SoundbarControls.vue';
import SoundbarSlider from './components/SoundbarSlider.vue';
import SoundbarInfo from './components/SoundbarInfo.vue';
import SoundbarVolume from './components/SoundbarVolume.vue';

@Component({
  name: 'Soundbar',
  components: {
    SoundbarControls,
    SoundbarSlider,
    SoundbarInfo,
    SoundbarVolume,
  },
})
export default class Soundbar extends Vue {
  private readonly soundcloudService = SoundcloudService.getInstance();

  private streamer: SoundcloudStreamer = Vue.observable(this.soundcloudService.getStreamer());

  private readonly logger: Logger = new Logger({ context: 'Soundbar' });

  /**
   * TODO: Remove when real deal comes in
   */
  private readonly song = {
    track: '279764235',
    artist: 'Young & Shameless',
    title: 'White Ferrari (Remix)',
    img: '',
  }

  private get isPlaying() {
    return this.streamer.playing;
  }

  private get currentTime() {
    return this.streamer.time;
  }

  private get totalTime() {
    return this.streamer.duration;
  }

  private get volume() {
    return this.streamer.volume;
  }

  private get isMuted() {
    return this.streamer.muted;
  }

  mounted() {
    this.soundcloudService.stream(this.song.track);
  }

  private onControlsPlay() {
    this.streamer.play();
  }

  private onControlsPause() {
    this.streamer.pause();
  }

  private onControlsPrev() {
    this.logger.info(`${this.$options.name}: onControlsPrev`);
  }

  private onControlsNext() {
    this.logger.info(`${this.$options.name}: onControlsNext`);
  }

  private onSliderStart() {
    this.streamer.pause();
  }

  private onSliderEnd(value: number) {
    this.streamer.seek(value).then(() => this.streamer.play());
  }

  private onSliderMousedown(/* event: MouseEvent */) {
    this.logger.info(`${this.$options.name}: onSliderMousedown`);
  }

  private onSliderMouseup(/* event: MouseEvent */) {
    this.logger.info(`${this.$options.name}: onSliderMouseup`);
  }

  private onVolumeAdjust(volume: number) {
    this.streamer.setVolume(volume);
  }

  private onVolumeMute(isMuted: boolean) {
    this.streamer.setMuted(isMuted);
  }
}
</script>

<style lang="scss">
.soundbar {
  width: 100%;
  height: 2vw;
  min-height: 3.125rem;
  background: #e3e3e3;

  &__container {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__controls {
    margin-left: 1rem;
    width: 10vw;
    min-width: 7.5rem;
  }

  &__slider {
    width: 100%;
  }

  &__volume {
    max-width: 200px;
  }
}
</style>
