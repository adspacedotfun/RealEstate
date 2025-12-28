// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileMenu = document.getElementById("mobileMenu");

mobileMenuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  const icon = mobileMenuToggle.querySelector("i");
  if (mobileMenu.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
    mobileMenu.classList.remove("active");
    const icon = mobileMenuToggle.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// Search Tab Switching
const searchTabs = document.querySelectorAll(".search-tab");
const searchInput = document.getElementById("searchInput");

searchTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    searchTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    const tabType = tab.getAttribute("data-tab");
    if (tabType === "buy") {
      searchInput.placeholder =
        "Enter an address, neighborhood, city, or ZIP code";
    } else {
      searchInput.placeholder = "Search apartments, condos, and more";
    }
  });
});

// Search Functionality
const searchBtn = document.querySelector(".search-btn");
const searchInputField = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {
  const query = searchInputField.value.trim();
  if (query) {
    alert(`Searching for: ${query}`);
    // In a real application, this would navigate to search results
  }
});

searchInputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

// Filter Buttons
const filterButtons = document.querySelectorAll(".filter-btn");
const propertiesGrid = document.getElementById("propertiesGrid");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");
    filterProperties(filter);
  });
});

// Property Data
const properties = [
  {
    id: 1,
    price: "$450,000",
    address: "123 Main St, San Francisco, CA 94102",
    beds: 3,
    baths: 2,
    sqft: "1,850",
    type: "house",
    badge: "New",
  },
  {
    id: 2,
    price: "$325,000",
    address: "456 Oak Ave, Los Angeles, CA 90001",
    beds: 2,
    baths: 2,
    sqft: "1,200",
    type: "condo",
    badge: "Hot",
  },
  {
    id: 3,
    price: "$280,000",
    address: "789 Pine Rd, San Diego, CA 92101",
    beds: 2,
    baths: 1,
    sqft: "950",
    type: "townhouse",
    badge: null,
  },
  {
    id: 4,
    price: "$1,200/mo",
    address: "321 Elm St, Seattle, WA 98101",
    beds: 1,
    baths: 1,
    sqft: "750",
    type: "apartment",
    badge: "New",
  },
  {
    id: 5,
    price: "$550,000",
    address: "654 Maple Dr, Portland, OR 97201",
    beds: 4,
    baths: 3,
    sqft: "2,200",
    type: "house",
    badge: null,
  },
  {
    id: 6,
    price: "$380,000",
    address: "987 Cedar Ln, Denver, CO 80201",
    beds: 3,
    baths: 2,
    sqft: "1,600",
    type: "condo",
    badge: "Hot",
  },
  {
    id: 7,
    price: "$950/mo",
    address: "147 Birch St, Austin, TX 78701",
    beds: 1,
    baths: 1,
    sqft: "650",
    type: "apartment",
    badge: null,
  },
  {
    id: 8,
    price: "$420,000",
    address: "258 Spruce Ave, Miami, FL 33101",
    beds: 3,
    baths: 2,
    sqft: "1,750",
    type: "townhouse",
    badge: "New",
  },
];

// Render Properties
function renderProperties(propertiesToShow) {
  propertiesGrid.innerHTML = "";

  propertiesToShow.forEach((property) => {
    const propertyCard = document.createElement("div");
    propertyCard.className = "property-card";
    propertyCard.innerHTML = `
            <div class="property-image">
                ${
                  property.badge
                    ? `<span class="property-badge">${property.badge}</span>`
                    : ""
                }
            </div>
            <div class="property-info">
                <div class="property-price">${property.price}</div>
                <div class="property-address">${property.address}</div>
                <div class="property-details">
                    <div class="property-detail">
                        <i class="fas fa-bed"></i>
                        <span>${property.beds} beds</span>
                    </div>
                    <div class="property-detail">
                        <i class="fas fa-bath"></i>
                        <span>${property.baths} baths</span>
                    </div>
                    <div class="property-detail">
                        <i class="fas fa-ruler-combined"></i>
                        <span>${property.sqft} sqft</span>
                    </div>
                </div>
            </div>
        `;

    propertyCard.addEventListener("click", () => {
      alert(`Viewing property: ${property.address}`);
    });

    propertiesGrid.appendChild(propertyCard);
  });
}

// Filter Properties
function filterProperties(filter) {
  if (filter === "all") {
    renderProperties(properties);
  } else {
    const filtered = properties.filter((p) => p.type === filter);
    renderProperties(filtered);
  }
}

// Initialize with all properties
renderProperties(properties);

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
  }

  lastScroll = currentScroll;
});

// Animate Stats on Scroll
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px",
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const statNumber = entry.target.querySelector(".stat-number");
      const finalValue = statNumber.textContent;
      const numericValue = parseInt(finalValue.replace(/\D/g, ""));

      if (numericValue && !statNumber.classList.contains("animated")) {
        statNumber.classList.add("animated");
        animateValue(statNumber, 0, numericValue, 2000, finalValue);
      }
    }
  });
}, observerOptions);

document.querySelectorAll(".stat-item").forEach((stat) => {
  statsObserver.observe(stat);
});

function animateValue(element, start, end, duration, originalText) {
  const range = end - start;
  const increment = end > start ? 1 : -1;
  const stepTime = Math.abs(Math.floor(duration / range));
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (
      (increment > 0 && current >= end) ||
      (increment < 0 && current <= end)
    ) {
      element.textContent = originalText;
      clearInterval(timer);
    } else {
      const suffix = originalText.replace(/\d/g, "");
      element.textContent = current.toLocaleString() + suffix;
    }
  }, stepTime);
}

// Add loading animation to property cards
const propertyCards = document.querySelectorAll(".property-card");
propertyCards.forEach((card, index) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";

  setTimeout(() => {
    card.style.transition = "all 0.5s ease";
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
  }, index * 100);
});
