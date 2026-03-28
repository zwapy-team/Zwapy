// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBazCIc5vdQInSwvqvohIcbPToTjnw7KJI",
  authDomain: "zwapy-25.firebaseapp.com",
  projectId: "zwapy-25",
  storageBucket: "zwapy-25.firebasestorage.app",
  messagingSenderId: "30612332450",
  appId: "1:30612332450:web:9e23f36a69f89dbb325cfb",
  measurementId: "G-THCGY8NH1Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// --- ANALYTICS TRACKING START ---
const analytics = getAnalytics(app);

// 1. Automatically track every time a student opens Zwapy
logEvent(analytics, 'page_view');

// 2. Track Daily Active Users (DAU) when they are logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    // This tells Firebase: "This specific student is active today"
    logEvent(analytics, 'login', {
      method: 'Google'
    });
    console.log("Zwapy Analytics: Active User Tracked!");
  }
});

// Export everything so your other files (login.js, dashboard.js) still work
export { app, auth, provider, db, analytics, logEvent };