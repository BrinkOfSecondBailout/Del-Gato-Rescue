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
    backButtonElement.src = 'assets/back-button3.png';
    backButtonElement.alt = 'Go Back';
    backButtonElement.addEventListener('click', () => goBackToAllCats());

    const bottomBackButtonElement = backButtonElement.cloneNode(true);
    bottomBackButtonElement.addEventListener('click', () => goBackToAllCats());

    const catElement = document.createElement('div');
    catElement.classList.add('selected-cat');

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


    const catName = document.createElement('h2');
    catName.textContent = cat.name;

    const catDescription = document.createElement('p');
    const catTagLine = document.createElement('h4');
    catTagLine.textContent = `${cat.breeds.primary} • ${cat.contact.address.city}, ${cat.contact.address.state}`;
    catDescription.textContent = `${cat.age} •  ${cat.gender} • ${cat.size} • ${cat.colors.primary}`;

    const allTags = cat.tags;
    const catCharacters = document.createElement('h5');
    catCharacters.classList.add('all-tags')
    if(allTags.length > 0) {
        const tagString = allTags.join(' | ');
        catCharacters.textContent = tagString;
    } else {
        catCharacters.textContent = 'No tags available yet';
    }

    const catBioContainer = document.createElement('div');
    catBioContainer.classList.add('cat-bio');

    const catBio = document.createElement('p');

    const petfinderDiv = document.createElement('div');
    petfinderDiv.classList.add('petfinder');
    const petfinderLogo = document.createElement('img');
    petfinderLogo.src = 'assets/petfinder.png';
    petfinderLogo.alt = 'Petfinder Logo';
    
    const catLink = document.createElement('a');
    catLink.href = cat.url;
    catLink.target = '_blank';
    catLink.textContent = `full description here on`;
    
    petfinderDiv.appendChild(catLink);
    petfinderDiv.appendChild(petfinderLogo);

    catBio.innerHTML = `${cat.description}`;
    catBioContainer.appendChild(catBio);

    const catCriteriasDiv = document.createElement('div');
    catCriteriasDiv.classList.add('cat-criterias');
    const catCriterias = cat.attributes;

    const checkBoxes = [];
    if(catCriterias.shots_current) {
        checkBoxes.push('Vaccinations up to date')
    }
    if(catCriterias.spayed_neutered) {
        checkBoxes.push('Spayed/Neutered')
    }
    if(catCriterias.house_trained) {
        checkBoxes.push('House trained')
    }
    if(catCriterias.special_needs) {
        checkBoxes.push('Special needs')
    };

    const checkBoxesString = checkBoxes.join(' | ');
    const checkBoxesTextContent = document.createElement('h4');
    checkBoxesTextContent.textContent = checkBoxesString;
    catCriteriasDiv.appendChild(checkBoxesTextContent);


    const catFormDiv = document.createElement('div');
    catFormDiv.classList.add('cat-form');
    const catFormIcon = document.createElement('img');
    catFormIcon.src = 'assets/application-form.png';
    catFormIcon.alt = 'Application Form';
    const catFormLink = document.createElement('a')
    catFormLink.textContent = 'Interested? Fill out a form!'
    catFormLink.href = 'https://form.jotform.com/212117959297062';
    catFormLink.target = '_blank';
    catFormDiv.appendChild(catFormLink);
    catFormDiv.appendChild(catFormIcon);


    const catTagContainer = document.createElement('div');
    catTagContainer.classList.add('cat-tagline');
    catTagContainer.appendChild(catTagLine);
    catTagContainer.appendChild(catDescription);

    catElement.appendChild(catName);
    catElement.appendChild(catTagContainer);
    catElement.appendChild(slideShowContainer);
    catElement.appendChild(catCharacters);
    catElement.appendChild(catBioContainer);
    catElement.appendChild(petfinderDiv);
    catElement.appendChild(catCriteriasDiv);
    catElement.appendChild(catFormDiv);

    oneCatDisplay.innerHTML = '';
    oneCatDisplay.appendChild(backButtonElement);
    oneCatDisplay.appendChild(catElement);
    oneCatDisplay.appendChild(bottomBackButtonElement);
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

