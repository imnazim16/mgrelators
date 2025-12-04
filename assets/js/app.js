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
      top: targetSection.offsetTop - 50, // adjust offset for sticky navbar
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

// content reveal on scroll
// Content for Terms and Conditions
const termsContent = `
    <h3>Last Updated: December 2025</h3>
    <p>Welcome to M&G Realtors (“we,” “our,” “us”). By accessing or using our website, services, advertisements, or submitting your information through any platform, you agree to the following Terms & Conditions. Please read them carefully.</p>
    <h3>1. Acceptance of Terms</h3>
    <p>By engaging with M&G Realtors—through website, calls, SMS, WhatsApp, social media, or lead forms—you agree to comply with these Terms & Conditions and our Privacy Policy.</p>
    <p>If you do not agree, please do not use our services.</p>
    <h3>2. Nature of Services</h3>
    <p>M&G Realtors operates as a real estate marketing and consulting firm based in Gurugram. We provide:</p>
    <ul>
    <li>Project information</li>
    <li>Site visits</li>
    <li>Pricing details</li>
    <li>Developer updates</li>
    <li>Property consultation</li>
    <li>Lead assistance and follow-up</li>
    </ul>
    <p>We do not guarantee property availability, pricing stability, or future appreciation.</p>
    
    <h3>3. Accuracy of Information</h3>
    <p>We strive to provide correct and updated information. However:</p>
    <ul>
    <li>Project details, pricing, floor plans, offers, and availability are <strong>subject to change</strong> at the sole discretion of the developer.</li>
    <li>Any visuals, images, brochures, and videos are for <strong>illustrative purposes only.</strong></li>
    <li>We are not liable for any inaccuracies arising from third-party sources or developer changes.</li>
    </ul>
    <p>Please verify all details directly during your site visit before making any purchase decision.</p>
    
    <h3>4. User Responsibilities</h3>
    <p>By submitting your information, you agree that:</p>
    <ul>
    <li>All details provided by you are accurate.</li>
    <li>You authorize M&G Realtors to contact you via <strong>phone, SMS, WhatsApp, email, and retargeting ads.</strong></li>
    <li>You will not misuse the website or services in any unlawful manner.</li>
    </ul>
    
    <h3>5. Communication Consent (TRAI & DND Compliance)</h3>
    <p>By filling out any form or contacting us, you consent to receive:</p>
    <ul>
    <li>Calls</li>
    <li>WhatsApp messages</li>
    <li>Emails</li>
    <li>SMS notifications</li>
    </ul>
    <p>This consent applies even if your number is registered under DND (Do Not Disturb).</p>
    <p>If you wish to opt out, you may contact us at <a href="mailto:info@mg-realtors.in">info@mg-realtors.in</a>.</p>
    
    <h3>6. Limitation of Liability</h3>
    <p>M&G Realtors is not <strong>liable for:</strong></p>
    <ul>
    <li>Developer decisions, delays, construction progress, or project changes</li>
    <li>Pricing fluctuations</li>
    <li>Booking cancellations by the developer</li>
    <li>Losses, damages, or financial decisions made solely on provided information</li>
    </ul>
    <p>Your final decision to buy/sell/rent property is <strong>your responsibility.</strong></p>

    <h3>7. Third-Party Links</h3>
    <p>Our website or messages may contain links to:</p>
    <ul>
    <li>Developer websites</li>
    <li>Real estate portals</li>
    <li>External resources</li>
    </ul>
    <p>We are not liable for content or policies of third-party websites.</p>

    <h3>8. No Guarantee of Investment Returns</h3>
    <p>Real estate markets are subject to risks.</p>
    <p>We do not promise or guarantee:</p>
    <ul>
    <li>Rental returns</li>
    <li>Appreciation</li>
    <li>Future property value</li>
    <li>Guaranteed ROI claims</li>
    </ul>
    <p>Any investment decision must be made after independent research.</p>

    <h3>9. Intellectual Property Rights</h3>
    <p>All content on our website—including text, graphics, images, videos, and branding—is owned by M&G Realtors or its partners.</p>
    <p>You may not copy, distribute, reproduce, or modify any content without prior written consent.</p>

    <h3>10. Booking & Payments</h3>
    <p>Any booking, expression of interest (EOI), or payment:</p>
    <ul>
    <li>Is directly between the customer and the developer</li>
    <li>Is governed by the developer’s terms</li>
    <li>Is not handled or controlled by M&G Realtors unless explicitly stated</li>
    </ul>
    <p>We do not collect any booking amount unless authorized in writing.</p>

    <h3>11. Indemnification</h3>
    <p>You agree to indemnify and hold M&G Realtors harmless from any claims, liabilities, damages, or expenses arising out of:</p>
    <ul>
    <li>Your use of our website/services</li>
    <li>Your actions or decisions based on provided information</li>
    </ul>

    <h3>12. Termination of Services</h3>
    <p>We reserve the right to:</p>
    <ul>
    <li>Suspend your access</li>
    <li>Refuse service</li>
    <li>Discontinue communication</li>
    </ul>
    <p>at any time, without prior notice, for misuse or violation of these Terms.</p>

    <h3>13. Governing Law</h3>
    <p>These Terms & Conditions are governed by the laws of India and the jurisdiction of Gurugram, Haryana.</p>

    <h3>14. Changes to Terms</h3>
    <p>We may update these Terms & Conditions at any time.</p>
    <p>Updates will be posted with a revised “Last Updated” date.</p>

    <h3>15. Contact Us</h3>
    <p>For any questions related to these Terms:</p>
    <p>
      <strong>M&G Realtors</strong><br/>
      Gurugram, Haryana<br/>
      Email: info@mg-realtors.in<br/>
      Phone: 8377955050
    </p>
`;

