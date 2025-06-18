// İyimserlik mesajlarının tutulacağı dizi
let messages = [];

// Sayfa yüklendiğinde localStorage'dan mesajları yükle
window.onload = function() {
    const savedMessages = localStorage.getItem("messages");
    if (savedMessages) {
        messages = JSON.parse(savedMessages);
    }
};

// Mesaj ekleme fonksiyonu
function addMessage() {
    const input = document.getElementById("messageInput");
    const newMessage = input.value.trim();

    if (newMessage) {
        messages.push(newMessage);
        localStorage.setItem("messages", JSON.stringify(messages));  // localStorage'a kaydet
        input.value = ""; // Mesaj ekledikten sonra input alanını temizle
        alert("Mesaj başarıyla eklendi!");
    } else {
        alert("Lütfen geçerli bir mesaj yazın.");
    }
}

// Rastgele mesaj gösterme fonksiyonu
function showRandomMessage() {
    const display = document.getElementById("message");

    if (messages.length === 0) {
        display.textContent = "Kavanozda henüz mesaj yok. Lütfen önce bir mesaj ekleyin!";
    } else {
        const randomIndex = Math.floor(Math.random() * messages.length);
        display.textContent = messages[randomIndex];
    }
}
