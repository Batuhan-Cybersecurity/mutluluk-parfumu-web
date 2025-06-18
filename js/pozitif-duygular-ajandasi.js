let taskStatusMap = JSON.parse(localStorage.getItem('taskStatusMap')) || {};

// Görev tıklanınca durumu değiştirir ve kaydeder
function toggleTask(element) {
    const taskText = element.querySelector('h3').innerText.trim();
    const icon = element.querySelector('.task-status i');

    const isCompleted = element.classList.toggle('completed');

    if (isCompleted) {
        icon.classList.remove('fa-circle');
        icon.classList.add('fa-check-circle');
        taskStatusMap[taskText] = true;
    } else {
        icon.classList.remove('fa-check-circle');
        icon.classList.add('fa-circle');
        taskStatusMap[taskText] = false;
    }

    localStorage.setItem('taskStatusMap', JSON.stringify(taskStatusMap));
}

// Sayfada hazır olan görevleri tarar ve duruma göre stil verir
function applySavedTaskStatus() {
    const taskCards = document.querySelectorAll('.guide-card');

    taskCards.forEach(card => {
        const taskText = card.querySelector('h3').innerText.trim();
        const icon = card.querySelector('.task-status i');

        if (taskStatusMap[taskText]) {
            card.classList.add('completed');
            icon.classList.remove('fa-circle');
            icon.classList.add('fa-check-circle');
        }

        // Tıklama eventi her karta ekleniyor
        card.onclick = function () {
            toggleTask(card);
        };
    });
}

// Yeni görev ekler
function addCustomTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (!taskText) {
        alert('Lütfen bir görev girin!');
        return;
    }

    const taskContainer = document.getElementById('taskContainer');
    const taskCount = taskContainer.children.length + 1;

    const newTask = document.createElement('div');
    newTask.className = 'guide-card';
    newTask.innerHTML = `
        <h3>${taskCount}. ${taskText}</h3>
        <div class="task-meta">
            <span class="task-status"><i class="far fa-circle"></i></span>
        </div>
    `;

    taskContainer.appendChild(newTask);

    newTask.onclick = function () {
        toggleTask(newTask);
    };

    // Kaydı başlat
    taskStatusMap[`${taskCount}. ${taskText}`] = false;
    localStorage.setItem('taskStatusMap', JSON.stringify(taskStatusMap));

    taskInput.value = '';
}

// Sayfa açılınca kayıtlı görev durumlarını uygula
document.addEventListener('DOMContentLoaded', function () {
    applySavedTaskStatus();
});
