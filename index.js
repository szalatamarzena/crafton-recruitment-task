//stikcy nav
const throttle = (func, delay) => {
    let timerId;
    return () => {
        if (timerId) {
            return;
        }

        timerId = setTimeout(function () {
            func();
            timerId = undefined;
        }, delay);
    };
};

document.addEventListener('DOMContentLoaded', () => {
    const navNode = document.querySelector('nav')
    const headerNode = document.querySelector('header')
    const logo = document.querySelector('.nav_logo')

    const handleScroll = () => {
        if (window.pageYOffset > headerNode.offsetHeight - 200) {
            navNode.style.backgroundColor = "rgba(1, 1, 1, 0.6)"
            logo.style.transform = "scale(0.8)"
            navNode.style.padding = "0"
        } else {
            navNode.style.backgroundColor = "rgba(1, 1, 1, 0)";
            logo.style.transform = "scale(1)"
            navNode.style.padding = "1rem 0"
        }
    };

    window.addEventListener("scroll", throttle(handleScroll, 100), {
        passive: true
    });
});


//mobile nav
document.addEventListener('DOMContentLoaded', () => {
    const navNode = document.querySelector('nav')
    const navItems = document.querySelector('.nav_items')
    const navIcon = document.querySelector('.nav_item_mobile-icon')

    navIcon.addEventListener('click', () => {
        navNode.classList.toggle('active')
        navItems.classList.toggle('active')
    })
});

//slider
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider')
    const btnPrev = document.querySelector('.prev')
    const btnNext = document.querySelector('.next')
    const items = document.querySelectorAll('.slider_item')
    const dots = document.querySelectorAll('.slider_dot')
    const whiteBtnPrev = document.querySelector('.else-item_prev_arrow')
    const yellowBtnPrev = document.querySelector('.last-item_prev_arrow')
    const whiteBtnNext = document.querySelector('.else-item_next_arrow')
    const yellowBtnNext = document.querySelector('.last-item_next_arrow')
    console.log(whiteBtnNext)
    let position = 0
    let currentPosition = 0

    showSlide(slider, 0, 0)

    function showSlide(elem, n) {
        if (currentPosition + n >= 0 && currentPosition + n < items.length) {
            currentPosition += n;
            elem.style.transform = `translateX(-${100 * currentPosition}%)`;
            dots.forEach((item) => item.classList.remove("active"));
            dots[currentPosition].classList.add("active");
        }
        if (currentPosition === 0) {
            whiteBtnPrev.classList.replace('enabled', 'disabled')
            yellowBtnPrev.classList.replace('disabled', 'enabled')
        } else {
            yellowBtnPrev.classList.replace('enabled', 'disabled')
            whiteBtnPrev.classList.replace('disabled', 'enabled')
        }

        if (currentPosition + n === items.length) {
            whiteBtnNext.classList.replace('enabled', 'disabled')
            yellowBtnNext.classList.replace('disabled', 'enabled')
        } else {
            yellowBtnNext.classList.replace('enabled', 'disabled')
            whiteBtnNext.classList.replace('disabled', 'enabled')
        }
    }

    btnNext.addEventListener("click", function () {
        showSlide(slider, 1);
    })

    btnPrev.addEventListener("click", function () {
        showSlide(slider, -1);
    })

    for (let i = 0; i < items.length; i++) {
        dots[i].addEventListener("click", function () {
            currentPosition = i;
            slider.style.transform = `translateX(-${100 * currentPosition}%)`;

            dots.forEach((item) => item.classList.remove("active"));
            dots[currentPosition].classList.add("active");
        })
    }
})
document.addEventListener('DOMContentLoaded', () => {
    const inputFields = document.querySelectorAll('input, textarea')
    for (let i = 0; i < inputFields.length; i++) {
        if (inputFields[i].value) {
            inputFields[i].classList.add('has-text')
            inputFields[i].classList.add('dirty')
        }

        inputFields[i].addEventListener('focusout', (e) => {
            inputFields[i].classList.add('dirty')
            if (e.target.value) {
                inputFields[i].classList.add('has-text')
            } else {
                inputFields[i].classList.remove('has-text')
            }
        })
    }
})
//form
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('#contact_form')
    const errorMessage = contactForm.querySelector('.error_message')

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault()
        errorMessage.innerHTML = ''
        const data = {}

        const formData = new FormData(contactForm)
        for (let [key, value] of formData.entries()) {
            data[key] = value
        }

        fetch('test.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application-json'
            },
            body: JSON.stringify(data)
        }).catch(() => {
            errorMessage.innerHTML = 'Błąd podczas wysyłania formularza'
        })
    })
})

//footer
document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelectorAll('.footer_box_item')
    for (let i = 0; i < title.length; i++) {
        const onClick = () => {
            const listItems = document.querySelectorAll('.footer_box_item_list')
            for (let j = 0; j < listItems.length; j++) {
                if (i === j) {
                    listItems[j].classList.toggle('active')
                }
            }
        }
        title[i].addEventListener('click', onClick)
        title[i].addEventListener('keydown', e => { if (e.keyCode === 13) onClick() })
    }
});