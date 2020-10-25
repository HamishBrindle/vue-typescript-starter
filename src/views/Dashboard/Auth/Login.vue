<template>
  <div class="login-form__wrapper">
    <div class="login-form">
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          sm="8"
          md="4"
        >
          <v-card class="elevation-12">
            <v-toolbar
              color="primary"
              dark
              flat
            >
              <span class="headline">Login</span>
              <v-spacer />
              <v-toolbar-title>{{ applicationName }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-row
                align="center"
                justify="space-between"
              >
                <!-- Registration prompt -->
                <v-col cols="auto">
                  <span class="text-body-2">Don't have an account? </span>
                  <v-btn
                    color="primary"
                    text
                    depressed
                    small
                    :to="{ name: 'register' }"
                  >
                    Sign up
                  </v-btn>
                </v-col>
              </v-row>
              <v-form
                v-model="form.valid"
              >
                <v-text-field
                  v-model="form.email"
                  label="Login"
                  name="login"
                  :rules="[form.rules.required, form.rules.email]"
                  prepend-icon="mdi-account"
                  type="text"
                  @keyup="onKeyup"
                />
                <v-text-field
                  id="password"
                  ref="password"
                  v-model="form.password"
                  label="Password"
                  name="password"
                  :rules="[form.rules.required, form.rules.counter]"
                  prepend-icon="mdi-lock"
                  type="password"
                  @keyup="onKeyup"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                class="ml-10"
                color="grey darken-2"
                text
                depressed
                small
                :to="{ name: 'forgot-password' }"
              >
                Forgot password?
              </v-btn>
              <v-spacer />
              <v-btn
                :disabled="!form.valid"
                :loading="isLoggingIn"
                color="primary"
                text
                depressed
                large
                @click="login"
              >
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-snackbar
            v-model="isSnackbarVisible"
            class="dashboard-login__snackbar"
            top
            color="error"
          >
            <v-icon>mdi-alert-circle</v-icon>
            Login Error: {{ error }}
          </v-snackbar>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import constants from '@/constants.json';
import { Vue, Component } from 'vue-property-decorator';
import { AuthService } from '@/services/AuthService';
import { Logger } from '@/tools/Logger';

@Component({
  name: 'Login',
})
export default class Login extends Vue {
  /**
   * Application Name
   */
  private applicationName = constants.appName;

  /**
   * Error
   */
  private error = '';

  /**
   * Is Snackbar Visible
   */
  private isSnackbarVisible = false;

  /**
   * Is Logging In
   */
  private isLoggingIn = false;

  /**
   * Resolved router link to open in popout
   */
  private popoutHref = '';

  private readonly logger: Logger = new Logger({ context: 'Login' });

  /**
   * User Service for handling login requests and auth storage
   */
  private readonly authService: AuthService = AuthService.getInstance();

  /**
   * Form object for handling credentials
   */
  private readonly form = {
    email: '',
    password: '',
    valid: false,
    rules: {
      required: (value: string) => !!value || 'Required.',
      counter: (value: string) => value.length >= 5 || 'Invalid password',
      email: (value: string) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || 'Invalid e-mail';
      },
    },
  }

  mounted() {
    const resolved = this.$router.resolve({
      name: 'public-docs-md',
      params: {
        doc: 'user-manual',
      },
      query: {
        popped: 'yes',
      },
    });
    this.popoutHref = resolved.href;
  }

  /**
   * When enter key pressed in login form: focus password input, or login
   */
  private onKeyup(e: KeyboardEvent) {
    if (e.key !== 'Enter') {
      return;
    }
    if ((e.target as HTMLElement).id === 'password') {
      this.login();
      return;
    }
    (this.$refs.password as any).focus(); // eslint-disable-line @typescript-eslint/no-explicit-any
  }

  /**
   * Login and navigate to home
   */
  private async login() {
    if (!this.form.valid) {
      return;
    }

    this.isLoggingIn = true;

    try {
      await this.authService.login(this.form.email /* this.form.password */);
      this.$router.push({ name: 'orders-list' });
    } catch (error) {
      this.logger.error(error);
      this.error = error.message;
      this.isSnackbarVisible = true;
      setTimeout(() => {
        this.isLoggingIn = false;
      }, 1000);
    }
  }
}
</script>

<style lang="scss">
.login-form {
  width: inherit;

  &__wrapper {
    width: 100%;
  }

  &__snackbar {
    & .v-icon {
      margin-right: 0.5rem;
    }

    & .v-snack__content {
      // left align text (defaults to space-between)
      justify-content: start;
    }
  }
}
</style>
