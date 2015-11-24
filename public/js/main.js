// main.js
// 
// Client side JS file to handle client side assets
// loading, interaction, and communication.
// 
// Tyler Petresky

$(document).ready(function() {
    $('#main-nav').localScroll();
    $('#fixed-nav').localScroll();
    $('#footer-nav').localScroll();
    $('.intro-statement').localScroll();

    $('#contact-submit').click(function() {

        if (ValidateForm($('.contact-live'))) {
            console.log('Form Valid');

            // Compile mail data from form.
            var mail_data = {
                name: $('#first-name-field').val() + ' ' + $('#last-name-field').val(),
                from: $('#email-field').val(),
                subject: $('#subject-field').val(),
                text: $('#message-field').val()
            };

            // Outgoing Ajax request to the server to communicate form submission.
            $.ajax({
                url: 'http://tylerpetresky.com/',
                data: mail_data
            }).done(function(status) {
                console.log('Done AJAX: ' + status);
                if (status == 'contact success') {
                    // Successfully sent the email; let the user know.
                    console.log('Successful sent email from: ' + mail_data.from);

                    $('#contact-submit').addClass('disabled fa fa-check').html(' Success');

                    ApplyEffectToElement($('.contact-live'), 'contact-success-border', 5000);
                    window.setTimeout(function() {
                        $('#contact-submit').removeClass('disabled fa fa-check').html('Submit Form');
                    }, 5000);
                    //ClearGroup($('.contact-live'));
                }
                else {
                    // Failed to send the email; let the user know.
                    console.log('Failed to send email from: ' + mail_data.from);

                    $('#contact-submit').addClass('fa fa-exclamation').html(' Failed');
                    ApplyEffectToElement($('.contact-live'), 'contact-error-border', 5000);
                    window.setTimeout(function() {
                        $('#contact-submit').removeClass('fa fa-exclamation').html('Submit Form');
                    }, 5000);
                }
            }).fail(function(jq_xhr, status) {
                // AJAX query failed to execute properly.
                console.log('Failed to execute AJAX: ' + status);

                $('#contact-submit').addClass('fa fa-exclamation').html(' Failed');
                ApplyEffectToElement($('.contact-live'), 'contact-error-border', 5000);
                window.setTimeout(function() {
                    $('#contact-submit').removeClass('fa fa-exclamation').html('Submit Form');
                }, 5000);
            });
        }
        else {
            console.log('Form Invalid');
        }
    });

    // Hide the portable nav while it is above the About Me section.
    $('#fixed-nav').removeClass().addClass('animated slideOutRight');

    // When you cross the waypoint, toggle the portable nav.
    $('#about').waypoint(function(direction) {
        if (direction == 'down')
            $('#fixed-nav').removeClass().addClass('animated slideInRight');
        else if (direction == 'up')
            $('#fixed-nav').removeClass().addClass('animated slideOutRight');
    });
});

function ValidateForm(group) {
    var valid = true;
    group.each(function(index) {
        if ($(this).val() == '') {
            valid = false;
            $(this).addClass('contact-error-border');
        }
        else if($(this).hasClass('contact-error-border'))
            $(this).removeClass('contact-error-border');
    });
    return valid;
}

// Applies user specified [classes] to the single or [group] of
// elements specified for a specified [duration].
function ApplyEffectToElement(group, classes, duration) {
    group.each(function(index) {
        $(this).addClass(classes);
    });

    window.setTimeout(function() {
        group.each(function() {
            $(this).removeClass(classes);
        });
    }, duration);
}

// Applies a value clear to a [group] of elements.
function ClearGroup(group) {
    group.each(function(index) {
        $(this).val('');
    });
}