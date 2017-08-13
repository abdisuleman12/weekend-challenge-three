$(document).ready(function () {
    console.log('js sourced in')

    $('.createButton').on('click', function () {
        console.log('task button has been clicked')
        var taskInputToSend = {
            task: $('#taskIn').val()
        };
        console.log('the task input is :', taskInputToSend);
        addTask(taskInputToSend)
    });// end of create button on click

    $('#viewTasks').on('click','.completeButton', function () {
        console.log('complete button was clicked')
    }); // complete button listener 


    $('#viewTasks').on('click', '.deleteButton', function () {
        console.log('delete button was clicked')
    }); // delete button listener


}); // end of document ready function 



function addTask(taskToDatabase) {
    console.log('in addTask', taskToDatabase);
    $.ajax({
        url: '/tasks',
        type: 'POST',
        data: taskToDatabase,
        // data = {task: 'userinput'}
        success: function (response) {
            console.log('ajax POST success, response: ', response);
            getTask();
        } // end success

    }); //end ajax

};// end of add task function  

function getTask() {
    console.log('in get task')
    $.ajax({
        url: '/tasks',
        type: 'GET',
        success: function (response) {
            console.log('ajax GET success, response:', response);
            for (var i = 0; i < response.length; i++) {
                var taskToDisplay = response[i];
                //taskToDisplay.id, taskToDisplay.tasks_to_add
                var $taskRowToDisplay = $('<tr class = "taskRow"></tr>');
                $taskRowToDisplay.data('id', taskToDisplay.id);
                $taskRowToDisplay.append('<td class = "task">' + taskToDisplay.tasks_to_add + '</td>');
                $taskRowToDisplay.append('<td><button class= "completeButton">Complete</button></td>');
                $taskRowToDisplay.append('<td><button class= "deleteButton">Delete</button></td>')
                $('#viewTasks').append($taskRowToDisplay)
            } // end of for loop 
        }
    });
}; // end of get task function 
