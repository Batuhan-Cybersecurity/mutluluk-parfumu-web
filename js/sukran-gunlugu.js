// Sayfa yüklendiğinde gratitudeList'i doldur
document.addEventListener("DOMContentLoaded", () => {
    const savedItems = JSON.parse(localStorage.getItem("gratitudes")) || [];
    const list = document.getElementById("gratitudeList");

    savedItems.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
    });
});

// Teşekkür maddesi ekle ve kaydet
function addGratitude() {
    const input = document.getElementById("gratitudeInput");
    const value = input.value.trim();

    if (value !== "") {
        const list = document.getElementById("gratitudeList");
        const li = document.createElement("li");
        li.textContent = value;
        list.appendChild(li);
        input.value = "";

        // LocalStorage'a kaydet
        let savedItems = JSON.parse(localStorage.getItem("gratitudes")) || [];
        savedItems.push(value);
        localStorage.setItem("gratitudes", JSON.stringify(savedItems));
    }
}
