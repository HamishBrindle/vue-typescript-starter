<template>
  <div class="contact__wrapper">
    <div class="contact">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'Contact',
  components: {},
})
export default class Contact extends Vue {

}
</script>

<style lang="scss">
// .contact {}
</style>
