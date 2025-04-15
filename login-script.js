document.addEventListener('DOMContentLoaded', function() {
    // Tab switching logic
    const tabs = document.querySelectorAll('.tab');
    const forms = document.querySelectorAll('.auth-form');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetForm = tab.getAttribute('data-tab');
        
        // Remove active class from all tabs and forms
        tabs.forEach(t => t.classList.remove('active'));
        forms.forEach(f => f.classList.remove('active'));
        
        // Add active class to current tab and form
        tab.classList.add('active');
        document.getElementById(`${targetForm}-form`).classList.add('active');
      });
    });
  
    // Create error message element for login form
    const loginForm = document.getElementById('login-form');
    const loginErrorMsg = document.createElement('div');
    loginErrorMsg.className = 'error-message';
    loginErrorMsg.id = 'login-error';
    loginForm.insertBefore(loginErrorMsg, loginForm.firstChild);
  
    // Create success message element for login form
    const loginSuccessMsg = document.createElement('div');
    loginSuccessMsg.className = 'success-message';
    loginSuccessMsg.id = 'login-success';
    loginForm.insertBefore(loginSuccessMsg, loginForm.firstChild);
  
    // Create error message element for signup form
    const signupForm = document.getElementById('signup-form');
    const signupErrorMsg = document.createElement('div');
    signupErrorMsg.className = 'error-message';
    signupErrorMsg.id = 'signup-error';
    signupForm.insertBefore(signupErrorMsg, signupForm.firstChild);
  
    // Create success message element for signup form
    const signupSuccessMsg = document.createElement('div');
    signupSuccessMsg.className = 'success-message';
    signupSuccessMsg.id = 'signup-success';
    signupForm.insertBefore(signupSuccessMsg, signupForm.firstChild);
  
    // Login form submission
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      
      // Simple validation
      if (!email || !password) {
        showError('login-error', 'Please fill in all fields');
        return;
      }
      
      // Check if user exists in localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Login successful
        showSuccess('login-success', 'Login successful! Redirecting...');
        
        // Store login state
        sessionStorage.setItem('loggedInUser', JSON.stringify({
          name: user.name,
          email: user.email
        }));
        
        // Redirect to home page after a short delay
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1500);
      } else {
        showError('login-error', 'Invalid email or password');
        loginForm.classList.add('shake');
        setTimeout(() => {
          loginForm.classList.remove('shake');
        }, 600);
      }
    });
  
    // Signup form submission
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('signup-name').value;
      const email = document.getElementById('signup-email').value;
      const phone = document.getElementById('signup-phone').value;
      const password = document.getElementById('signup-password').value;
      const confirmPassword = document.getElementById('signup-confirm').value;
      const agreeTerms = document.getElementById('terms').checked;
      
      // Simple validation
      if (!name || !email || !phone || !password || !confirmPassword) {
        showError('signup-error', 'Please fill in all fields');
        return;
      }
      
      if (password !== confirmPassword) {
        showError('signup-error', 'Passwords do not match');
        return;
      }
      
      if (!agreeTerms) {
        showError('signup-error', 'You must agree to the Terms of Service and Privacy Policy');
        return;
      }
      
      // Check if email already exists
      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.some(user => user.email === email)) {
        showError('signup-error', 'Email already exists. Please use a different email or login.');
        return;
      }
      
      // Add new user
      users.push({
        name,
        email,
        phone,
        password
      });
      
      localStorage.setItem('users', JSON.stringify(users));
      
      // Show success message
      showSuccess('signup-success', 'Account created successfully! You can now log in.');
      
      // Clear form
      signupForm.reset();
      
      // Switch to login tab after a short delay
      setTimeout(() => {
        tabs[0].click();
      }, 2000);
    });
  
    // Helper functions
    function showError(elementId, message) {
      const errorElement = document.getElementById(elementId);
      errorElement.textContent = message;
      errorElement.style.display = 'block';
      
      // Hide after 5 seconds
      setTimeout(() => {
        errorElement.style.display = 'none';
      }, 5000);
    }
    
    function showSuccess(elementId, message) {
      const successElement = document.getElementById(elementId);
      successElement.textContent = message;
      successElement.style.display = 'block';
      
      // Hide after 5 seconds
      setTimeout(() => {
        successElement.style.display = 'none';
      }, 5000);
    }
  });