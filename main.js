const wrapper = document.getElementById("CONTAINER");
const box = document.getElementById("inp");

fetch("https://699d9b4283e60a406a46e1ba.mockapi.io/Teachers")
    .then(response => response.json())
    .then(data => {
        render(data);
        filterInput(data);
    })
    .catch(error => console.error("Xatolik yuz berdi:", error));

function render(users) {
    if (users.length === 0) {
        wrapper.innerHTML = "<h3> Hech narsa topilmadi </h3>";
        return;
    }

    const cards = users.map(el => `
        <div class="card" key="${el.id}">
            <img src="${el.avatar}" alt="${el.name}">
            <p>${el.name}</p>
            <a href="#">${new Date(el.createdAt).toLocaleDateString()}</a>
        </div>
    `).join('');

    wrapper.innerHTML = cards;
}

function filterInput(data) {
    box.addEventListener("input", (e) => {
        let inputValue = e.target.value.toLowerCase();

        let filteredData = data.filter(item => {
            return item.name.toLowerCase().includes(inputValue) ||
                   new Date(item.createdAt).toLocaleDateString().toLowerCase().includes(inputValue);
        });

        render(filteredData);
    });
}