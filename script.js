// all function callbacks upon loading

document.addEventListener('DOMContentLoaded', function () {
    showSlides();
    
});


// for Navigation Links

document.addEventListener('DOMContentLoaded', function () {
    const scrollLinks = document.querySelectorAll('.scroll-link');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const topOffset = document.querySelector('.top-bar').offsetHeight;
                const targetPosition = targetElement.offsetTop - topOffset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});


// for Subscribe Form on Homepage

const subscribeForm = document.querySelector('.subscribe-form');

let subscribeEmail = document.getElementById('subscribe');

subscribeForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    let subscriptionData = {
        email: subscribeEmail.value,
    };

    let liveServerUrl = 'http://localhost:3000/subscribe';

    try {
        const response = await axios.post(liveServerUrl, subscriptionData);

        console.log(response.data);

        if (response.data === 'success') {
            alert('Thank you! You are now subscribed!');
            subscribeEmail.value = '';
        } else {
            alert('Something went wrong... please try again later');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong... please try again later');
    }
});


// for About Us Slideshow

let slideIndex = 0;

function showSlides() {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 4000);
}



// for Our Work categories

document.addEventListener('DOMContentLoaded', function () {
    const workLinks = document.querySelectorAll('.our-work-links a');
    const workSections = document.querySelectorAll('.our-work-flex');
    const placeHolder = document.querySelector('.our-work-placeholder')

    function hidePlaceholder() {
        placeHolder.style.display = 'none';
    }

    workLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);

            hidePlaceholder();

            workLinks.forEach(link => link.classList.remove('active'));

            this.classList.add('active');

            workSections.forEach(section => {
                section.style.display = 'none';
            });

            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'flex';
            }
        });
    });
});


// for Contact Us Form and Message Box

const contactForm = document.querySelector('.contact-form');

let inputName = document.getElementById('name');
let inputPhone = document.getElementById('phone');
let inputEmail = document.getElementById('email');
let inputAddress = document.getElementById('address');
let inputReason = document.getElementById('reason');
let inputMessage = document.getElementById('message');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    let formData = {
        name: inputName.value,
        phone: inputPhone.value,
        email: inputEmail.value,
        address: inputAddress.value,
        reason: inputReason.value,
        message: inputMessage.value,
    };

    let liveServerUrl = 'http://localhost:3000/contact';

    try {
        const response = await axios.post(liveServerUrl, formData);

        console.log(response.data);

        if(response.data === 'success') {
            alert('Email sent! Thank you for your inquiry!');
            inputName.value = '';
            inputPhone.value = '';
            inputEmail.value = '';
            inputAddress.value = '';
            inputReason.value = '';
            inputMessage.value = '';
        } else {
            alert('Something went wrong... please try again later');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong... please try again later');
    }
});


// for Petfinder section and Adoptable Kitties 

function showAllCats() {
    document.addEventListener('DOMContentLoaded', async function (e) {
        e.preventDefault();
        
        const adoptableKitties = document.querySelector('petfinder-content')
        let adoptCatsUrl = 'http://localhost:3000/cats';
        
        try {
            const response = await axios.get(adoptCatsUrl);
            const adoptableCats = response.data;

            console.log(adoptableCats);
        } catch (error) {
            console.error('Error fetching cats:', error.message);
        }
    })
}

showAllCats();


// Using XMLHttpRequest to send email

// const contactForm = document.querySelector('.contact-form')

// let inputName = document.getElementById('name');
// let inputPhone = document.getElementById('phone');
// let inputEmail = document.getElementById('email');
// let inputAddress = document.getElementById('address');
// let inputReason = document.getElementById('reason');
// let inputMessage = document.getElementById('message');

// contactForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     let formData = {
//         name: inputName.value,
//         phone: inputPhone.value,
//         email: inputEmail.value,
//         address: inputAddress.value,
//         reason: inputReason.value,
//         message: inputMessage.value,
//     }

//     let xhr = new XMLHttpRequest();
//     xhr.open('POST', 'http://localhost:3000/contact');
//     xhr.setRequestHeader('content-type', 'application/json');
//     xhr.onload = function() {
//         console.log(xhr.responseText);

//         if(xhr.responseText == 'success') {
//             alert('Email sent! Thank you for your inquiry!');
//             inputName.value = '';
//             inputPhone.value = '';
//             inputEmail.value = '';
//             inputAddress.value = '';
//             inputReason.value = '';
//             inputMessage.value = '';
//         } else {
//             alert('Something went wrong... please try again later');
//         }
//     }

//     xhr.send(JSON.stringify(formData));

// })


// Using XMLHttpRequest to send email to subscriber's list

// const subscribeForm = document.querySelector('.subscribe-form')

// let subscribeEmail = document.getElementById('subscribe');

// subscribeForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     let subscriptionData = {
//         email: subscribeEmail.value
//     }

//     let xhr = new XMLHttpRequest();
//     xhr.open('POST', 'http://localhost:3000/subscribe');
//     xhr.setRequestHeader('content-type', 'application/json');
//     xhr.onload = function() {
//         console.log(xhr.responseText);

//         if(xhr.responseText == 'success') {
//             alert('Thank you! You are now subscribed!');
//             subscribeEmail.value = '';
//         } else {
//             alert('Something went wrong... please try again later');
//         }
//     }

//     xhr.send(JSON.stringify(subscriptionData));
// })






