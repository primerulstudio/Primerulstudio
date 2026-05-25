/* =========================================
   FIREBASE AUTH
========================================= */

import { initializeApp }

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

    getAuth,
    onAuthStateChanged,
    signOut

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

const topbar =
    document.querySelector(
        ".admin-topbar"
    );

/* =========================================
   AUTH PROTECTION
========================================= */

onAuthStateChanged(

    auth,

    (user) => {

        /* NOT LOGIN */

        if(!user){

            window.location.href =
                "login.html";

            return;

        }

        /* LOGIN SUCCESS */

        console.log(

            "%cADMIN VERIFIED",

            `
            color:#22c55e;
            font-size:18px;
            font-weight:bold;
            `

        );

        createLogoutButton();

    }

);

/* =========================================
   CREATE LOGOUT BUTTON
========================================= */

function createLogoutButton(){

    /* PREVENT DUPLICATE */

    if(
        document.querySelector(
            ".logout-btn"
        )
    ){

        return;

    }

    /* BUTTON */

    const logoutButton =
        document.createElement(
            "button"
        );

    logoutButton.innerText =
        "Logout";

    logoutButton.classList.add(
        "logout-btn"
    );

    /* APPEND */

    if(topbar){

        topbar.appendChild(
            logoutButton
        );

    }

    /* STYLE */

    logoutButton.style.padding =
        "14px 22px";

    logoutButton.style.border =
        "none";

    logoutButton.style.borderRadius =
        "16px";

    logoutButton.style.background =
        "#8b5cf6";

    logoutButton.style.color =
        "#ffffff";

    logoutButton.style.fontWeight =
        "700";

    logoutButton.style.cursor =
        "pointer";

    logoutButton.style.transition =
        "0.3s ease";

    logoutButton.style.boxShadow =
        "0 12px 30px rgba(139,92,246,0.35)";

    /* HOVER */

    logoutButton.addEventListener(

        "mouseenter",

        () => {

            logoutButton.style.transform =
                "translateY(-3px)";

        }

    );

    logoutButton.addEventListener(

        "mouseleave",

        () => {

            logoutButton.style.transform =
                "translateY(0px)";

        }

    );

    /* LOGOUT */

    logoutButton.addEventListener(

        "click",

        async () => {

            const confirmLogout =

                confirm(
                    "Logout admin?"
                );

            if(!confirmLogout){

                return;

            }

            try{

                await signOut(auth);

                alert(
                    "Logout berhasil."
                );

                window.location.href =
                    "login.html";

            }

            catch(error){

                console.error(error);

                alert(
                    "Logout gagal."
                );

            }

        }

    );

}

/* =========================================
   BLOCK DEVTOOLS BASIC
========================================= */

document.addEventListener(

    "contextmenu",

    (e) => {

        e.preventDefault();

    }

);

document.addEventListener(

    "keydown",

    (e) => {

        /* F12 */

        if(e.key === "F12"){

            e.preventDefault();

        }

        /* CTRL+SHIFT+I */

        if(

            e.ctrlKey &&
            e.shiftKey &&
            e.key === "I"

        ){

            e.preventDefault();

        }

        /* CTRL+SHIFT+J */

        if(

            e.ctrlKey &&
            e.shiftKey &&
            e.key === "J"

        ){

            e.preventDefault();

        }

        /* CTRL+U */

        if(

            e.ctrlKey &&
            e.key === "u"

        ){

            e.preventDefault();

        }

    }

);

/* =========================================
   TAB SECURITY
========================================= */

document.addEventListener(

    "visibilitychange",

    () => {

        if(document.hidden){

            console.log(
                "Admin tab hidden"
            );

        }

    }

);

/* =========================================
   SECURITY LOG
========================================= */

console.log(

    "%cADMIN SECURITY ACTIVE",

    `
    color:#8b5cf6;
    font-size:20px;
    font-weight:bold;
    `

);