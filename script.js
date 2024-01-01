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

// Show one cat when clicked on
const oneCatDisplay = document.querySelector('.one-cat');

function showOneCat(cat) {
    const adoptableKitties = document.querySelector('.all-cats-wrapper');

    adoptableKitties.innerHTML = '';

    const backButtonElement = document.createElement('img');
    backButtonElement.classList.add('back-button');
    backButtonElement.src = 'assets/back-button2.png';
    backButtonElement.alt = 'Go Back';
    backButtonElement.addEventListener('click', () => goBackToAllCats());

    const selectedCatElement = document.createElement('div');
    selectedCatElement.classList.add('selected-cat');

    const prevButton = document.createElement('img');
    prevButton.src = "assets/previous.png";
    prevButton.alt = "previous";
    prevButton.classList.add('prev');

    const nextButton = document.createElement('img');
    nextButton.src = "assets/next.png";
    nextButton.alt = "next";
    nextButton.classList.add('next');


    const slideShowContainer = document.createElement('div');
    slideShowContainer.appendChild(prevButton);
    slideShowContainer.classList.add('cat-slideshow-container');

    // console.log(cat)
    
    cat.photos.forEach((photo, index) => {
        const slide = document.createElement('div');
        slide.classList.add('cat-slide');
        slide.style.display = index === 0 ? 'block' : 'none';

        const slideImage = document.createElement('img');
        slideImage.src = photo.medium;
        slideImage.alt = cat.name;

        slide.appendChild(slideImage);
        slideShowContainer.appendChild(slide);
    })

    slideShowContainer.appendChild(nextButton);

    let currentIndex = 0;

    function showSlide(index) {
        const slides = document.querySelectorAll('.cat-slide');
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cat.photos.length) % cat.photos.length;
        showSlide(currentIndex);
    })

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cat.photos.length;
        showSlide(currentIndex);
    })


    const selectedCatName = document.createElement('h2');
    selectedCatName.textContent = cat.name;

    const selectedCatDescription = document.createElement('p');
    const selectedCatTagLine = document.createElement('h4');
    selectedCatTagLine.textContent = `${cat.breeds.primary} • ${cat.contact.address.city}, ${cat.contact.address.state}`;
    selectedCatDescription.textContent = `${cat.age} •  ${cat.gender} • ${cat.size} • ${cat.colors.primary}`;

    const selectedCatBioContainer = document.createElement('div');
    selectedCatBioContainer.classList.add('cat-bio');

    const selectedCatBio = document.createElement('p');
    selectedCatBio.textContent = `${cat.description}`;

    const selectedCatTagContainer = document.createElement('div');
    selectedCatTagContainer.classList.add('cat-tagline');
    selectedCatTagContainer.appendChild(selectedCatTagLine);
    selectedCatTagContainer.appendChild(selectedCatDescription);

    selectedCatElement.appendChild(selectedCatName);
    selectedCatElement.appendChild(selectedCatTagContainer);
    selectedCatElement.appendChild(slideShowContainer);
    selectedCatElement.appendChild(selectedCatBio);

    oneCatDisplay.innerHTML = '';
    oneCatDisplay.appendChild(backButtonElement);
    oneCatDisplay.appendChild(selectedCatElement);
}

// Go Back Button to Return to All Cats

function goBackToAllCats() {
    oneCatDisplay.innerHTML = '';
    showAllCats();
}


// Display all cats from Petfinder

// This will store all cats generated in order to load faster when users navigate
let cachedCats = null;

async function showAllCats() {
    const allCatsContainer = document.querySelector('.all-cats-wrapper')

    let adoptCatsUrl = 'http://localhost:3000/cats';
    
    try {

        if (cachedCats !== null && cachedCats.length > 0) {
            console.log('cached');
            displayCats(allCatsContainer, cachedCats);
        } else {
            const response = await axios.get(adoptCatsUrl);
            const adoptableCats = response.data;
    
            cachedCats = adoptableCats;
    
            displayCats(allCatsContainer, adoptableCats);
        }


    } catch (error) {
        console.error('Error fetching cats:', error.message);
    }
}

// Function to show all cats

function displayCats(container, cats) {
    container.innerHTML = '';

    cats.forEach(cat => {
        const catElement = document.createElement('div');
        catElement.classList.add('cat');
        
        const catImage = document.createElement('img');
        catImage.classList.add('cat-picture');

        catImage.src = cat.photos.length > 0 ? cat.photos[0].medium : 'assets/no-image.jpg';
        catImage.alt = cat.name;

        const catImageLink = document.createElement('a');
        catImageLink.appendChild(catImage);

        catImageLink.addEventListener('click', () => showOneCat(cat));

        const catName = document.createElement('a');
        catName.textContent = cat.name;

        catName.addEventListener('click', () => showOneCat(cat));

        const catDescription = document.createElement('h4');
        catDescription.textContent = `${cat.age} • ${cat.breeds.primary}`;

        catElement.appendChild(catImageLink);
        catElement.appendChild(catName);
        catElement.appendChild(catDescription);

        container.appendChild(catElement);
    });
};

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






