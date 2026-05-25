/* =========================================
   FIREBASE
========================================= */

import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* =========================================
   RUL BAND STUDIO APP
========================================= */

"use strict";

/* =========================================
   GLOBAL ERROR HANDLER
========================================= */

window.addEventListener("error", (e) => {

    console.error(
        "GLOBAL ERROR:",
        e.error
    );

});

/* =========================================
   SANITIZE INPUT
========================================= */

function sanitize(text){

    return text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/script/gi, "")
    .trim();

}

/* =========================================
   LOADER
========================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        document.body.classList.add(
            "loaded"
        );

    }, 1500);

});

/* =========================================
   CUSTOM CURSOR
========================================= */

const cursorDot =
    document.querySelector(
        ".cursor-dot"
    );

const cursorOutline =
    document.querySelector(
        ".cursor-outline"
    );

window.addEventListener("mousemove", (e) => {

    if(!cursorDot || !cursorOutline) return;

    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left =
        `${posX}px`;

    cursorDot.style.top =
        `${posY}px`;

    cursorOutline.animate({

        left:`${posX}px`,
        top:`${posY}px`

    },{

        duration:300,
        fill:"forwards"

    });

});

/* =========================================
   CURSOR HOVER
========================================= */

const hoverElements =
    document.querySelectorAll(
        "a, button, .portfolio-card"
    );

hoverElements.forEach(el => {

    el.addEventListener(
        "mouseenter",
        () => {

            if(cursorOutline){

                cursorOutline.classList.add(
                    "cursor-hover"
                );

            }

        }
    );

    el.addEventListener(
        "mouseleave",
        () => {

            if(cursorOutline){

                cursorOutline.classList.remove(
                    "cursor-hover"
                );

            }

        }
    );

});

/* =========================================
   MOBILE MENU
========================================= */

const menuToggle =
    document.querySelector(
        ".menu-toggle"
    );

const mobileMenu =
    document.querySelector(
        ".mobile-menu"
    );

if(menuToggle && mobileMenu){

    menuToggle.addEventListener(
        "click",
        () => {

            menuToggle.classList.toggle(
                "active"
            );

            mobileMenu.classList.toggle(
                "active"
            );

        }
    );

}

/* =========================================
   CLOSE MOBILE MENU
========================================= */

const mobileLinks =
    document.querySelectorAll(
        ".mobile-menu a"
    );

mobileLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            mobileMenu.classList.remove(
                "active"
            );

            menuToggle.classList.remove(
                "active"
            );

        }
    );

});

/* =========================================
   HEADER BLUR
========================================= */

const header =
    document.querySelector(
        ".header"
    );

window.addEventListener("scroll", () => {

    if(!header) return;

    if(window.scrollY > 50){

        header.style.background =
            "rgba(5,8,22,0.9)";

        header.style.backdropFilter =
            "blur(18px)";

    }

    else{

        header.style.background =
            "rgba(5,8,22,0.65)";

    }

});

/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".portfolio-card, .price-card"
    );

function revealOnScroll(){

    const triggerBottom =
        window.innerHeight * 0.88;

    revealElements.forEach(el => {

        const top =
            el.getBoundingClientRect().top;

        if(top < triggerBottom){

            el.classList.add(
                "show"
            );

        }

    });

}

window.addEventListener(
    "scroll",
    revealOnScroll
);

revealOnScroll();

/* =========================================
   MAGNETIC BUTTON
========================================= */

const buttons =
    document.querySelectorAll(
        ".primary-btn, .secondary-btn, .contact-btn"
    );

buttons.forEach(button => {

    button.addEventListener(
        "mousemove",
        (e) => {

            const rect =
                button.getBoundingClientRect();

            const x =
                e.clientX -
                rect.left -
                rect.width / 2;

            const y =
                e.clientY -
                rect.top -
                rect.height / 2;

            button.style.transform =
                `translate(${x * 0.15}px, ${y * 0.15}px)`;

        }
    );

    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform =
                "translate(0px,0px)";

        }
    );

});

