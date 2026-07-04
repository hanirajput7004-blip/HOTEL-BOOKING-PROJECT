const API_URL = "https://demohotelsapi.pythonanywhere.com/hotels/";

const container = document.getElementById("hotelDetails");

const params = new URLSearchParams(window.location.search);
const hotelId = Number(params.get("id"));

async function loadHotelDetails() {

    try {

        const response = await fetch(API_URL);
        const result = await response.json();

        const hotel = result.data.find(item => item.id === hotelId);

        if (!hotel) {
            container.innerHTML = "<h2>Hotel not found.</h2>";
            return;
        }

        container.innerHTML = `
        
        <div class="details-card">

            <img src="${hotel.thumbnail}" class="details-image">

            <div class="details-content">

                <h1>${hotel.name}</h1>

                <p>⭐ ${hotel.rating}</p>

                <p>📍 ${hotel.location}</p>

                <h2>₹${hotel.price}/night</h2>

                <p>${hotel.description}</p>

                <h3>Gallery</h3>

                <div class="gallery">

                    ${hotel.photos.map(photo => `
                        <img src="${photo}" class="gallery-image">
                    `).join("")}

                </div>

                <a href="booking.html" class="btn">
                    Book Now
                </a>

            </div>

        </div>

        `;

    } catch (error) {

        container.innerHTML = "<h2>Failed to load hotel details.</h2>";
        console.error(error);

    }

}

loadHotelDetails();