const API = "/api/guests";

async function loadGuests() {
  const res = await fetch(API);
  const data = await res.json();

  const list = document.getElementById("guestList");
  list.innerHTML = "";

  data.forEach(g => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${g.name}</strong><br/>
      ${g.message}<br/>
      <button onclick="deleteGuest('${g._id}')">Hapus</button>
    `;
    list.appendChild(li);
  });
}

document.getElementById("guestForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, message })
  });

  e.target.reset();
  loadGuests();
});

async function deleteGuest(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadGuests();
}

loadGuests();