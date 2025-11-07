import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyAexAkE20Ea9gf7dMd4YWOuPhGR9S_K0TE",
  authDomain: "phishield-4c582.firebaseapp.com",
  projectId: "phishield-4c582",
  storageBucket: "phishield-4c582.firebasestorage.app",
  messagingSenderId: "907398384159",
  appId: "1:907398384159:web:404fc7acbc70784228232a",
  measurementId: "G-ZQCYS0TETH",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export default app;
