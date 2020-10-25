<template>
  <div class="error__wrapper">
    <div class="error">
      <v-container fluid>
        <v-row justify="center">
          <v-col
            cols="12"
            md="8"
          >
            <v-card>
              <v-card-title>
                <h1 class="display">
                  {{ title }}
                </h1>
              </v-card-title>
              <v-card-subtitle>
                <span class="body">{{ subtitle }}</span>
              </v-card-subtitle>

              <v-card-text>
                Please contact support at {{ supportEmail }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import constants from '@/constants.json';

@Component({
  name: 'Error',
})
export class Error extends Vue {
  private readonly title = 'Uh-Oh!'

  private readonly subtitle = 'There was an issue loading this page... We\'re so sorry 🤦‍♂️'

  private readonly supportEmail = constants.supportEmail;
}

export default Error;
</script>

<style lang="scss">
.error {
  height: inherit;

  &__wrapper {
    height: 100%;
  }
}
</style>
