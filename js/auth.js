// Local Storage Functions
function handleLogin(event) {
  event.preventDefault();
  console.log("Login function called");
  
  try {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    console.log("Login attempt:", username);
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log("Users in localStorage:", users);
    
    // Find user with matching credentials
    const user = users.find(u => u.username === username && u.password === password);
    console.log("Found user:", user);
    
    if (user) {
      // Store current user in localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      alert('Login successful!');
      window.location.href = 'dashboard.html'; // Redirect to dashboard page
    } else {
      alert('Invalid username or password');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('An error occurred during login. Please try again.');
  }
}

function handleRegister(event) {
  event.preventDefault();
  console.log("Register function called");
  
  try {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    
    console.log("Registration attempt:", username, email);
    
    // Validate passwords match
    if (password !== passwordConfirm) {
      alert('Passwords do not match');
      return;
    }
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log("Existing users:", users);
    
    // Check if username already exists
    if (users.some(u => u.username === username)) {
      alert('Username already exists');
      return;
    }
    
    // Check if email already exists
    if (users.some(u => u.email === email)) {
      alert('Email already registered');
      return;
    }
    
    // Create new user
    const newUser = {
      username,
      email,
      password
    };
    
    console.log("New user to be added:", newUser);
    
    // Save to localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    console.log("Updated users in localStorage:", users);
    
    alert('Registration successful! Please login.');
    window.location.href = 'login.html'; // Redirect to login page
  } catch (error) {
    console.error('Registration error:', error);
    alert('An error occurred during registration. Please try again.');
  }
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM loaded, setting up event listeners");
  
  try {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
      loginForm.addEventListener('submit', handleLogin);
      console.log('Login form listener attached');
    } else {
      console.error('Login form not found');
    }
    
    if (registerForm) {
      registerForm.addEventListener('submit', handleRegister);
      console.log('Register form listener attached');
    } else {
      console.error('Register form not found');
    }
  } catch (error) {
    console.error('Error setting up event listeners:', error);
  }
});

// Password visibility functions
function displayPassword() {
  try {
    var password = document.getElementById("password");
    var displayPass = document.getElementById("display-pass");
    var hidenPass = document.getElementById("hiden-pass");

    if (password.type === "password") {
      password.type = "text";
      displayPass.style.display = "block";
      hidenPass.style.display = "none";
    } else {
      password.type = "password";
      displayPass.style.display = "none";
      hidenPass.style.display = "block";
    }
  } catch (error) {
    console.error('Error toggling password visibility:', error);
  }
}

function displayPasswordConfirm() {
  try {
    var passConfirm = document.getElementById("passwordConfirm");
    var displayPassConfirm = document.getElementById("display-passConfirm");
    var hidenPassConfirm = document.getElementById("hiden-passConfirm");

    if (passConfirm.type === "password") {
      passConfirm.type = "text";
      displayPassConfirm.style.display = "block";
      hidenPassConfirm.style.display = "none";
    } else {
      passConfirm.type = "password";
      displayPassConfirm.style.display = "none";
      hidenPassConfirm.style.display = "block";
    }
  } catch (error) {
    console.error('Error toggling confirm password visibility:', error);
  }
}