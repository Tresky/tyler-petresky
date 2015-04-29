$(document).ready(function() {
    $('#main-nav').localScroll();
    $('#fixed-nav').localScroll();
    $('#footer-nav').localScroll();
    $('.intro-statement').localScroll();

    var socket = io();

    $('#contact-submit').click(function() {
        data = {
            name: $('#first-name-field').val() + ' ' + $('#last-name-field').val(),
            from: $('#email-field').val(),
            subject: $('#subject-field').val(),
            text: $('#message-field').val()
        };
        socket.emit('contact submit', data);
    });

    socket.on('contact success', function() {
        $('#first-name-field').val('');
        $('#last-name-field').val('');
        $('#email-field').val('');
        $('#subject-field').val('');
        $('#message-field').val('');

        $('#contact-submit').addClass('disabled fa fa-check contact-success-border').html(' Success');
        $('#first-name-field').addClass('contact-success-border');
        $('#last-name-field').addClass('contact-success-border');
        $('#email-field').addClass('contact-success-border');
        $('#subject-field').addClass('contact-success-border');
        $('#message-field').addClass('contact-success-border');
        window.setTimeout(function() {
            $('#contact-submit').removeClass('disabled fa fa-check contact-success-border').html('Submit Form');
            $('#first-name-field').removeClass('contact-success-border');
            $('#last-name-field').removeClass('contact-success-border');
            $('#email-field').removeClass('contact-success-border');
            $('#subject-field').removeClass('contact-success-border');
            $('#message-field').removeClass('contact-success-border');
        }, 5000);
    });

    socket.on('contact error', function() {
        $('#contact-submit').addClass('disabled fa fa-exclamation contact-error-border').html(' Failed');
        $('#first-name-field').addClass('contact-error-border');
        $('#last-name-field').addClass('contact-error-border');
        $('#email-field').addClass('contact-error-border');
        $('#subject-field').addClass('contact-error-border');
        $('#message-field').addClass('contact-error-border');
        window.setTimeout(function() {
            $('#contact-submit').removeClass('disabled fa fa-exclamation contact-error-border').html('Submit Form');
            $('#first-name-field').removeClass('contact-error-border');
            $('#last-name-field').removeClass('contact-error-border');
            $('#email-field').removeClass('contact-error-border');
            $('#subject-field').removeClass('contact-error-border');
            $('#message-field').removeClass('contact-error-border');
        }, 5000);
    });

    $('#fixed-nav').removeClass().addClass('animated slideOutRight');

    $('#about').waypoint(function(direction) {
        if (direction == 'down')
            $('#fixed-nav').removeClass().addClass('animated slideInRight');
        else if (direction == 'up')
            $('#fixed-nav').removeClass().addClass('animated slideOutRight');
    });
});