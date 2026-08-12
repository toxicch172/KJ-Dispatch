document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("registrationForm");

    const submitButton = document.getElementById("submitButton");

    const errorMessage = document.getElementById("errorMessage");

    const successMessage = document.getElementById("successMessage");


    form.addEventListener("submit", function (event) {

        errorMessage.style.display = "none";
        errorMessage.textContent = "";


        /* =========================
           GET VALUES
        ========================= */

        const fullName =
            document.getElementById("fullName").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const mcNumber =
            document.getElementById("mcNumber").value.trim();

        const equipmentType =
            document.getElementById("equipmentType").value.trim();

        const equipmentQuantity =
            document.getElementById("equipmentQuantity").value.trim();


        /* =========================
           REQUIRED TEXT VALIDATION
        ========================= */

        if (
            fullName === "" ||
            phone === "" ||
            email === "" ||
            mcNumber === "" ||
            equipmentType === "" ||
            equipmentQuantity === ""
        ) {

            event.preventDefault();

            showError("Please fill in all required fields.");

            return;
        }


        /* =========================
           EMAIL VALIDATION
        ========================= */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            event.preventDefault();

            showError("Please enter a valid email address.");

            return;
        }


        /* =========================
           PHONE VALIDATION
        ========================= */

        const phonePattern =
            /^[0-9+\-\s()]{7,20}$/;

        if (!phonePattern.test(phone)) {

            event.preventDefault();

            showError("Please enter a valid phone number.");

            return;
        }


        /* =========================
           QUANTITY VALIDATION
        ========================= */

        if (Number(equipmentQuantity) < 1) {

            event.preventDefault();

            showError("Equipment quantity must be at least 1.");

            return;
        }


        /* =========================
           FILES
        ========================= */

        const w9 =
            document.getElementById("w9").files[0];

        const insurance =
            document.getElementById("insurance").files[0];

        const mcAuthority =
            document.getElementById("mcAuthority").files[0];

        const noa =
            document.getElementById("noa").files[0];


        const files = [
            w9,
            insurance,
            mcAuthority,
            noa
        ];


        /* =========================
           FILE REQUIRED
        ========================= */

        for (let i = 0; i < files.length; i++) {

            if (!files[i]) {

                event.preventDefault();

                showError(
                    "Please upload all required documents."
                );

                return;
            }
        }


        /* =========================
           FILE TYPE
        ========================= */

        const allowedTypes = [
            "application/pdf",
            "image/jpeg",
            "image/png"
        ];


        for (let i = 0; i < files.length; i++) {

            if (!allowedTypes.includes(files[i].type)) {

                event.preventDefault();

                showError(
                    "Documents must be PDF, JPG, JPEG, or PNG files."
                );

                return;
            }
        }


        /* =========================
           FILE SIZE
           Maximum 10MB each
        ========================= */

        const maxSize = 10 * 1024 * 1024;


        for (let i = 0; i < files.length; i++) {

            if (files[i].size > maxSize) {

                event.preventDefault();

                showError(
                    "Each document must be smaller than 10MB."
                );

                return;
            }
        }


        /* =========================
           SUBMITTING
        ========================= */

        submitButton.disabled = true;

        submitButton.textContent = "Submitting...";

    });


    /* =========================
       ERROR FUNCTION
    ========================= */

    function showError(message) {

        errorMessage.textContent = message;

        errorMessage.style.display = "block";

        errorMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

});