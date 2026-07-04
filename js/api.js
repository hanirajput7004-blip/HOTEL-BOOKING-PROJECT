const API_URL = "https://demohotelsapi.pythonanywhere.com/hotels/";

const hotelContainer = document.getElementById("hotelContainer");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

let allHotels = [];

sortSelect.addEventListener("change", function () {

    let sortedHotels = [...allHotels];

    if(this.value === "low"){

        sortedHotels.sort((a,b)=>parseFloat(a.price)-parseFloat(b.price));

    }

    else if(this.value==="high"){

        sortedHotels.sort((a,b)=>parseFloat(b.price)-parseFloat(a.price));

    }

    else if(this.value==="rating"){

        sortedHotels.sort((a,b)=>b.rating-a.rating);

    }

    displayHotels(sortedHotels);

});

// Fetch Hotels
async function loadHotels() {

    hotelContainer.innerHTML = "<h2>Loading Hotels...</h2>";

    try {

        const response = await fetch(API_URL);
        const result = await response.json();

        console.log(result);

        allHotels = result.data;
        displayHotels(allHotels);

    } catch (error) {

        hotelContainer.innerHTML = "<h2>Failed to load hotels.</h2>";
        console.error(error);

    }

}

// Display Hotels
function displayHotels(hotels) {

    hotelContainer.innerHTML = "";

    if (hotels.length === 0) {

        hotelContainer.innerHTML = "<h2>No Hotels Found</h2>";
        return;
    }

    hotels.forEach(hotel => {

        hotelContainer.innerHTML += `

        <div class="hotel-card">

            <img
                src="${hotel.thumbnail}"
                alt="${hotel.name}"
                class="hotel-image"
                onerror="this.src='https://via.placeholder.com/400x250?text=No+Image'"
            >

            <div class="hotel-info">

                <h3>${hotel.name || "Hotel"}</h3>

                <p class="location">
                    📍 ${hotel.location || "Location not available"}
                </p>

                <p class="rating">
                    ⭐ ${hotel.rating || "N/A"}
                </p>

                <p class="price">
                    ₹${hotel.price || "N/A"}
                    <span>/night</span>
                </p>

               <a href="hotel-details.html?id=${hotel.id}" class="btn details-btn">
    View Details
</a>

            </div>

        </div>

        `;

    });

}

// Search Hotels
searchInput.addEventListener("input", function () {

    const keyword = this.value.toLowerCase().trim();

    const filteredHotels = allHotels.filter(hotel => {

        const name = (hotel.name || "").toLowerCase();
        const location = (hotel.location || "").toLowerCase();

        return (
            name.includes(keyword) ||
            location.includes(keyword)
        );

    });

    displayHotels(filteredHotels);

});

// Load Hotels
loadHotels();