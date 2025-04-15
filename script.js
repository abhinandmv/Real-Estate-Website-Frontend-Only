document.addEventListener('DOMContentLoaded', function() {
  // Menu toggle functionality - consolidated in one place
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  if (navLinks) {
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // Check for logged in user
  const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
  const authLinks = document.querySelector('.auth-links');
  
  if (loggedInUser && authLinks) {
    authLinks.innerHTML = `
      <span class="user-greeting">Hello, ${loggedInUser.name}</span>
      <a href="#" class="btn-sm" id="logout-btn">Logout</a>
    `;
    document.getElementById('logout-btn').addEventListener('click', function(e) {
      e.preventDefault();
      sessionStorage.removeItem('loggedInUser');
      window.location.reload();
    });
  }
  
  // Properties display
  const propertyList = document.getElementById("property-list");
  if (propertyList) {
    displayProperties();
  }
});

// Property data
const properties = [
  {
    title: "Luxury Villa in Goa",
    location: "Candolim, Goa",
    price: "₹2.5 Cr",
    type: "Villa",
    image: "images/villa.jpg",
    bedrooms: 4,
    bathrooms: 3,
    area: "3500 sq ft",
    tag: "Featured"
  },
  {
    title: "Modern Apartment in Mumbai",
    location: "Bandra West, Mumbai",
    price: "₹1.8 Cr",
    type: "Apartment",
    image: "images/apartment.jpg",
    bedrooms: 2,
    bathrooms: 2,
    area: "1200 sq ft",
    tag: "New"
  },
  {
    title: "Cottage in Manali",
    location: "Old Manali, Himachal Pradesh",
    price: "₹85 L",
    type: "Cottage",
    image: "images/cottage.jpg",
    bedrooms: 3,
    bathrooms: 2,
    area: "1500 sq ft",
    tag: "Hot Deal"
  },
  {
    title: "Penthouse in Bangalore",
    location: "Koramangala, Bangalore",
    price: "₹3.2 Cr",
    type: "Penthouse",
    image: "images/penthouse.jpg",
    bedrooms: 4,
    bathrooms: 4,
    area: "4200 sq ft",
    tag: "Premium"
  },
  {
    title: "Villa in Delhi",
    location: "East of Kailash,South Delhi",
    price: "₹9 Cr",
    type: "Villa",
    image: "images/delhi-villa.jpg",
    bedrooms: 5,
    bathrooms: 5,
    area: "7200 sq ft",
    tag: "Premium"
  },
  {
    title: "Appartment in Bangalore",
    location: "Nagavara Junction, Bangalore",
    price: "₹96 L",
    type: "Apartment",
    image: "images/appartment-banglore.jpg",
    bedrooms: 3,
    bathrooms: 3,
    area: "1800 sq ft",
    tag: "New"
  }
];

function displayProperties(type = "") {
  const propertyList = document.getElementById("property-list");
  if (!propertyList) return;
  
  propertyList.innerHTML = "";
  const filtered = type ? properties.filter(p => p.type === type) : properties;

  filtered.forEach(prop => {
    const card = document.createElement("div");
    card.className = "property-card";
    const img = new Image();
    img.src = prop.image;
    img.alt = prop.title;
    img.className = "property-img";
    img.onerror = () => {
      img.src = "images/fallback.jpg"; // Fallback image
    };

    card.innerHTML = `
      <div style="position: relative;"></div>
      <div class="property-body">
        <h3 class="property-title">${prop.title}</h3>
        <div class="property-location">
          <i class="fas fa-map-marker-alt"></i> ${prop.location}
        </div>
        <div class="property-features">
          <div class="feature"><i class="fas fa-bed"></i> ${prop.bedrooms} Beds</div>
          <div class="feature"><i class="fas fa-bath"></i> ${prop.bathrooms} Baths</div>
          <div class="feature"><i class="fas fa-vector-square"></i> ${prop.area}</div>
        </div>
        <div class="property-price">${prop.price}</div>
      </div>
    `;

    const wrapper = card.querySelector("div[style]");
    wrapper.appendChild(img);
    const tag = document.createElement("span");
    tag.className = "property-tag";
    tag.textContent = prop.tag;
    wrapper.appendChild(tag);

    propertyList.appendChild(card);
  });
}

function handleSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;
  
  if (!name || !email || !message) {
    alert('Please fill in all required fields');
    return;
  }
  
  const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
  messages.push({
    name,
    email,
    phone,
    message,
    date: new Date().toISOString()
  });
  
  localStorage.setItem('contactMessages', JSON.stringify(messages));
  
  alert('Thank you for your message! We will get back to you soon.');
  
  event.target.reset();
}