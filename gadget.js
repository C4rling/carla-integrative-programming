// ===============================
// LOAD DEFAULT GADGETS ON PAGE LOAD
// ===============================
window.onload = function () {
  loadCategory("smartphones", "smartphones");
  loadCategory("laptops", "laptops");
  loadCategory("mobile-accessories", "accessories");
};

// ===============================
// LOAD CATEGORY (DEFAULT DISPLAY)
// ===============================
async function loadCategory(apiCategory, elementId) {
  const container = document.getElementById(elementId);

  try {
    const res = await fetch(`https://dummyjson.com/products/category/${apiCategory}`);
    const data = await res.json();

    container.innerHTML = "";

    data.products.slice(0, 4).forEach(product => {
      const image = product.thumbnail || product.images?.[0] || "";

      container.innerHTML += `
        <div class="card" onclick="showDetails(${product.id}, '${apiCategory}')">
          <img src="${image}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>${product.brand}</p>
          <p>$${product.price}</p>
          <button onclick="saveGadget(event, ${product.id}, '${product.title.replace(/'/g, "\\'")}', '${product.brand}', '${image}', ${product.price})">
            💾 Save
          </button>
        </div>
      `;
    });
  } catch (err) {
    container.innerHTML = "<p>Failed to load</p>";
    console.error(err);
  }
}

// ===============================
// SEARCH BUTTON
// ===============================
const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", () => {
  const query = document.getElementById("searchInput").value.trim();
  searchGadgets(query);
});

// ===============================
// SEARCH FUNCTION (FILTERED BY BRAND / NAME)
// ===============================
async function searchGadgets(query) {
  const resultsDiv = document.getElementById("results");

  if (!query) {
    alert("Please enter a search term");
    return;
  }

  resultsDiv.innerHTML = "Loading...";

  try {
    const categories = ["smartphones", "laptops", "tablets", "mobile-accessories"];
    let allProducts = [];

    for (let cat of categories) {
      const res = await fetch(`https://dummyjson.com/products/category/${cat}`);
      const data = await res.json();
      allProducts = allProducts.concat(data.products);
    }

    // Filter based on product name or brand only
    const filtered = allProducts.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.brand.toLowerCase().includes(query.toLowerCase())
    );

    resultsDiv.innerHTML = "";

    if (!filtered.length) {
      resultsDiv.innerHTML = "<p>No gadgets found</p>";
      return;
    }

    filtered.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.onclick = () => showDetails(product.id);

      const image = product.thumbnail || product.images?.[0] || "";

      card.innerHTML = `
        <img src="${image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.brand}</p>
        <p>$${product.price}</p>
        <button onclick="saveGadget(event, ${product.id}, '${product.title.replace(/'/g, "\\'")}', '${product.brand}', '${image}', ${product.price})">
          💾 Save
        </button>
      `;

      resultsDiv.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    resultsDiv.innerHTML = "<p>Failed to load data</p>";
  }
}

// ===============================
// SAVE TO LOCALSTORAGE
// ===============================
function saveGadget(event, id, title, brand, image, price) {
  event.stopPropagation(); // Prevent card click

  let saved = JSON.parse(localStorage.getItem("gadgets")) || [];

  if (saved.some(item => item.id === id)) {
    alert("This gadget is already saved!");
    return;
  }

  saved.push({ id, title, brand, image, price });
  localStorage.setItem("gadgets", JSON.stringify(saved));

  alert("Gadget saved successfully!");
}

// ===============================
// CAROUSEL / DETAILS MODAL
// ===============================
let currentSlideIndex = 0;
let currentSlides = [];

async function showDetails(id, category = null) {
  const modal = document.getElementById("modal");
  const carousel = document.getElementById("carousel");

  let product;

  try {
    if (category) {
      const res = await fetch(`https://dummyjson.com/products/category/${category}`);
      const data = await res.json();
      product = data.products.find(p => p.id === id);
    } else {
      const categories = ["smartphones", "laptops", "tablets", "mobile-accessories"];
      for (let cat of categories) {
        const res = await fetch(`https://dummyjson.com/products/category/${cat}`);
        const data = await res.json();
        product = data.products.find(p => p.id === id);
        if (product) break;
      }
    }

    if (!product) return alert("Product not found");

    // Example specs (can customize further if API supports)
    const specs = {
      RAM: product.title.toLowerCase().includes("laptop") ? "8GB / 16GB" : "4GB / 6GB",
      Storage: product.title.toLowerCase().includes("laptop") ? "256GB / 512GB SSD" : "64GB / 128GB",
      Battery: product.title.toLowerCase().includes("tablet") || product.title.toLowerCase().includes("phone") ? "4000mAh" : "NA",
      Display: product.title.toLowerCase().includes("laptop") ? "15.6 inch" : "6.5 inch",
      Processor: product.title.toLowerCase().includes("laptop") ? "Intel i5/i7" : "Snapdragon 8 Series",
      OS: product.title.toLowerCase().includes("laptop") ? "Windows 11" : "Android 13"
    };

    currentSlides = [
      `<div class="slide">
        <h2>${product.title}</h2>
        <p><strong>Brand:</strong> ${product.brand}</p>
        <p><strong>Price:</strong> $${product.price}</p>
        <p><strong>Description:</strong> ${product.description || "No description available."}</p>
        <h3>Specifications:</h3>
        <table style="width:100%; border-collapse: collapse;">
          <tr><td><strong>RAM</strong></td><td>${specs.RAM}</td></tr>
          <tr><td><strong>Storage</strong></td><td>${specs.Storage}</td></tr>
          <tr><td><strong>Battery</strong></td><td>${specs.Battery}</td></tr>
          <tr><td><strong>Display</strong></td><td>${specs.Display}</td></tr>
          <tr><td><strong>Processor</strong></td><td>${specs.Processor}</td></tr>
          <tr><td><strong>OS</strong></td><td>${specs.OS}</td></tr>
        </table>
      </div>`
    ];

    if (product.images && product.images.length > 0) {
      product.images.forEach(img => {
        currentSlides.push(`<div class="slide"><img src="${img}" alt="${product.title}" style="width:100%; border-radius:8px;"></div>`);
      });
    }

    currentSlideIndex = 0;
    carousel.innerHTML = currentSlides[currentSlideIndex];
    modal.style.display = "block";

  } catch (err) {
    console.error(err);
    alert("Failed to load product details");
  }
}

// ===============================
// MODAL NAVIGATION
// ===============================
document.getElementById("prevSlide").onclick = () => {
  if (!currentSlides.length) return;
  currentSlideIndex = (currentSlideIndex - 1 + currentSlides.length) % currentSlides.length;
  document.getElementById("carousel").innerHTML = currentSlides[currentSlideIndex];
};

document.getElementById("nextSlide").onclick = () => {
  if (!currentSlides.length) return;
  currentSlideIndex = (currentSlideIndex + 1) % currentSlides.length;
  document.getElementById("carousel").innerHTML = currentSlides[currentSlideIndex];
};

// ===============================
// CLOSE MODAL
// ===============================
document.getElementById("closeModal").onclick = function () {
  document.getElementById("modal").style.display = "none";
};

window.onclick = function(event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};