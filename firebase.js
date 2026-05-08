// firebase.js — Zwapy Core Config
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getAnalytics, logEvent, setUserId, setUserProperties } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBazCIc5vdQInSwvqvohIcbPToTjnw7KJI",
  authDomain: "zwapy-25.firebaseapp.com",
  projectId: "zwapy-25",
  storageBucket: "zwapy-25.firebasestorage.app",
  messagingSenderId: "30612332450",
  appId: "1:30612332450:web:9e23f36a69f89dbb325cfb",
  measurementId: "G-THCGY8NH1Z"
};

const app      = initializeApp(firebaseConfig);
const auth     = getAuth(app);
const provider = new GoogleAuthProvider();
const db       = getFirestore(app);
const analytics= getAnalytics(app);

// ── TRACK PAGE VIEW on every page load ──
logEvent(analytics, 'page_view', {
  page_location: window.location.href,
  page_title: document.title
});

// ── TRACK ACTIVE USER when logged in ──
onAuthStateChanged(auth, (user) => {
  if (user) {
    setUserId(analytics, user.uid);
    setUserProperties(analytics, {
      platform: 'zwapy_web'
    });
    logEvent(analytics, 'user_engagement', {
      engagement_time_msec: 1000
    });
  }
});

export { app, auth, provider, db, analytics, logEvent };