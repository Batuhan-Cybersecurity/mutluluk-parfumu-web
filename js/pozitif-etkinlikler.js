const input = document.getElementById('input');
const addBtn = document.getElementById('addBtn');
const listEl = document.getElementById('list');

// localStorage'dan listeyi çek, yoksa boş dizi
let list = JSON.parse(localStorage.getItem('myList')) || [];

// Listeyi ekranda gösteren fonksiyon
function renderList() {
  listEl.innerHTML = '';
  list.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = item;
    // istersen silme butonu da ekleyebilirsin
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Sil';
    delBtn.onclick = () => {
      list.splice(index, 1);
      localStorage.setItem('myList', JSON.stringify(list));
      renderList();
    };
    li.appendChild(delBtn);
    listEl.appendChild(li);
  });
}

// Yeni madde ekle
addBtn.onclick = () => {
  const val = input.value.trim();
  if (!val) return;
  list.push(val);
  localStorage.setItem('myList', JSON.stringify(list));
  input.value = '';
  renderList();
};

// Sayfa açıldığında listeyi göster
renderList();
