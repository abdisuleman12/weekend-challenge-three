$(document).ready(function () {
    console.log('js sourced in')

    $('.createButton').on('click', function() {
        console.log('task button has been clicked')

        var taskInputToSend = {
            task: $('#taskIn').val()
        };
        console.log('the task input is :' , taskInputToSend);

        addTask(taskInputToSend) 
        });// end of create button on click
        
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
        } // end success
    }); //end ajax
};// end of add task function  
