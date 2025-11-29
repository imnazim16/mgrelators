// Mobile menu toggle
document
  .querySelector(".mobile-menu-btn")
  .addEventListener("click", function (e) {
    const { classList } = e.target;
    document
      .querySelector(".nav-container")
      .classList.toggle("mobile-menu-open");
    classList.toggle("fa-bars");
    classList.toggle("fa-xmark");
  });

const counters = document.querySelectorAll(".counter");
let started = false; // to prevent re-triggering

function animateCounters() {
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const increment = target / 200; // adjust speed

    let count = 0;
    const updateCounter = () => {
      count += increment;
      if (count < target) {
        counter.textContent = Math.ceil(count);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + "+"; // add plus sign
      }
    };
    updateCounter();
  });
}

document.getElementById("year").textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".filter-tabs a");
  const cards = document.querySelectorAll(".property-card");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const itemsPerPage = 6;
  let currentCategory = "newlaunch";
  let currentCount = itemsPerPage;

  // Function to filter cards
  function filterCards(category) {
    currentCategory = category;
    currentCount = itemsPerPage;

    let matchedCards = Array.from(cards).filter(
      (card) => category === "all" || card.classList.contains(category)
    );

    // Hide all first
    cards.forEach((c) => (c.style.display = "none"));

    // Show only first N
    matchedCards
      .slice(0, currentCount)
      .forEach((c) => (c.style.display = "block"));

    // Toggle Load More
    loadMoreBtn.style.display =
      matchedCards.length > itemsPerPage ? "inline-block" : "none";
  }

  // Function for load more
  function loadMore() {
    let matchedCards = Array.from(cards).filter(
      (card) =>
        currentCategory === "all" || card.classList.contains(currentCategory)
    );

    matchedCards
      .slice(0, currentCount + itemsPerPage)
      .forEach((c) => (c.style.display = "block"));
    currentCount += itemsPerPage;

    if (currentCount >= matchedCards.length) {
      loadMoreBtn.style.display = "none";
    }
  }

  // Tab click
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const target = tab.getAttribute("href").substring(1);
      filterCards(target);
    });
  });

  // Load More click
  loadMoreBtn.addEventListener("click", loadMore);

  // Init with "all"
  filterCards("newlaunch");
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); // stop default form submission

  let isValid = true;

  // Name
  const name = document.getElementById("name");
  if (name.value.trim().length < 3) {
    setError(name, "Name must be at least 3 characters");
    isValid = false;
  } else {
    clearError(name);
  }

  // Email
  const email = document.getElementById("email");
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailPattern.test(email.value.trim())) {
    setError(email, "Enter a valid email address");
    isValid = false;
  } else {
    clearError(email);
  }

  // Phone
  const phone = document.getElementById("phone");
  const phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(phone.value.trim())) {
    setError(phone, "Phone must be 10 digits");
    isValid = false;
  } else {
    clearError(phone);
  }
  phone.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "");
  });

  // Message
  const message = document.getElementById("message");
  if (message.value.trim().length < 80) {
    setError(message, "Message must be at least 80 characters");
    isValid = false;
  } else {
    clearError(message);
  }

  // If valid
  if (isValid) {
    // document.getElementById("success").textContent =
    //   "Form submitted successfully!";
    // //alert("Form submitted successfully!");
    // this.reset();
    const formData = new FormData();
    formData.append("name", name.value.trim());
    formData.append("email", email.value.trim());
    formData.append("phone", phone.value.trim());
    formData.append("message", message.value.trim());

    fetch("/contact_mail.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("success").textContent = data;
        // Optionally reset the form only on success
        this.reset();
      })
      .catch((error) => {
        document.getElementById("success").textContent =
          "There was an error submitting the form.";
      });
  }
});

// Helper functions
function setError(input, message) {
  const parent = input.parentElement;
  parent.querySelector(".error").innerText = message;
  input.style.borderColor = "red";
}
function clearError(input) {
  const parent = input.parentElement;
  parent.querySelector(".error").innerText = "";
  input.style.borderColor = "#ccc";
}

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("#navbar a");
// Scrollspy (add active class on scroll)
window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 160; // offset for sticky nav
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});
document.querySelectorAll("#navbar a, .enq-form a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 160, // adjust offset for sticky navbar
      behavior: "smooth",
    });
    document
      .querySelector(".nav-container")
      .classList.remove("mobile-menu-open");
    const menuBtn = document.querySelector(".mobile-menu-btn i");
    menuBtn.classList.add("fa-bars");
    menuBtn.classList.remove("fa-xmark");
  });
});
