document.addEventListener("DOMContentLoaded", () => {
    "use strict"

    //Принимает два параметра функцию и опцию '0,7'
    window.onload = function () {
        document.querySelector('.preloader').classList.add("preloader-remove");
        document.querySelector('.preloader_con').classList.add("preloader-remove");
    };

    let burger = document.querySelector('.menu');
    let navigation = document.querySelector('.navigation_item');
    let header = document.querySelector('header');
    let number = document.querySelector('.number');

    burger.addEventListener('change', () => {
        event.preventDefault();
        navigation.classList.toggle('active');
        number.classList.toggle('active');
        burger.classList.toggle('active');
        header.classList.toggle('active')
        navigation.childNodes.forEach(e => {
            e.addEventListener('click', () => {
                navigation.classList.remove('active');
                number.classList.remove('active');
                burger.classList.remove('active');
                checker.checked = false;
                header.classList.remove('active')
            })
        });
    })

    var splide = new Splide('.splide', {
        type: 'loop',
        height: 700,
        // start:1,
        focus: 'right',
        autoWidth: true,
        breakpoints: {
            768: {
                height: 500,
            },

            600: {
                height: 400,
                arrows: false
            }
        }

    });

    new WOW().init();

    splide.mount();

    $(document).ready(function () {
        $('.splide__slide').magnificPopup({
            type: 'image',
            zoom: {
                enabled: true,

                duration: 300,
                easing: 'ease-in-out',
                opener: function (openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });
    });

    const items = document.querySelectorAll(".accordion button");

    function toggleAccordion() {
        const itemToggle = this.getAttribute('aria-expanded');

        for (let i = 0; i < items.length; i++) {
            items[i].setAttribute('aria-expanded', 'false');
        }

        if (itemToggle == 'false') {
            this.setAttribute('aria-expanded', 'true');
        }
    }

    items.forEach(item => item.addEventListener('click', toggleAccordion));
    if (window.innerWidth <= 500) {
        let Qtitle = document.querySelector('.question .title');
        Qtitle.textContent = "FAQ";
    }

    // --МАСКА для обратной связи name tel 
    let phoneInputs = document.querySelectorAll('input[data-tel-input]');
    let nameInputs = document.querySelector('input[data-name-input]');
    let btnOrder = document.querySelector('#order_btn');

    console.log(phoneInputs);

    //Просто добавь input > [data-tel-input] и type='tel' и подключи этот скрипт и все !!!
    var getInputNumbersValue = function (input) {
        // Return stripped input value — just numbers
        return input.value.replace(/\D/g, '');
    }

    var onPhonePaste = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input);
        var pasted = e.clipboardData || window.clipboardData;
        examination();
        if (pasted) {
            var pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
                // formatting will be in onPhoneInput handler
                input.value = inputNumbersValue;
                return;
            }
        }
    }

    var onPhoneInput = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            selectionStart = input.selectionStart,
            formattedInputValue = "";

        if (!inputNumbersValue) {
            return input.value = "";
        }
        examination();

        if (input.value.length != selectionStart) {
            // Editing in the middle of input, not last symbol
            if (e.data && /\D/g.test(e.data)) {
                // Attempt to input non-numeric symbol
                input.value = inputNumbersValue;
            }
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
            var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
            formattedInputValue = input.value = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    }
    let examination = () => {
        if (nameInputs.value.length >= 4 && phoneInput.value.length >= 17) {
            btnOrder.classList.remove('disable');
            btnOrder.disabled = false;
        } else {
            btnOrder.classList.add('disable');
            btnOrder.disabled = true;
        }
    }
    var onPhoneKeyDown = function (e) {
        // Clear input after remove last symbol
        examination();
        var inputValue = e.target.value.replace(/\D/g, '');

        if (e.keyCode == 8 && inputValue.length == 1) {
            e.target.value = "";
        }
    }
    for (var phoneInput of phoneInputs) {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput, false);
        phoneInput.addEventListener('paste', onPhonePaste, false);
        nameInputs.addEventListener('keydown', examination);
        nameInputs.addEventListener('input', examination, false);
        nameInputs.addEventListener('paste', examination, false);
    }

    let btnInfo = document.querySelector('.btn_info');
    let mapInfo = document.querySelector('.map_info');

    btnInfo.addEventListener('click', () => {
        mapInfo.classList.toggle('active');
        btnInfo.classList.toggle('active');
    })

})