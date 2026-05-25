/* =========================================
   FIREBASE AUTH
========================================= */

import { initializeApp }

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* =========================================
   FIREBASE CONFIG
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

const auth =
    getAuth(app);

/* =========================================
   ELEMENTS
========================================= */

const loginForm =
    document.getElementById(
        "loginForm"
    );

const errorMessage =
    document.getElementById(
        "errorMessage"
    );

/* =========================================
   CHECK SESSION
========================================= */

onAuthStateChanged(

    auth,

    (user) => {

        if(user){

            window.location.href =
                "index.html";

        }

    }

);

/* =========================================
   LOGIN FORM
========================================= */

if(loginForm){

    loginForm.addEventListener(

        "submit",

        async (e) => {

            e.preventDefault();

            /* INPUT */

            const email =
                document.getElementById(
                    "email"
                ).value.trim();

            const password =
                document.getElementById(
                    "password"
                ).value.trim();

            /* RESET ERROR */

            errorMessage.textContent =
                "";

            /* VALIDATION */

            if(
                email.length < 5 ||
                password.length < 6
            ){

                errorMessage.textContent =
                    "Invalid email or password.";

                return;

            }

            try{

                /* LOGIN */

                await signInWithEmailAndPassword(

                    auth,
                    email,
                    password

                );

                /* SUCCESS */

                window.location.href =
                    "index.html";

            }

            catch(error){

                console.error(error);

                /* FIREBASE ERRORS */

                switch(error.code){

                    case "auth/invalid-email":

                        errorMessage.textContent =
                            "Email tidak valid.";

                    break;

                    case "auth/user-not-found":

                        errorMessage.textContent =
                            "Admin tidak ditemukan.";

                    break;

                    case "auth/wrong-password":

                        errorMessage.textContent =
                            "Password salah.";

                    break;

                    default:

                        errorMessage.textContent =
                            "Login gagal.";

                }

            }

        }

    );

}

/* =========================================
   ACTIVE LOG
========================================= */

console.log(

    "%cADMIN LOGIN ACTIVE",

    `
    color:#8b5cf6;
    font-size:18px;
    font-weight:bold;
    `

);