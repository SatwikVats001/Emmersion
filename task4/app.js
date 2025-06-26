const API = 'http://localhost:5000';
let token = '';

async function register() {
  const body = {
    username: document.getElementById('reg-username').value,
    password: document.getElementById('reg-password').value,
    email: document.getElementById('reg-email').value,
    age: parseInt(document.getElementById('reg-age').value)
  };

  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  alert(data.message || 'Registered');
}

async function login() {
  const body = {
    username: document.getElementById('login-username').value,
    password: document.getElementById('login-password').value
  };

  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  if (data.token) {
    token = data.token;
    document.getElementById('vehicle-section').style.display = 'block';
    loadVehicles();
  } else {
    alert('Login failed');
  }
}

async function createVehicle() {
  const body = {
    make: document.getElementById('make').value,
    model: document.getElementById('model').value,
    year: parseInt(document.getElementById('year').value)
  };

  const res = await fetch(`${API}/vehicles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  loadVehicles();
}

async function loadVehicles() {
  const res = await fetch(`${API}/vehicles`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const vehicles = await res.json();
  const list = document.getElementById('vehicle-list');
  list.innerHTML = '';

  vehicles.forEach(vehicle => {
    const li = document.createElement('li');
    li.textContent = `${vehicle.make} ${vehicle.model} (${vehicle.year})`;
    list.appendChild(li);
  });
}