/* =========================================
   HERO PARALLAX
========================================= */

const hero =
    document.querySelector(
        ".hero"
    );

window.addEventListener("scroll", () => {

    if(!hero) return;

    const scrollY =
        window.scrollY;

    hero.style.transform =
        `translateY(${scrollY * 0.05}px)`;

});

/* =========================================
   ACTIVE NAV LINK
========================================= */

const sections =
    document.querySelectorAll(
        "section"
    );

const navLinks =
    document.querySelectorAll(
        ".navbar a"
    );

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if(
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ){

            current =
                section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove(
            "active"
        );

        if(
            link.getAttribute("href") ===
            `#${current}`
        ){

            link.classList.add(
                "active"
            );

        }

    });

});

/* =========================================
   PORTFOLIO MODAL
========================================= */

const portfolioCards =
    document.querySelectorAll(
        ".portfolio-card"
    );

const portfolioModal =
    document.querySelector(
        ".portfolio-modal"
    );

const modalImage =
    document.querySelector(
        ".modal-image"
    );

const modalClose =
    document.querySelector(
        ".modal-close"
    );

portfolioCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            if(
                !portfolioModal ||
                !modalImage
            ) return;

            const image =
                card.querySelector("img");

            modalImage.src =
                image.src;

            portfolioModal.classList.add(
                "active"
            );

            document.body.style.overflow =
                "hidden";

        }
    );

});

/* CLOSE BUTTON */

if(modalClose){

    modalClose.addEventListener(
        "click",
        () => {

            portfolioModal.classList.remove(
                "active"
            );

            document.body.style.overflow =
                "auto";

        }
    );

}

/* CLOSE OUTSIDE */

if(portfolioModal){

    portfolioModal.addEventListener(
        "click",
        (e) => {

            if(
                e.target === portfolioModal
            ){

                portfolioModal.classList.remove(
                    "active"
                );

                document.body.style.overflow =
                    "auto";

            }

        }
    );

}

/* ESC CLOSE */

document.addEventListener(
    "keydown",
    (e) => {

        if(
            e.key === "Escape" &&
            portfolioModal.classList.contains(
                "active"
            )
        ){

            portfolioModal.classList.remove(
                "active"
            );

            document.body.style.overflow =
                "auto";

        }

    }
);

/* =========================================
   IMAGE PREVIEW
========================================= */

const referenceImage =
    document.getElementById(
        "referenceImage"
    );

const imagePreview =
    document.getElementById(
        "imagePreview"
    );

if(referenceImage){

    referenceImage.addEventListener(

        "change",

        (e) => {

            const file =
                e.target.files[0];

            if(!file) return;

            const reader =
                new FileReader();

            reader.onload = () => {

                imagePreview.innerHTML =

                `
                <img
                    src="${reader.result}"
                    alt="Preview"
                >
                `;

            };

            reader.readAsDataURL(file);

        }

    );

}

/* =========================================
   ORDER FORM
========================================= */

const orderForm =
    document.getElementById(
        "orderForm"
    );

            /* FORM DATA */

            const name =
                document.getElementById(
                    "name"
                ).value.trim();

            const band =
                document.getElementById(
                    "band"
                ).value.trim();

            const packageType =
                document.getElementById(
                    "package"
                ).value;

            const details =
                document.getElementById(
                    "details"
                ).value.trim();

            /* VALIDATION */

            if(
                name.length < 2 ||
                band.length < 2 ||
                details.length < 10
            ){

                alert(
                    "Please fill form correctly."
                );

                return;

            }

            /* WHATSAPP MESSAGE */

            const phone =
                "6289512824137";

            const message =

`🔥 *NEW BAND LOGO ORDER* 🔥

👤 Name:
${sanitize(name)}

🎸 Band:
${sanitize(band)}

📦 Package:
${sanitize(packageType)}

📝 Details:
${sanitize(details)}
`;

            const url =

