// main.js — entry point for all pages

document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;

  if (document.getElementById('directory-list')) {
    loadDirectory();
  }

  if (document.getElementById('events-list')) {
    loadEvents();
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContact);
  }
});

async function loadDirectory() {
  const container = document.getElementById('directory-list');
  try {
    const res = await fetch('data/directory.json');
    const alumni = await res.json();
    if (alumni.length === 0) {
      container.innerHTML = '<p>No alumni records found.</p>';
      return;
    }
    // Placeholder: render logic goes here
  } catch (err) {
    container.innerHTML = '<p>Failed to load directory data.</p>';
  }
}

async function loadEvents() {
  const container = document.getElementById('events-list');
  try {
    const res = await fetch('data/events.json');
    const events = await res.json();
    if (events.length === 0) {
      container.innerHTML = '<p>No upcoming events.</p>';
      return;
    }
    // Placeholder: render logic goes here
  } catch (err) {
    container.innerHTML = '<p>Failed to load events data.</p>';
  }
}

function handleContact(e) {
  e.preventDefault();
  // Placeholder: form submission logic goes here
  alert('Message received — thank you!');
  e.target.reset();
}
