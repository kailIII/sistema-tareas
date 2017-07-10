$(document).ready(function(){
    $('.btn-process').click(function (e) {
        e.preventDefault();
        
        var row = $(this).parents('tr');
        
        var id = row.data('id');
        
        var form = $('#form-update');
        
        var url = form.attr('action').replace(':TASK_ID', id);
        
        var data = form.serialize();
        
        $('#button-' + id).addClass('disabled');
        
        $.post(url, data, function(result){
            $('#button-' + id).removeClass('disabled');
            if(result.processed == 1)
            {
                $('#message-warning').addClass("hidden");
                
                $('#message').removeClass("hidden");
                
                $('#glyphicon-' + id).removeClass('glyphicon-time text-danger').addClass('glyphicon-ok text-success');
                $('#glyphicon-' + id).prop('title', 'Finish');
                
                $('#user-message').html('The task has been finish');
            }
            else
            {
                $('#message').addClass("hidden");
                $('#message-warning').removeClass("hidden");
                $('#user-message-warning').html('The task was already finish');
            }
        }).fail(function () {
            $('#button-' + id).removeClass('disabled');
            
            bootbox.alert('The task was already finished');
            //alert('The task was already finished')
        });
    });
});