`https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

            try{

                /* SAVE FIREBASE */

                await addDoc(

                    collection(
                        db,
                        "orders"
                    ),

                    {

                        name:
                        sanitize(name),

                        band:
                        sanitize(band),

                        package:
                        sanitize(packageType),

                        details:
                        sanitize(details),

                        status:
                        "Pending",

                        createdAt:
                        serverTimestamp()

                    }

                );

                /* OPEN WHATSAPP */

                window.open(
                    url,
                    "_blank"
                );

                /* RESET */

                orderForm.reset();

                imagePreview.innerHTML = "";

                alert(
                    "Order berhasil dikirim."
                );

            }

            catch(error){

                console.error(error);

                alert(
                    "Terjadi kesalahan."
                );

            }

        }

    );

}

/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log(
    "%cRulBandStudio Active",
    `
    color:#8b5cf6;
    font-size:20px;
    font-weight:bold;
    `
);

/* =========================================
   PREMIUM PORTFOLIO FILTER
========================================= */

const filterButtons =
    document.querySelectorAll(
        ".filter-btn"
    );

const portfolioItems =
    document.querySelectorAll(
        ".portfolio-card"
    );

/* =========================================
   FILTER FUNCTION
========================================= */

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            /* REMOVE ACTIVE */

            filterButtons.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });

            /* ADD ACTIVE */

            button.classList.add(
                "active"
            );

            /* GET FILTER */

            const filterValue =
                button.getAttribute(
                    "data-filter"
                );

            /* LOOP ITEMS */

            portfolioItems.forEach(item => {

                const category =
                    item.getAttribute(
                        "data-category"
                    );

                /* SHOW ALL */

                if(
                    filterValue === "all"
                ){

                    item.classList.remove(
                        "hide"
                    );

                    item.classList.add(
                        "show"
                    );

                    item.style.display =
                        "block";

                }

                /* FILTER CATEGORY */

                else if(
                    category === filterValue
                ){

                    item.classList.remove(
                        "hide"
                    );

                    item.classList.add(
                        "show"
                    );

                    item.style.display =
                        "block";

                }

                /* HIDE ITEM */

                else{

                    item.classList.remove(
                        "show"
                    );

                    item.classList.add(
                        "hide"
                    );

                    setTimeout(() => {

                        item.style.display =
                            "none";

                    }, 300);

                }

            });

        }
    );

});

/* =========================================
   INITIAL SHOW
========================================= */

portfolioItems.forEach(item => {

    item.classList.add(
        "show"
    );

});

/* =========================================
   FULL CINEMATIC REVEAL SYSTEM
========================================= */

const revealElementsAll =
document.querySelectorAll(

    ".reveal, \
    .reveal-left, \
    .reveal-right, \
    .reveal-zoom"

);

/* =========================================
   REVEAL FUNCTION
========================================= */

function cinematicReveal(){

    const triggerBottom =
    window.innerHeight * 0.88;

    revealElementsAll.forEach(element => {

        const elementTop =
        element.getBoundingClientRect().top;

        if(elementTop < triggerBottom){

            element.classList.add(
                "active"
            );

        }

    });

}

/* =========================================
   INIT
========================================= */

window.addEventListener(
    "scroll",
    cinematicReveal
);

window.addEventListener(
    "load",
    cinematicReveal
);

/* =========================================
   PREMIUM PARALLAX
========================================= */

const parallaxSections =
document.querySelectorAll(
    ".parallax-section"
);

window.addEventListener(
    "scroll",
    () => {

        const scrollTop =
        window.pageYOffset;

        parallaxSections.forEach(section => {

            const speed =
            section.dataset.speed || 0.08;

            section.style.transform =
            `translateY(${scrollTop * speed}px)`;

        });

    }
);

/* =========================================
   SMOOTH BUTTON RIPPLE
========================================= */

const rippleButtons =
document.querySelectorAll(
    ".primary-btn, .secondary-btn"
);

rippleButtons.forEach(button => {

    button.addEventListener(
        "click",
        function(e){

            const ripple =
            document.createElement("span");

            ripple.classList.add(
                "ripple-effect"
            );

            const rect =
            button.getBoundingClientRect();

            ripple.style.left =
            `${e.clientX - rect.left}px`;

            ripple.style.top =
            `${e.clientY - rect.top}px`;

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 800);

        }
    );

});

/* =========================================
   RIPPLE STYLE
========================================= */

const rippleStyle =
document.createElement("style");

rippleStyle.innerHTML =

`
.ripple-effect{

    position:absolute;

    width:20px;
    height:20px;

    background:
    rgba(255,255,255,0.35);

    border-radius:50%;

    transform:
    translate(-50%,-50%)
    scale(0);

    animation:
    rippleAnimation 0.8s linear;

    pointer-events:none;

}

