const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMessage");

bookingForm.addEventListener("submit", function (e) {

    e.preventDefault();

    bookingMessage.innerHTML = `
        ✅ Booking Successful!<br>
        Thank you for choosing Rajput Palace.
    `;

    bookingMessage.style.color = "green";
    bookingMessage.style.fontWeight = "bold";

    bookingForm.reset();

});