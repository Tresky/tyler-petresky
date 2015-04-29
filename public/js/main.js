$(document).ready(function() {
    $('#main-nav').localScroll();
    $('#fixed-nav').localScroll();
    $('#footer-nav').localScroll();
    $('.intro-statement').localScroll();

    var socket = io();

    $('#contact-submit').click(function() {
        console.log('Emitting');
        data = {
            name: $('#first-name-field').val() + ' ' + $('#last-name-field').val(),
            from: $('#email-field').val(),
            subject: $('#subject-field').val(),
            text: $('message-field').val()
        };
        socket.emit('contact submit', data);
    });

    socket.on('contact success', function() {
        alert('message sent');
        $('#first-name-field').val('');
        $('#last-name-field').val('');
        $('#email-field').val('');
        $('#subject-field').val('');
        $('#message-field').val('');

        $('#contact-submit').addClass('disabled fa fa-check');
    });
    
    //$('form span').addClass('contact-success-overlay');
    // $('#contact-submit').addClass('disabled fa fa-check').html(' Success');
    // $('#first-name-field').addClass('contact-success-border');
    // $('#last-name-field').addClass('contact-success-border');
    // $('#email-field').addClass('contact-success-border');
    // $('#subject-field').addClass('contact-success-border');
    // $('#message-field').addClass('contact-success-border');
    // window.setTimeout(function() {
    //     $('#contact-submit').removeClass('disabled fa fa-check').html('Submit Form');
    //     $('#first-name-field').removeClass('contact-success-border');
    //     $('#last-name-field').removeClass('contact-success-border');
    //     $('#email-field').removeClass('contact-success-border');
    //     $('#subject-field').removeClass('contact-success-border');
    //     $('#message-field').removeClass('contact-success-border');
    // }, 5000);

    $('#fixed-nav').removeClass().addClass('animated slideOutRight');

    $('#about').waypoint(function(direction) {
        if (direction == 'down')
            $('#fixed-nav').removeClass().addClass('animated slideInRight');
        else if (direction == 'up')
            $('#fixed-nav').removeClass().addClass('animated slideOutRight');
    });
});