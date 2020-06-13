import firebase from "firebase";
require("dotenv").config();

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY, //"AIzaSyC3x649bQns_NuazQdBEC-Q1L7qg_-OF0w",
  authDomain: process.env.REACT_APP_AUTH_DOMAIN, //"connect-day.firebaseapp.com",
  databaseURL: process.env.REACT_APP_DATABASE_URL, //"https://connect-day.firebaseio.com",
  projectId: process.env.REACT_APP_PROJECT_ID, //"connect-day",
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET, //"connect-day.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID, //"561110723696",
  appId: process.env.REACT_APP_APP_ID, //"1:561110723696:web:38a296b23b4355531f18b5",
  measurementId: process.env.REACT_APP_MEASUREMENT_ID, //"G-R4QY5JT5N6",
};

export function initApp() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}
