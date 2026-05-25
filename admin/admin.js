/* =========================================
   FIREBASE
========================================= */

import { db }

from "../assets/js/firebase.js";

import {

    collection,
    query,
    orderBy,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* =========================================
   ELEMENTS
========================================= */

const ordersGrid =
    document.getElementById(
        "ordersGrid"
    );

const totalOrders =
    document.getElementById(
        "totalOrders"
    );

const pendingOrders =
    document.getElementById(
        "pendingOrders"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );

const filterSelect =
    document.getElementById(
        "filterSelect"
    );

/* =========================================
   FIRESTORE QUERY
========================================= */

const ordersQuery = query(

    collection(
        db,
        "orders"
    ),

    orderBy(
        "createdAt",
        "desc"
    )

);

/* =========================================
   GLOBAL DATA
========================================= */

let allOrders = [];

/* =========================================
   REALTIME LISTENER
========================================= */

onSnapshot(

    ordersQuery,

    (snapshot) => {

        allOrders = [];

        snapshot.forEach((item) => {

            allOrders.push({

                id:
                item.id,

                ...item.data()

            });

        });

        renderOrders();

    },

    (error) => {

        console.error(
            "Firestore Error:",
            error
        );

    }

);

/* =========================================
   RENDER ORDERS
========================================= */

function renderOrders(){

    if(!ordersGrid) return;

    ordersGrid.innerHTML = "";

    let total = 0;
    let pending = 0;

    /* SEARCH VALUE */

    const search =

        searchInput
        ? searchInput.value
            .toLowerCase()
            .trim()
        : "";

    /* FILTER VALUE */

    const filter =

        filterSelect
        ? filterSelect.value
        : "All";

    /* FILTERED DATA */

    const filteredOrders =

        allOrders.filter(order => {

            const name =

                (order.name || "")
                .toLowerCase();

            const band =

                (order.band || "")
                .toLowerCase();

            const details =

                (order.details || "")
                .toLowerCase();

            /* SEARCH MATCH */

            const searchMatch =

                name.includes(search) ||
                band.includes(search) ||
                details.includes(search);

            /* FILTER MATCH */

            let filterMatch = true;

            if(filter === "Pending"){

                filterMatch =
                    order.status ===
                    "Pending";

            }

            if(filter === "Completed"){

                filterMatch =
                    order.status ===
                    "Completed";

            }

            return (
                searchMatch &&
                filterMatch
            );

        });

    /* EMPTY STATE */

    if(filteredOrders.length === 0){

        ordersGrid.innerHTML =

        `
        <div class="empty-orders">

            <h2>
                No Orders Found
            </h2>

            <p>
                Try another keyword or filter.
            </p>

        </div>
        `;

        if(totalOrders){

            totalOrders.textContent =
                "0";

        }

        if(pendingOrders){

            pendingOrders.textContent =
                "0";

        }

        return;

    }

    /* LOOP */

    filteredOrders.forEach((data) => {

        total++;

        if(
            data.status ===
            "Pending"
        ){

            pending++;

        }

        /* DATE */

        let createdDate = "-";

        if(data.createdAt){

            createdDate =

                data.createdAt
                .toDate()
                .toLocaleString(
                    "id-ID"
                );

        }

        /* STATUS CLASS */

        const statusClass =

            data.status ===
            "Completed"

            ? "completed"
            : "";

        /* CARD */

        const card =
            document.createElement(
                "div"
            );

        card.classList.add(
            "order-card"
        );

        /* HTML */

        card.innerHTML =

        `
        <div class="order-top">

            <div class="order-name">

                ${data.name || "-"}

            </div>

            <div class="order-status ${statusClass}">

                ${data.status || "Pending"}

            </div>

        </div>

        <div class="order-info">

            <strong>Band:</strong>
            ${data.band || "-"}

        </div>

        <div class="order-info">

            <strong>Package:</strong>
            ${data.package || "-"}

        </div>

        <div class="order-info">

            <strong>Date:</strong>
            ${createdDate}

        </div>

        <div class="order-details">

            ${data.details || "-"}

        </div>

        <div class="admin-actions">

            <!-- COMPLETE -->

            <button
                class="complete-btn"
                data-id="${data.id}"
            >

                Complete

            </button>

            <!-- DELETE -->

            <button
                class="delete-btn"
                data-id="${data.id}"
            >

                Delete

            </button>

        </div>
        `;

        /* APPEND */

        ordersGrid.appendChild(
            card
        );

    });

    /* UPDATE COUNTER */

    if(totalOrders){

        totalOrders.textContent =
            total;

    }

    if(pendingOrders){

        pendingOrders.textContent =
            pending;

    }

    /* BUTTON EVENTS */

    initializeButtons();

}

/* =========================================
   BUTTON EVENTS
========================================= */

function initializeButtons(){

    /* COMPLETE BUTTON */

    const completeButtons =

        document.querySelectorAll(
            ".complete-btn"
        );

    completeButtons.forEach(btn => {

        btn.addEventListener(

            "click",

            async () => {

                const id =
                    btn.dataset.id;

                try{

                    await updateDoc(

                        doc(
                            db,
                            "orders",
                            id
                        ),

                        {

                            status:
                            "Completed"

                        }

                    );

                    alert(
                        "Order completed."
                    );

                }

                catch(error){

                    console.error(error);

                    alert(
                        "Failed update order."
                    );

                }

            }

        );

    });

    /* DELETE BUTTON */

    const deleteButtons =

        document.querySelectorAll(
            ".delete-btn"
        );

    deleteButtons.forEach(btn => {

        btn.addEventListener(

            "click",

            async () => {

                const id =
                    btn.dataset.id;

                const confirmDelete =

                    confirm(
                        "Delete this order?"
                    );

                if(!confirmDelete){

                    return;

                }

                try{

                    await deleteDoc(

                        doc(
                            db,
                            "orders",
                            id
                        )

                    );

                    alert(
                        "Order deleted."
                    );

                }

                catch(error){

                    console.error(error);

                    alert(
                        "Delete failed."
                    );

                }

            }

        );

    });

}

/* =========================================
   SEARCH EVENT
========================================= */

if(searchInput){

    searchInput.addEventListener(

        "input",

        () => {

            renderOrders();

        }

    );

}

/* =========================================
   FILTER EVENT
========================================= */

if(filterSelect){

    filterSelect.addEventListener(

        "change",

        () => {

            renderOrders();

        }

    );

}

/* =========================================
   ACTIVE LOG
========================================= */

console.log(

    "%cRUL ADMIN ACTIVE",

    `
    color:#8b5cf6;
    font-size:18px;
    font-weight:bold;
    `

);