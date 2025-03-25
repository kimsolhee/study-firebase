<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <div style="top: 73px; position: relative; left: 26px;">
      <h1>Google 로그인 예제 (Vue 2)</h1>
      <v-btn v-if="!user" color="primary" @click="loginWithGoogle">Google로 로그인</v-btn>
      <div v-else>
        <p>환영합니다, {{ user.displayName }} ({{ user.email }})</p>
        <v-btn color="error" @click="logout">로그아웃</v-btn>
    </div>
    </div>
    <router-view />
  </v-app>
</template>

<script>
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  name: 'App',
  components: {
  },
  created() {
    // 로그인 상태 감지
    onAuthStateChanged(this.$auth, (user) => {
      if (user) {
        this.user = user;
        console.log("로그인 상태:", user);
      } else {
        this.user = null;
        console.log("로그아웃 상태");
      }
    });
  },
  data () {
    return {
      user: null,
      auth: null
    }
  },
  methods: {
    loginWithGoogle() {
      const provider = new GoogleAuthProvider();
      try {
        const result = signInWithPopup(this.$auth, provider);
        this.$nextTick(() => {
          this.user = result.user;
          console.log("로그인 성공:", this.user);
        })
      } catch (error) {
        console.error("로그인 실패:", error.message);
      }
    },
    logout() {
      try {
        signOut(this.$auth);
        this.user = null;
        console.log("로그아웃 성공");
      } catch (error) {
        console.error("로그아웃 실패:", error.message);
      }
    }
  }
};
</script>