// Content for Privacy Policy
const privacyContent = `
    <h3>Last Updated: December 2025</h3>
    <p>M&G Realtors (“we,” “our,” “us”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you interact with us through our website, social media, advertisements, or any other services.</p>
    <p>By using our services, you agree to the practices described in this policy.</p>
    
    <h3>1. Information We Collect</h3>
    <h4>A. Personal Information</h4>
    <p>We may collect the following personal details when you fill out a form, contact us, or engage with our ads:</p>
    <ul>
    <li>Full Name</li>
    <li>Phone Number</li>
    <li>Email Address</li>
    <li>City/Location</li>
    <li>Budget Preference</li>
    <li>Property Requirements (e.g., BHK, location, project type)</li>
    </ul>
    <h4>B. Automatically Collected Information</h4>
    <p>When you visit our website or landing pages, we may automatically collect:</p>
    <ul>
    <li>IP address</li>
    <li>Device information</li>
    <li>Browser type</li>
    <li>Pages you visited</li>
    <li>Cookies & tracking pixel data (Meta Pixel, Google Analytics, etc.)</li>
    </ul>

    <h4>C. Third-Party Data</h4>
    <p>If you interact with our ads on platforms like Meta (Facebook/Instagram), Google, or real-estate portals, those platforms may share lead information with us.</p>
    
    <h3>2. How We Use Your Information</h3>
    <p>We use your information to:</p>
    <ul>
    <li>Contact you regarding real estate projects, offers, or inquiries</li>
    <li>Provide property recommendations based on your requirements</li>
    <li>Improve our services, website, and marketing performance</li>
    <li>Personalize ads and content</li>
    <li>Conduct remarketing and lookalike audience campaigns</li>
    <li>Maintain internal records and communication logs</li>
    </ul>
    <p>We do not sell or rent your personal data to third parties.</p>

    <h3>3. Sharing of Your Information</h3>
    <p>We may share information with:</p>
    <ul>
    <li>Real estate developers (only for the project you have inquired about)</li>
    <li>Marketing and advertising platforms (Meta, Google, SMS/email vendors)</li>
    <li>Authorized employees or sales partners who assist you</li>
    </ul>
    <p>All sharing is done strictly to fulfil your inquiry or improve service quality.</p>
    
    <h3>4. Cookies and Tracking Technologies</h3>
    <p>Our website and ads may use:</p>
    <ul>
    <li>Cookies</li>
    <li>Tracking pixels (Meta Pixel, Google Tag, etc.)</li>
    <li>Analytics tools</li>
    </ul>
    <p>These tools help us understand user behavior and optimize campaigns. You may disable cookies in your browser settings.</p>

    <h3>5. Data Security</h3>
    <p>We implement necessary technical and organizational measures to safeguard your data. However, no online transmission or storage method is 100% secure. We strive to protect your data but cannot guarantee absolute security.</p>

    <h3>6. Your Rights</h3>
    <p>You have the right to:</p>
    <ul>
    <li>Request access to your personal data</li>
    <li>Ask for correction or update</li>
    <li>Request deletion of your data</li>
    <li>Opt out of marketing or promotional messages</li>
    </ul>
    <p>To exercise these rights, email us at info@mg-realtors.in.</p>

    <h3>7. Data Retention</h3>
    <p>We retain your information only as long as needed to fulfil your inquiry, provide services, and comply with legal requirements.</p>

    <h3>8. Third-Party Links</h3>
    <p>Our website or messages may include links to third-party sites.</p>
    <p>We are not responsible for their privacy practices.</p>

    <h3>9. Children’s Privacy</h3>
    <p>Our services are not intended for individuals under the age of 18.</p>
    <p>We do not knowingly collect information from minors.</p>

    <h3>10. Updates to This Policy</h3>
    <p>We may update this Privacy Policy from time to time.</p>
    <p>Changes will be posted on our website with an updated “Last Updated” date.</p>

    <h3>11. Contact Us</h3>
    <p>For any questions about this Privacy Policy or your data, please contact:</p>
    <p>
      <strong>M&G Realtors</strong><br/>
      Gurugram, Haryana<br/>
      Email: info@mg-realtors.in<br/>
      Phone: 8377955050
    </p>
`;

// Get DOM elements
const termsLink = document.getElementById("terms-link");
const privacyLink = document.getElementById("privacy-link");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const closeModalBtn = document.getElementById("close-modal");

// Function to open modal with specific content
function openModal(title, content) {
  modalTitle.textContent = title;
  modalBody.innerHTML = content;
  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent scrolling
}

// Function to close modal
function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "auto"; // Re-enable scrolling
}

// Event listeners for links
termsLink.addEventListener("click", function (e) {
  e.preventDefault();
  openModal("Terms and Conditions – M&G Realtors", termsContent);
});

privacyLink.addEventListener("click", function (e) {
  e.preventDefault();
  openModal("Privacy Policy – M&G Realtors", privacyContent);
});

// Close modal when close button is clicked
closeModalBtn.addEventListener("click", closeModal);

// Close modal when clicking outside the content
modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});
