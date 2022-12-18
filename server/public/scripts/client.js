$(document).ready(onReady);

function onReady() {
    $(`#submit-task`).on(`click`, addTask);
    $(`body`).on(`click`, `.completeTaskBtn`, completeTask);
    $(`body`).on(`click`, `.deleteTodoBtn`, deleteTodo);
    $(`body`).on(`click`, `.deleteCompletedBtn`, deleteCompleted);  
    getTodoList();
    getCompletedList();
};

function getCompletedList() {
    $.ajax({
        method: 'GET',
        url: '/completed'
    }).then((response) => {
        renderCompletedList(response);
    }).catch((error) => {
        console.log('error in /completed client GET', error);
    });
}

function getTodoList() {
    $.ajax({
        method: 'GET',
        url: '/todo'
    }).then((response) => {
        renderTodoList(response);
    }).catch((error) => {
        console.log('error in /todo client GET', error);
    });
}

function renderCompletedList(data) {
    $('#completedTableBody').empty();
    // Add all artists to table
    for(let completed of data) {
        $('#completedTableBody').append(`
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
    $('#todoTableBody').empty();
    // Add all artists to table
    for(let todo of data) {
        $('#todoTableBody').append(`
                <tr>
                    <td>${toto.task}</td>
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