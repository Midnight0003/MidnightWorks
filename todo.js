const inputBox = document.getElementById("input-box");
const taskContainer = document.getElementById("task-container");

function addTask() {
    const errorMsg = document.getElementById("error-msg");

    if (inputBox.value.trim() === '') {
        errorMsg.textContent = "You didn't put a task.";
        return;
    } else {
        errorMsg.textContent = ""; // Clear error if valid
    }

    let li = document.createElement("li");
    li.innerHTML = inputBox.value;

    li.addEventListener("click", function () {
        li.classList.toggle("checked");
        saveData();
    });

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    span.addEventListener("click", function () {
        li.remove();
        saveData();
    });

    li.appendChild(span);
    taskContainer.appendChild(li);

    inputBox.value = '';
    saveData();
}


function saveData() {
    localStorage.setItem("data", taskContainer.innerHTML);
}

function showTask() {
    taskContainer.innerHTML = localStorage.getItem("data");

    // Reattach event listeners
    const listItems = taskContainer.querySelectorAll("li");
    listItems.forEach(li => {
        li.addEventListener("click", function () {
            li.classList.toggle("checked");
            saveData();
        });

        const span = li.querySelector("span");
        if (span) {
            span.addEventListener("click", function (e) {
                li.remove();
                saveData();
                e.stopPropagation(); // Prevent li click
            });
        }
    });
}

showTask();
