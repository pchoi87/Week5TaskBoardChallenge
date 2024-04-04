// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

const myModal = document.getElementById('formModal')
const myInput = document.getElementById('add-task')



myModal.addEventListener('shown.bs.modal', () => {
    myInput.focus()
})

// Todo: create a function to generate a unique task id
function generateTaskId() {
    if (nextId === null) {
        nextId = 1
    } else {
        nextId++
    }
    localStorage.setItem("nextId", JSON.stringify(nextId))
    console.log(nextId)
    return nextId
}

// Todo: create a function to create a task card
function createTaskCard(task, divid, backgroundColor) {

    var cardTemplate = `<div class="card text-bg-${backgroundColor} mb-3" style="max-width: 18rem;">
    <div class="card-header">${task.dueDate}</div>
    <div class="card-body">
      <h5 class="card-title">Title: ${task.title}</h5>
      <p class="card-text">Description: ${task.description}</p>
    </div>
    </div>`
    $("#"+divid).append(cardTemplate)
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    //const date1 = dayjs(dueDate).format("MM/DD/YYYY")
    //const date2 = dayjs().format("MM/DD/YYYY")
    //var diffDate = date1.diff(date2, "day")
    //console.log("differ", diffDate)
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    $("#todo-cards").empty()
    $("#in-progress-cards").empty()
    $("done-cards").empty()
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].status = "todo") {
            createTaskCard(taskList[i], "todo-cards", "text-bg-light")
        } else if (taskList[i].status = "progress") {
            createTaskCard(taskList[i], "in-progress-cards", "text-bg-light")
        } else {
            createTaskCard(taskList[i], "done-cards", "text-bg-light")
        }
    }
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    var title = $("#taskTitle").val()
    var dueDate = $("#taskDueDate").val()
    var description = $("#taskDescription").val()
    var userTask = {
        id: generateTaskId(),
        title: title,
        dueDate: dueDate,
        description: description,
        status: "todo"
    }
    console.log("task",userTask)
    taskList.push(userTask)
    localStorage.setItem("tasks", JSON.stringify(taskList))
    renderTaskList()

    //var storedTask = JSON.parse(localStorage.getItem("taskManager")) || [] // || or operator
}


// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $("#save-task").on("click", handleAddTask)
    renderTaskList()

});
