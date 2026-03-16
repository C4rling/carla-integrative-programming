async function searchGadgets() {

const query = document.getElementById("searchInput").value;
const results = document.getElementById("results");

if(query === ""){
results.innerHTML = "Please enter a gadget name.";
return;
}

results.innerHTML = "Searching gadgets...";

try {

const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);

if(!response.ok){
throw new Error("API error");
}

const data = await response.json();

results.innerHTML = "";

if(data.products.length === 0){
results.innerHTML = "No gadgets found.";
return;
}

data.products.forEach(product => {

const card = document.createElement("div");
card.classList.add("gadget-card");

card.innerHTML = `
<h3>${product.title}</h3>
<img src="${product.thumbnail}">
<p><strong>Brand:</strong> ${product.brand}</p>
<p><strong>Price:</strong> $${product.price}</p>
<p>${product.description}</p>
`;

results.appendChild(card);

});

} catch(error){

results.innerHTML = "Failed to fetch gadgets.";

}

}