@keyframes rippleAnimation{

    to{

        transform:
        translate(-50%,-50%)
        scale(15);

        opacity:0;

    }

}
`;

document.head.appendChild(
    rippleStyle
);

/* =========================================
   FULL FIREBASE SECURITY HARDENING
========================================= */

"use strict";

/* =========================================
   IMPORT FIREBASE
========================================= */

import {

    db

} from "./firebase.js";

import {

    collection,
    addDoc,
    serverTimestamp

} from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* =========================================
   FORM
========================================= */

const orderForm =
document.getElementById(
    "orderForm"
);

/* =========================================
   SECURITY CONFIG
========================================= */

const SECURITY_CONFIG = {

    MAX_MESSAGE_LENGTH: 1200,

    MIN_MESSAGE_LENGTH: 10,

    MAX_NAME_LENGTH: 40,

    MAX_BAND_LENGTH: 50,

    REQUEST_COOLDOWN: 30000,

    BLOCKED_WORDS: [

        "<script",
        "</script>",
        "javascript:",
        "onerror=",
        "onload=",
        "iframe",
        "fetch(",
        "eval(",
        "document.cookie"

    ]

};

/* =========================================
   RATE LIMIT
========================================= */

let lastSubmitTime = 0;

/* =========================================
   SANITIZE INPUT
========================================= */

function sanitizeInput(input){

    return input

    .replace(/[<>]/g,"")

    .replace(/javascript:/gi,"")

    .replace(/onerror=/gi,"")

    .replace(/onload=/gi,"")

    .trim();

}

/* =========================================
   CHECK BLOCKED WORDS
========================================= */

function containsBlockedContent(text){

    return SECURITY_CONFIG.BLOCKED_WORDS.some(

        word =>

        text.toLowerCase().includes(
            word.toLowerCase()
        )

    );

}

/* =========================================
   VALIDATE NAME
========================================= */

function validateName(name){

    if(
        name.length <
        2
    ){

        return false;

    }

    if(
        name.length >
        SECURITY_CONFIG
        .MAX_NAME_LENGTH
    ){

        return false;

    }

    return true;

}

/* =========================================
   VALIDATE BAND
========================================= */

function validateBand(band){

    if(
        band.length <
        2
    ){

        return false;

    }

    if(
        band.length >
        SECURITY_CONFIG
        .MAX_BAND_LENGTH
    ){

        return false;

    }

    return true;

}

/* =========================================
   VALIDATE MESSAGE
========================================= */

function validateMessage(message){

    if(
        message.length <
        SECURITY_CONFIG
        .MIN_MESSAGE_LENGTH
    ){

        return false;

    }

    if(
        message.length >
        SECURITY_CONFIG
        .MAX_MESSAGE_LENGTH
    ){

        return false;

    }

    return true;

}

/* =========================================
   RATE LIMIT CHECK
========================================= */

function checkRateLimit(){

    const currentTime =
    Date.now();

    if(

        currentTime -
        lastSubmitTime

        <

        SECURITY_CONFIG
        .REQUEST_COOLDOWN

    ){

        return false;

    }

    lastSubmitTime =
    currentTime;

    return true;

}

/* =========================================
   DETECT BOT
========================================= */

function detectBot(){

    const honeypot =
    document.getElementById(
        "website"
    );

    if(
        honeypot &&
        honeypot.value !== ""
    ){

        return true;

    }

    return false;

}

/* =========================================
   SHOW ALERT
========================================= */

function showAlert(message){

    alert(message);

}

/* =========================================
   SUBMIT FORM
========================================= */

if(orderForm){

    orderForm.addEventListener(

        "submit",

        async (e) => {

            e.preventDefault();

            /* =========================
               BOT CHECK
            ========================= */

            if(
                detectBot()
            ){

                showAlert(
                    "Bot detected."
                );

                return;

            }

            /* =========================
               RATE LIMIT
            ========================= */

            if(
                !checkRateLimit()
            ){

                showAlert(

                    "Please wait before sending another order."

                );

                return;

            }

            /* =========================
               GET INPUT
            ========================= */

            const name =
            sanitizeInput(

                document
                .getElementById("name")
                .value

            );

            const band =
            sanitizeInput(

                document
                .getElementById("band")
                .value

            );

            const packageType =
            sanitizeInput(

                document
                .getElementById("package")
                .value

            );

            const details =
            sanitizeInput(

                document
                .getElementById("details")
                .value

            );

            /* =========================
               VALIDATION
            ========================= */

            if(
                !validateName(name)
            ){

                showAlert(
                    "Invalid name."
                );

                return;

            }

            if(
                !validateBand(band)
            ){

                showAlert(
                    "Invalid band name."
                );

                return;

            }

            if(
                !validateMessage(details)
            ){

                showAlert(
                    "Invalid project details."
                );

                return;

            }

            /* =========================
               BLOCKED CONTENT
            ========================= */

            if(

                containsBlockedContent(
                    details
                )

            ){

                showAlert(
                    "Blocked content detected."
                );

                return;

            }

            /* =========================
               DISABLE BUTTON
            ========================= */

            const submitButton =
            document.querySelector(
                ".contact-submit-btn"
            );

            const originalButtonText =
            submitButton.innerHTML;

            submitButton.disabled =
            true;

            submitButton.innerHTML =
            "Sending Secure Order...";

            try{

                /* =====================
                   SAVE TO FIREBASE
                ===================== */

                await addDoc(

                    collection(
                        db,
                        "orders"
                    ),

                    {

                        name,

                        band,

                        packageType,

                        details,

                        createdAt:
                        serverTimestamp(),

                        userAgent:
                        navigator.userAgent,

                        language:
                        navigator.language,

                        screenWidth:
                        window.innerWidth,

                        status:
                        "pending"

                    }

                );

                /* =====================
                   SUCCESS
                ===================== */

                showAlert(

                    "Premium order sent successfully."

                );

                orderForm.reset();

            }

            catch(error){

                console.error(error);

                showAlert(

                    "Failed to send order."

                );

            }

            finally{

                submitButton.disabled =
                false;

                submitButton.innerHTML =
                originalButtonText;

            }

        }

    );

}

/* =========================================
   DISABLE RIGHT CLICK
========================================= */

document.addEventListener(

    "contextmenu",

    (e) => {

        e.preventDefault();

    }

);

/* =========================================
   DISABLE DEVTOOLS SHORTCUT
========================================= */

document.addEventListener(

    "keydown",

    (e) => {

        if(

            e.key === "F12"

            ||

            (
                e.ctrlKey &&
                e.shiftKey &&
                e.key === "I"
            )

            ||

            (
                e.ctrlKey &&
                e.shiftKey &&
                e.key === "J"
            )

            ||

            (
                e.ctrlKey &&
                e.key === "U"
            )

        ){

            e.preventDefault();

        }

    }

);

/* =========================================
   CONSOLE WARNING
========================================= */

console.clear();

console.log(

    "%cSTOP!",

    `
    color:red;
    font-size:60px;
    font-weight:bold;
    `
);

console.log(

    "%cUnauthorized access is prohibited.",

    `
    color:white;
    font-size:16px;
    `
);