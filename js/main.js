var taskInput = document.getElementById("taskInput");
var addBtn = document.getElementById("plus");
var delAll = document.getElementById("deleteAll");
let warningLabel = document.getElementById("warning");



let mode = "add";
let vvs;

var inputContainer;
if (localStorage.Tasks == null) {
    inputContainer = [];
} else {
    inputContainer = JSON.parse(localStorage.Tasks);
    displayList();
}

taskInput.focus();

addBtn.onclick = function () {
    if (taskInput.value === '') {
        warningLabel.style.display = "inline";
        taskInput.focus();
        return false;
    } else {
        warningLabel.style.display = "none";
    }
    var mainInput = {
        input : taskInput.value
    }

    if (mode === 'add') {
        inputContainer.push(mainInput);
        taskInput.focus();
    } else {
        inputContainer[vvs] = mainInput;
        mode = 'add';
        addBtn.innerHTML = `<i class="fa-solid fa-plus"></i>`;
        addBtn.style.backgroundColor = 'purple';
        taskInput.focus();
    }
    localStorage.setItem("Tasks", JSON.stringify(inputContainer));
    
    displayList()
    clearInput()
}

function displayList() {
    var tasksList = "";
    for (var i = 0; i < inputContainer.length; i++){
        tasksList += `
        <li class="form-control w-50 m-auto" id="listTask">${inputContainer[i].input}
            <button onclick="deleteTask(${i})" class="trash"><i class="fa-solid fa-trash"></i></button>
            <button onclick="editTask(${i})"><i class="fa-solid fa-pen-to-square"></i></button>
        </li>`
    }
    document.getElementById("list").innerHTML = tasksList;

    if (inputContainer.length > 0) {
        delAll.style.display = "block";
    } else {
        delAll.style.display = "none";
    }
}

function clearInput() {
    taskInput.value = ''; 
}

function deleteTask(i) {
    var deleteTask = confirm("Are you sure to delete this Task?")
    if (deleteTask) {
        inputContainer.splice(i, 1);
    } else {
        return false;
    }
    localStorage.setItem("Tasks", JSON.stringify(inputContainer));
    displayList();
}

function editTask(i) {
    taskInput.value = inputContainer[i].input;
    taskInput.focus();
    addBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    addBtn.style.backgroundColor = 'Green';
    delAll.style.display = "none";
    mode = 'edit';
    vvs = i;
}
function deleteAll() {
    var deleteCheck = confirm("Are you sure to delete all the Tasks?")
    if (deleteCheck) {
        inputContainer.splice(0);
        taskInput.focus();
    } else {
        return false;
    }
    localStorage.setItem("Tasks", JSON.stringify(inputContainer));
    displayList();
}