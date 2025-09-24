// Check if user is logged in
function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        // If no current user, redirect to login page
        window.location.href = 'login.html';
        return false;
    }
    
    // Update user info on dashboard
    const userInfoElement = document.getElementById('userInfo');
    if (userInfoElement) {
        userInfoElement.textContent = `Welcome, ${currentUser.username}`;
    }
    
    return true;
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Load cart data
function loadCart() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    // Get user's cart from localStorage
    const userCartKey = `cart_${currentUser.username}`;
    const cartItems = JSON.parse(localStorage.getItem(userCartKey)) || [];
    
    const cartTable = document.getElementById('cartTable');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartTotal = document.getElementById('cartTotal');
    
    // Clear existing cart items
    cartTable.querySelector('tbody').innerHTML = '';
    
    if (cartItems.length === 0) {
        // Show empty cart message
        cartEmpty.style.display = 'block';
        cartTable.style.display = 'none';
        cartTotal.textContent = '৳ 0.00';
        return;
    }
    
    // Hide empty cart message
    cartEmpty.style.display = 'none';
    cartTable.style.display = 'table';
    
    let total = 0;
    
    // Add each item to the cart table
    cartItems.forEach((item, index) => {
        const row = document.createElement('tr');
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        row.innerHTML = `
            <td>
                <div class="d-flex align-items-center">
                    <img src="${item.image}" class="book-img me-3" alt="${item.title}">
                    <div>
                        <h6 class="mb-0">${item.title}</h6>
                        <small class="text-muted">by ${item.author}</small>
                    </div>
                </div>
            </td>
            <td>৳ ${item.price.toFixed(2)}</td>
            <td>
                <div class="input-group input-group-sm" style="width: 120px;">
                    <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity(${index}, -1)">-</button>
                    <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                    <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
            </td>
            <td>৳ ${itemTotal.toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        cartTable.querySelector('tbody').appendChild(row);
    });
    
    // Update total
    cartTotal.textContent = `৳ ${total.toFixed(2)}`;
}

// Update quantity of an item in cart
function updateQuantity(index, change) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    const userCartKey = `cart_${currentUser.username}`;
    const cartItems = JSON.parse(localStorage.getItem(userCartKey)) || [];
    
    if (cartItems[index]) {
        cartItems[index].quantity += change;
        
        // Remove item if quantity is 0 or less
        if (cartItems[index].quantity <= 0) {
            cartItems.splice(index, 1);
        }
        
        localStorage.setItem(userCartKey, JSON.stringify(cartItems));
        loadCart(); // Reload cart display
    }
}

// Remove item from cart
function removeFromCart(index) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    const userCartKey = `cart_${currentUser.username}`;
    const cartItems = JSON.parse(localStorage.getItem(userCartKey)) || [];
    
    cartItems.splice(index, 1);
    localStorage.setItem(userCartKey, JSON.stringify(cartItems));
    loadCart(); // Reload cart display
}

// Checkout function
function checkout() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    const userCartKey = `cart_${currentUser.username}`;
    const cartItems = JSON.parse(localStorage.getItem(userCartKey)) || [];
    
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // In a real application, this would process payment
    // For now, we'll just show a success message and clear the cart
    alert('Order placed successfully! Thank you for your purchase.');
    
    // Clear cart
    localStorage.removeItem(userCartKey);
    loadCart(); // Reload cart display
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (!checkAuth()) return;
    
    // Load cart data
    loadCart();
    
    // Add logout event listener
    const logoutBtn = document.getElementById('userLogoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    document.addEventListener("DOMContentLoaded", function() {
  // Current user localStorage থেকে আনো
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // যদি user না থাকে → redirect to login
  if (!currentUser) {
    alert("You must log in first!");
    window.location.href = "login.html";
    return;
  }

  // User info দেখাও
  const userInfo = document.getElementById("userInfo");
  if (userInfo) {
    userInfo.textContent = `Welcome, ${currentUser.username}`;
  }

  // Logout functionality
  const logoutBtn = document.getElementById("userLogoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function() {
      localStorage.removeItem("currentUser"); // session clear
      alert("You have been logged out.");
      window.location.href = "login.html";
    });
  }
});

});