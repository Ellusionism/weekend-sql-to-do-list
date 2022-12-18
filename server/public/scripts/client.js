$(document).ready(onReady);

function onReady() {
    $(`#submitBtn`).on(`click`, addTask);
    $(`body`).on(`click`, `.completeTaskBtn`, completeTask);
    $(`body`).on(`click`, `.deleteTodoBtn`, deleteTodo);
    $(`body`).on(`click`, `.deleteCompletedBtn`, deleteCompleted);  
    getTodoList();
    getCompletedList();
};
// Click listeners, and functions to render the data when the page is loaded

function addTask() {
    const taskToSend = {
        task: $(`#taskInput`).val(), 
        deadline: $(`#deadlineInput`).val()
    };
    if (taskToSend.task && taskToSend.deadline) {
        console.log(`Adding task to to-do list`, taskToSend);
        $.ajax({
            method: `POST`,
            url: `/todo`,
            data: taskToSend
        }).then((response) => {
            console.log(response);
            $(`#taskInput`).empty();
            $(`#deadlineInput`).empty();
            getTodoList();
        }).catch((error) => {
            console.log(`Error in /todo client POST`, error);     
        });
    } else {
        alert(`ERROR: Please make sure all input fields are filled out before submitting a task`)
    };
}
// Adds the input field data to the todoList database table

function completeTask () {
    let id = $(this).data().id;
    let date = new Date();
    let completedTask = {
        task: $(this).closest(`tr`).children().eq(0).text(),
        dateCompleted: date
    }
    console.log(`Adding task to completed list`, completedTask);
    $.ajax({
        method: `POST`,
        url: `/completed`,
        data: completedTask
    }).then((response) => {
        console.log(response);
        $.ajax({
            type:`DELETE`,
            url:`/todo/${id}`
        }).then ((response) => {
            console.log(response);
            getTodoList();
            getCompletedList();
        }).catch((error) => {
            console.log(`Error in completeTask client DELETE`, error);
        });
    }).catch((error) => {
        console.log(`Error in completeTask client POST`, error);      
    });
};
// Adds the selected data to the completedList database table, and removes it from the todoList database table

function deleteCompleted () {
    let id = $(this).data().id;
    console.log(id)
    $.ajax({
        type:`DELETE`,
        url:`/completed/${id}`
    }).then ((response) => {
        console.log(response);
        getCompletedList();
    }).catch((error) => {
        console.log(`Error in /completed client DELETE`, error);
    });
};
// Removes the selected data from the completedList database table

function deleteTodo () {
    let id = $(this).data().id;
    $.ajax({
        type:`DELETE`,
        url:`/todo/${id}`
    }).then ((response) => {
        console.log(response);
        getTodoList();
    }).catch((error) => {
        console.log(`Error in /todo client DELETE`, error);
    });
};
// Removes the selected data from the todoList database table

function getCompletedList() {
    $.ajax({
        method: `GET`,
        url: `/completed`
    }).then((response) => {
        renderCompletedList(response);
    }).catch((error) => {
        console.log(`Error in /completed client GET`, error);
    });
}
// Gets all the data from the todoList database table to render on the DOM

function getTodoList() {
    $.ajax({
        method: `GET`,
        url: `/todo`
    }).then((response) => {
        renderTodoList(response);
    }).catch((error) => {
        console.log(`Error in /todo client GET`, error);
    });
}
// Gets all the data from the todoList database table to render on the DOM

function renderCompletedList(data) {
    $(`#completedTableBody`).empty();
    for(let completed of data) {
        $(`#completedTableBody`).append(`
                <tr>
                    <td>${completed.task}</td>
                    <td>${completed.dateCompleted}</td>
                    <td>
                        <button data-id=${completed.id} class="deleteCompletedBtn">🗑️</button>
                    </td>
                </tr>
        `);
    };
};
// Renders information from the /completed GET route on the DOM

function renderTodoList(data) {
    $(`#todoTableBody`).empty();
    for(let todo of data) {
        $(`#todoTableBody`).append(`
                <tr>
                    <td>${todo.task}</td>
                    <td>${todo.deadline}</td>
                    <td>
                        <button data-id=${todo.id} class="completeTaskBtn">✅</button>
                    </td>
                    <td>
                        <button data-id=${todo.id} class="deleteTodoBtn">🗑️</button>
                    </td>
                </tr>
        `);
    };
};
// Renders information from the /todo GET route on the DOM