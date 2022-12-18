$(document).ready(onReady);

function onReady() {
    $(`#submitBtn`).on(`click`, addTask);
    // $(`body`).on(`click`, `.completeTaskBtn`, completeTask);
    $(`body`).on(`click`, `.deleteTodoBtn`, deleteTodo);
    $(`body`).on(`click`, `.deleteCompletedBtn`, deleteCompleted);  
    getTodoList();
    getCompletedList();
};

function addTask() {
    const taskToSend = {
        task: $(`#taskInput`).val(), 
        deadline: $(`#deadlineInput`).val()
    };
    console.log(`Adding task to list`, taskToSend);
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
        alert(`Error adding task to list. Please try again later.`)       
    });
}

function deleteCompleted () {
    let id = $(this).data().id;
    console.log(id)
    $.ajax({
        type:'DELETE',
        url:`/completed/${id}`
    }).then ((response) => {
        console.log(response);
        getCompletedList();
    }).catch((error) => {
        console.log(`Error in /completed client DELETE`, error);
    });
};

function deleteTodo () {
    let id = $(this).data().id;
    $.ajax({
        type:'DELETE',
        url:`/todo/${id}`
    }).then ((response) => {
        console.log(response);
        getTodoList();
    }).catch((error) => {
        console.log(`Error in /todo client DELETE`, error);
    });
};

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