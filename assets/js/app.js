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

if(orderForm){

    orderForm.addEventListener(

        "submit",

        async (e) => {

            e.preventDefault();

            /* HONEYPOT */

            const website =
                document.getElementById(
                    "website"
                ).value;

            if(website !== ""){

                return;

            }

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