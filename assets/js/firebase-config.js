// TODO: REPLACE THESE PLACEHOLDERS WITH YOUR ACTUAL FIREBASE AND CLOUDINARY CONFIGURATIONS

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDxnnMEhqaRoGrz7SDBOGB2OCwXfK6J4s0",
  authDomain: "mr-clicks.firebaseapp.com",
  projectId: "mr-clicks",
  storageBucket: "mr-clicks.firebasestorage.app",
  messagingSenderId: "700112365110",
  appId: "1:700112365110:web:844ef3f0fb89801556da97",
  measurementId: "G-56RKJWHYM8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Cloudinary Config
export const cloudinaryConfig = {
  cloudName: "qgnie2on",
  uploadPreset: "mr-clicks" // Make sure this preset is set to "Unsigned" in Cloudinary settings
};
