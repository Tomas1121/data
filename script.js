const form = document.getElementById("data-form");
const input = document.getElementById("data-input");
const list = document.getElementById("data-list");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = input.value;

  // Enviar datos al servidor
  const response = await fetch("https://data-khzd.onrender.com/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ value: data }),
  });

  if (response.ok) {
    addToList(data);
    input.value = "";
  }
});

function addToList(data) {
    const li = document.createElement("li");
  
    // Si `data` es un objeto, muestra su propiedad "value"
    if (typeof data === "object" && data.value) {
      li.textContent = data.value;
    } else {
      li.textContent = data; // Si es un string, lo muestra directamente
    }
  
    list.appendChild(li);
  }
  

// Cargar datos iniciales
(async () => {
    const response = await fetch("https://data-khzd.onrender.com/data");
    const data = await response.json();
  
    // Itera por cada elemento y asegúrate de que se muestre correctamente
    data.forEach((item) => addToList(item));
  })();
  
