// =====================================================
// GRS-SIMA
// Firebase Configuration
// =====================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBIAFnd9kb7WYKSC8paI9_IDZxliiwxAy8",
    authDomain: "gading-rescue-squad.firebaseapp.com",
    projectId: "gading-rescue-squad",
    storageBucket: "gading-rescue-squad.firebasestorage.app",
    messagingSenderId: "241379848911",
    appId: "1:241379848911:web:04ece00b4a61f79ce5bdba"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Firestore Database
const db = getFirestore(app);

// Export Firestore
export { db };
