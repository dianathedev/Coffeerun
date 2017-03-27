(function(window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector, achievements) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);
        this.achievements = achievements;
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        window.myThis = this;
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            console.log(data);
            fn(data)
                .then(function() {
                    this.reset();
                    this.elements[0].focus();
                }.bind(this));
            $('#achievementsOptions').addClass('hidden');

            //trigger if size is coffee-zilla and caffeine rating is 100
            if (data['size'] == 'coffee-zilla' && data['strength'] == 100) {
                window.myThis.showModal(data['emailAddress']);
            }
        });
    };

    FormHandler.prototype.addInputHandler = function(fn) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;
            var message = '';
            if (fn(emailAddress)) {
                event.target.setCustomValidity('');
            } else {
                message = emailAddress + ' is not an authorized email address!';
                event.target.setCustomValidity(message);
            }
        });
    };

    FormHandler.prototype.decafInputHandler = function(fn) {
        $('#strengthLevel').on('change', function(event) {
            var caffeineRating = $('#strengthLevel').val();
            var coffeeOrder = $('#coffeeOrder').val();
            var message = '';

            if (fn(coffeeOrder, caffeineRating)) {
                event.target.setCustomValidity('');
            } else {
                message = 'Must be less than 20';
                event.target.setCustomValidity(message);
            }
        });
    };

    FormHandler.prototype.showModal = function(email) {
        console.log('showing');
        $('#myModal').modal('show');
        $('#myModal').on('hide.bs.modal', function() {
            var $activeElement = $(document.activeElement);
            if ($activeElement.is('[data-dismiss]')) {
                if ($activeElement[0].id == 'confirm-achievement') {
                    console.log(email);
                    this.achievements.add(email, 'yes');
                }
            }
        }.bind(this));
    };

    FormHandler.prototype.addAchievementHandler = function() {
        $('#emailInput').change(function() {
            console.log($('#emailInput').val());
            console.log(this.achievements.get($('#emailInput').val()));
            if (this.achievements.get($('#emailInput').val()) == 'yes')
                $('#achievementsOptions').removeClass('hidden');
            else {
                $('input[type=checkbox]').attr('checked', false);
                $('#achievementsOptions').addClass('hidden');
            }
        }.bind(this));
    };

    FormHandler.prototype.addSliderHandler = function() {
        var slider = $('#strengthLevel');
        slider.on('input change', function() {
            var rating = slider[0].value;
            if (rating < 30) {
                $('label[for=strengthLevel]').text(rating).css('color', 'green');
            } else if (rating >= 30 && rating < 70) {
                $('label[for=strengthLevel]').text(rating).css('color', 'yellow');
            } else {
                $('label[for=strengthLevel]').text(rating).css('color', 'red');
            }
        });
    };


    App.FormHandler = FormHandler;
    window.App = App;
})(window);
