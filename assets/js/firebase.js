/* =========================================
   FIREBASE CONFIG
========================================= */

import { initializeApp }

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

    getFirestore

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* =========================================
   YOUR FIREBASE CONFIG
========================================= */

const firebaseConfig = {

    apiKey:
    "AIzaSyAwDmBZ85PyL6_MgwJMI5fr9fdDL4zIs9U",

    authDomain:
    "primerulstudio.firebaseapp.com",

    projectId:
    "primerulstudio",

    storageBucket:
    "primerulstudio.firebasestorage.app",

    messagingSenderId:
    "1090104483635",

    appId:
    "1:1090104483635:web:368bf1e25a505520e9a846",
    
    measurementId: "G-MNG786V8LC"

};

/* =========================================
   INITIALIZE FIREBASE
========================================= */

const app =
    initializeApp(
        firebaseConfig
    );

/* =========================================
   FIRESTORE DATABASE
========================================= */

const db =
    getFirestore(app);

/* =========================================
   EXPORT DATABASE
========================================= */

export { db };