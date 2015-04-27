$(document).ready(function() {
    $('#main-nav').localScroll();
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
        $('subject-field').val('');
    });

    // $('nav').on('affixed.bs.affix', function() {
    //     $('nav').css('background-color', 'rgba(0, 0, 0, 0.4)');
    // });
});