import Vue from 'vue'
import App from './App.vue'
import router from './router';

Vue.config.productionTip = false

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; 
import { getDatabase } from "firebase/database"; // ✅ Realtime DB용
import { getFirestore } from "firebase/firestore"; // ✅ Firestore
import { getAuth } from "firebase/auth"; // ✅ auth
import vuetify from './plugins/vuetify'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const fs = getFirestore(app);
const auth = getAuth(app);

Vue.prototype.$db = db;
Vue.prototype.$fs = fs;
Vue.prototype.$auth = auth;

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
