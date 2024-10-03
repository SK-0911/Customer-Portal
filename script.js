// Get all navigation links and sections
const navLinks = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('.content-section');

// Function to remove the 'active' class from all sections
function hideAllSections() {
  sections.forEach(section => {
    section.classList.remove('active');
  });
}

// Function to show the targeted section with smooth transition
function showSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    hideAllSections();
    
    // Display the section first, then trigger the transition
    targetSection.style.display = 'block';
    setTimeout(() => {
      targetSection.classList.add('active');
    }, 10); // Small timeout to allow CSS transition
}


// Function to handle clicks on navigation links
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default link behavior

    // Hide all sections first
    hideAllSections();

    // Get the target section from the data attribute
    const targetId = this.getAttribute('data-target');
    const targetSection = document.getElementById(targetId);

    // Add the 'active' class to the target section for smooth transition
    setTimeout(() => {
      targetSection.classList.add('active');
    }, 100);
  });
});

// Initially hide all sections except the first one (optional)
hideAllSections();

// Optionally, show the first section by default (comment out if you don't want it)
showSection('claimSection');


// Claims array to store submitted claims
let claims = [];

// Handle form submission
document.getElementById('claimForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const policyNumber = document.getElementById('policyNumber').value;
  const incidentDate = document.getElementById('incidentDate').value;
  const incidentDescription = document.getElementById('incidentDescription').value;

  // Simulate claim submission with a unique claim number
  const claimNumber = 'CLM' + (claims.length + 1).toString().padStart(3, '0');
  const newClaim = {
    claimNumber: claimNumber,
    status: 'In Review',
    dateSubmitted: new Date().toLocaleDateString()
  };

  claims.push(newClaim);

  // Update claim tracking table
  updateClaimsTable();

  // Show success message and clear the form
  document.getElementById('successMessage').textContent = 'Claim submitted successfully!';
  this.reset();
});

// Update the claims tracking table
function updateClaimsTable() {
  const claimsTableBody = document.getElementById('claimsTable').querySelector('tbody');
  claimsTableBody.innerHTML = '';
  
  claims.forEach(claim => {
    const row = `<tr>
      <td>${claim.claimNumber}</td>
      <td>${claim.status}</td>
      <td>${claim.dateSubmitted}</td>
    </tr>`;
    claimsTableBody.innerHTML += row;
  });
}

// Knowledge base articles (simulated data)
const knowledgeBaseArticles = [
  { title: 'How to File a Claim', content: 'Step-by-step guide on filing a claim.' },
  { title: 'Understanding Your Policy', content: 'Details about insurance policies.' },
  { title: 'What to Do in Case of an Accident', content: 'Essential steps after an incident.' }
];

// Knowledge base search function
function searchKnowledgeBase() {
  const query = document.getElementById('searchBar').value.toLowerCase();
  const results = knowledgeBaseArticles.filter(article => article.title.toLowerCase().includes(query));
  
  const resultsList = document.getElementById('searchResults');
  resultsList.innerHTML = '';
  
  results.forEach(article => {
    const listItem = `<li><strong>${article.title}</strong><p>${article.content}</p></li>`;
    resultsList.innerHTML += listItem;
  });
}
