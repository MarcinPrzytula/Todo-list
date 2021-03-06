const form = document.querySelector(".wrap form");
const input = document.querySelector(".wrap input");
const ul = document.querySelector(".wrap ul");
const counterTasks = document.querySelector(".wrap h3>span");

const editInput = document.querySelector(".editInputBox input");
const btnEditSave = document.querySelector(".editInputBox button");
const btnEditClose = document.querySelector(".editInputBox .close");

const searchInput = document.querySelector(".searchBox input");
const btnSearch = document.querySelector(".searchBox .search");
const btnShowAll = document.querySelector(".searchBox .showAll");

const allLi = [];

let actuallyLi = "";
let tasks = "";


const searchTask = (e) => {
    e.preventDefault();
    tasks = allLi.filter(li => li.querySelector("span").textContent.toLowerCase().trim().includes(searchInput.value.toLowerCase().trim()))
    ul.textContent = "";
    tasks.forEach(li => ul.appendChild(li))
}

const showAllTasks = (e) => {
    e.preventDefault();
    searchInput.value = "";
    render();
}

const doneTask = (e) => {
    e.currentTarget.parentNode.querySelector("span").classList.toggle("throught");
}

const popupBlur = () => {
    document.querySelector("div.editInputBox").classList.toggle("activeEditInputBox");
    document.body.classList.toggle("blur");
}

const editTask = (e) => {
    popupBlur();
    editInput.value = "";
    actuallyLi = e.target.parentNode.querySelector("span")
}

btnEditSave.addEventListener("click", (e) => {
    e.preventDefault();

    if (editInput.value.length) {
        for (const li of allLi) {
            if (li.querySelector("span").textContent.trim() === editInput.value.trim()) {
                alert("This task is already here!");
                return;
            }
        }
    } else if (input.value === "") {
        alert("Enter the name of the task");
        return
    }

    popupBlur();
    actuallyLi.textContent = editInput.value;
});

btnEditClose.addEventListener("click", () => {
    popupBlur();
})

const removeTask = (e) => {
    const liIndex = e.target.parentNode.dataset.index;

    allLi.splice(liIndex, 1);

    ul.textContent = "";
    render();
}

const render = () => {
    allLi.forEach((li, index) => {
        li.dataset.index = index;
        ul.appendChild(li);
    })
    counterTasks.textContent = allLi.length;
}

const addTask = (e) => {
    e.preventDefault();

    const task = document.createElement("li");

    if (input.value.length) {
        for (const li of allLi) {
            if (li.querySelector("span").textContent.toLowerCase().trim() === input.value.toLowerCase().trim()) {
                alert("This task is already here!");
                return;
            }
        }
    } else if (input.value === "") {
        alert("Enter the name of the task");
        return
    }

    task.innerHTML = `<span>${input.value}</span> <button class="delete">Delete</button> <button class="edit">Edit</button> <button class="done"><i class="fas fa-check"></i></button>`;

    allLi.push(task);

    input.value = "";

    render();

    task.querySelector('button.delete').addEventListener('click', removeTask);
    task.querySelector('button.edit').addEventListener('click', editTask);
    task.querySelector('button.done').addEventListener('click', doneTask);
}

form.addEventListener("submit", addTask);
btnSearch.addEventListener("click", searchTask);
btnShowAll.addEventListener("click", showAllTasks);