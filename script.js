const signupModal = document.getElementById("signupModal");
const signinModal = document.getElementById("signinModal");

const openSignup = document.getElementById("openSignup");
const openSignin = document.getElementById("openSignin");

const closeSignup = document.getElementById("closeSignup");
const closeSignin = document.getElementById("closeSignin");

const switchToSignin = document.getElementById("switchToSignin");
const switchToSignup = document.getElementById("switchToSignup");

const signupForm = document.getElementById("signupForm");
const signinForm = document.getElementById("signinForm");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

function showSignup() {
    signinModal.classList.remove("active");
    signupModal.classList.add("active");
}

function showSignin() {
    signupModal.classList.remove("active");
    signinModal.classList.add("active");
}

function closeModals() {
    signupModal.classList.remove("active");
    signinModal.classList.remove("active");
}

openSignup.addEventListener("click", showSignup);

openSignin.addEventListener("click", showSignin);

closeSignup.addEventListener("click", () => {
    signupModal.classList.remove("active");
});

closeSignin.addEventListener("click", () => {
    signinModal.classList.remove("active");
});

switchToSignin.addEventListener("click", showSignin);

switchToSignup.addEventListener("click", showSignup);

signupModal.addEventListener("click", event => {
    if (event.target === signupModal) {
        signupModal.classList.remove("active");
    }
});

signinModal.addEventListener("click", event => {
    if (event.target === signinModal) {
        signinModal.classList.remove("active");
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeModals();
    }
});

function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

signupForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupConfirm").value;

    if (password.length < 6) {
        showToast("Password must contain at least 6 characters.");
        return;
    }

    if (password !== confirmPassword) {
        showToast("Passwords do not match.");
        return;
    }

    const user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("staynearUser", JSON.stringify(user));

    signupForm.reset();
    signupModal.classList.remove("active");

    showToast("Account created successfully!");
});

signinForm.addEventListener("submit", event => {
    event.preventDefault();

    const email = document.getElementById("signinEmail").value.trim();
    const password = document.getElementById("signinPassword").value;

    const savedUser = localStorage.getItem("staynearUser");

    if (!savedUser) {
        showToast("No account found. Please sign up first.");
        return;
    }

    const user = JSON.parse(savedUser);

    if (email === user.email && password === user.password) {
        signinForm.reset();
        signinModal.classList.remove("active");

        showToast(`Welcome back, ${user.name}!`);
    } else {
        showToast("Invalid email or password.");
    }
});

const guestButton = document.getElementById("guestButton");

guestButton.addEventListener("click", () => {
    const guests = prompt("How many guests?", "2");

    if (guests && Number(guests) > 0) {
        const count = Number(guests);

        guestButton.textContent =
            `${count} ${count === 1 ? "Guest" : "Guests"}`;
    }
});

const searchButton = document.getElementById("searchButton");
const locationInput = document.getElementById("locationInput");
const checkIn = document.getElementById("checkIn");
const checkOut = document.getElementById("checkOut");

searchButton.addEventListener("click", () => {
    const location = locationInput.value.trim();

    if (location === "") {
        showToast("Please enter a destination.");
        locationInput.focus();
        return;
    }

    if (
        checkIn.value &&
        checkOut.value &&
        checkOut.value < checkIn.value
    ) {
        showToast("Check-out must be after check-in.");
        return;
    }

    showToast(`Searching stays in ${location}...`);
});

const favoriteButtons = document.querySelectorAll(".favorite");

favoriteButtons.forEach(button => {
    button.addEventListener("click", event => {
        event.stopPropagation();

        if (button.textContent.trim() === "♡") {
            button.textContent = "♥";
            button.style.background = "white";
            button.style.color = "#ff5270";

            showToast("Added to your favourites.");
        } else {
            button.textContent = "♡";
            button.style.background = "rgba(255,255,255,0.22)";
            button.style.color = "white";

            showToast("Removed from your favourites.");
        }
    });
});

const purposeCards = document.querySelectorAll(".purpose-card");

purposeCards.forEach(card => {
    card.addEventListener("click", () => {
        const title = card.querySelector("h3").textContent;
        showToast(`Showing stays for ${title}.`);
    });
});

const exploreButton = document.querySelector(".outline-button");

exploreButton.addEventListener("click", () => {
    document.getElementById("stays").scrollIntoView({
        behavior: "smooth"
    });
});

const discoverButton = document.querySelector(".white-button");

discoverButton.addEventListener("click", () => {
    document.getElementById("explore").scrollIntoView({
        behavior: "smooth"
    });
});

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(10,10,10,0.72)";
    } else {
        navbar.style.background = "rgba(15,15,15,0.25)";
    }
});

const today = new Date().toISOString().split("T")[0];

checkIn.min = today;
checkOut.min = today;

checkIn.addEventListener("change", () => {
    checkOut.min = checkIn.value;
});