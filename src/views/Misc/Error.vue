<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-col
      cols="12"
      sm="8"
      md="4"
    >
      <div class="error-page__wrapper">
        <div class="error-page">
          <v-card>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="error-page__code headline">
                  {{ errorCode }}
                </v-list-item-title>
                <v-list-item-subtitle>{{ errorReason }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-card-text>
              <div class="error-page__message">
                {{ errorMessage }}
              </div>
            </v-card-text>
            <v-card-actions>
              <div class="error-page__cta">
                <router-link
                  v-slot="{ href, navigate }"
                  :to="{ name: 'home' }"
                >
                  <v-btn
                    color="primary"
                    text
                    depressed
                    large
                    :href="href"
                    @click="navigate"
                  >
                    Go Home
                  </v-btn>
                </router-link>
              </div>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'Error',
})
export default class Error extends Vue {
  @Prop({ required: false })
  code!: number;

  @Prop({ required: false })
  reason!: string;

  @Prop({ required: false })
  message!: string;

  get errorCode() {
    return this.code ?? '500';
  }

  get errorReason() {
    return this.reason ?? 'Server is unresponsive';
  }

  get errorMessage() {
    return this.message ?? 'Sorry! Our server is unresponsive at the moment. Check back again later!';
  }
}
</script>

<style lang="scss">
.error-page {
  &__cta {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
  }
}
</style>
