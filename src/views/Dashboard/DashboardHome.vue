<template>
  <div class="dashboard-home__wrapper">
    <v-row>
      <v-col>
        <span class="display-1 font-weight-light">Overview</span>
      </v-col>
    </v-row>
    <v-row justify="start">
      <v-col
        v-for="card in reports"
        :key="card.title"
        sm="8"
        md="4"
      >
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card>
              <v-img
                class="white--text align-end"
                height="20rem"
                :src="card.image"
                contain
              />

              <v-card-title>{{ card.title }}</v-card-title>

              <v-card-subtitle class="pb-0">
                {{ card.category }}
              </v-card-subtitle>

              <v-card-text class="text--primary">
                <div>{{ card.body }}</div>
              </v-card-text>

              <v-fade-transition>
                <v-overlay
                  v-if="hover"
                  absolute
                  color="primary"
                >
                  <v-btn
                    v-for="{ action, title } in card.actions"
                    :key="title"
                    color="accent"
                    @click="() => $router.push({ name: action })"
                  >
                    {{ title }}
                  </v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import constants from '@/constants.json';

export default {
  name: 'DashboardHome',
  data() {
    return {
      applicationName: constants.appName,
    };
  },
};
</script>
