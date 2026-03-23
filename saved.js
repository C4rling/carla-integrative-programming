document.addEventListener("DOMContentLoaded", () => {
  const savedDiv = document.getElementById("savedResults");

  function renderSaved() {
    const saved = JSON.parse(localStorage.getItem("gadgets")) || [];
    savedDiv.innerHTML = "";

    if (!saved.length) {
      savedDiv.innerHTML = "<p>No saved gadgets yet.</p>";
      return;
    }

    saved.forEach(g => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${g.image}" alt="${g.title}">
        <h3>${g.title}</h3>
        <p>${g.brand}</p>
        <p>$${g.price}</p>
        <button class="delete-btn">🗑 Delete</button>
      `;

      // Add click listener for delete
      card.querySelector(".delete-btn").addEventListener("click", () => {
        deleteGadget(g.id);
      });

      savedDiv.appendChild(card);
    });
  }

  function deleteGadget(id) {
    let saved = JSON.parse(localStorage.getItem("gadgets")) || [];
    saved = saved.filter(item => item.id !== id); // remove the gadget
    localStorage.setItem("gadgets", JSON.stringify(saved));
    renderSaved(); // re-render the saved list
  }

  renderSaved(); // initial render
});