<template>
  <div class="soundbar-info">
    <div class="soundbar-info__img-wrapper">
      <v-img
        class="soundbar-info__img"
        :src="imageSrc"
        :aspect-ratio="1"
        width="3.125rem"
      />
    </div>
    <div class="soundbar-info__title-artist">
      <span>{{ title }}</span>
      <span>{{ artist }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'SoundbarInfo',
})
export default class SoundbarInfo extends Vue {
  @Prop({ required: false, default: '' })
  private readonly img!: string;

  @Prop({ required: true, default: 'Unknown' })
  private readonly title!: string;

  @Prop({ required: true, default: 'Unknown' })
  private readonly artist!: string;

  private get imageSrc() {
    if (this.img) return this.img;
    const primary = this.$vuetify.theme.currentTheme.primary?.toString().substring(1);
    return `https://via.placeholder.com/150/${primary}/808080`;
  }
}
</script>

<style lang="scss">
.soundbar-info {
  display: flex;
  height: 100%;
  margin: 0 2rem;

  &__title-artist {
    margin-left: 0.75rem;
    display: flex;
    align-items: center;
    text-transform: lowercase;

    span:first-of-type {
      font-weight: 300;
      white-space: nowrap;
      padding-right: 0.25rem;
    }

    span:last-of-type {
      font-weight: 600;
      white-space: nowrap;
    }
  }
}
</style>
