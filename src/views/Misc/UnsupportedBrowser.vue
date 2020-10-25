<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-col
      cols="auto"
    >
      <div class="unsupported-browser">
        <v-card>
          <v-card-title>
            <span class="text-h4 unsupported-browser__message">
              Sorry! Your current browser is not supported
              <v-icon x-large>mdi-emoticon-sad-outline</v-icon>
            </span>
          </v-card-title>
          <v-card-text>
            <span class="text-subtitle-1 unsupported-browser__message">
              Please install and use one of the browsers listed below:
            </span>
            <v-list>
              <v-list-item
                v-for="{ icon, name } in supportedBrowsers"
                :key="name"
              >
                <v-list-item-icon>
                  <v-icon>{{ icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>{{ name }}</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'UnsupportedBrowser',
})
export default class UnsupportedBrowser extends Vue {
  private readonly supportedBrowsers = [
    { icon: 'mdi-google-chrome', name: 'Google Chrome' },
    { icon: 'mdi-firefox', name: 'Mozilla Firefox' },
    { icon: 'mdi-microsoft-edge', name: 'Microsoft Edge' },
    { icon: 'mdi-apple-safari', name: 'Safari' },
    { icon: 'mdi-opera', name: 'Opera' },
  ]
}

</script>
