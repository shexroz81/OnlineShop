// Profile/Login Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const signupForm = document.getElementById('signupForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('terms');
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    
    // Password toggle functionality
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        this.innerHTML = type === 'password' ? '<i class="fa-solid fa-eye"></i>' : '<i class="fa-solid fa-eye-slash"></i>';
    });
    
    toggleConfirmPassword.addEventListener('click', function() {
        const type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
        confirmPasswordInput.type = type;
        this.innerHTML = type === 'password' ? '<i class="fa-solid fa-eye"></i>' : '<i class="fa-solid fa-eye-slash"></i>';
    });
    
    // Form validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePassword(password) {
        return password.length >= 8;
    }
    
    function showError(input, message) {
        input.classList.add('error');
        input.classList.remove('success');
        
        // Remove existing error message
        const existingError = input.parentElement.nextElementSibling;
        if (existingError && existingError.classList.contains('error-message')) {
            existingError.remove();
        }
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message show';
        errorDiv.textContent = message;
        input.parentElement.insertAdjacentElement('afterend', errorDiv);
    }
    
    function showSuccess(input) {
        input.classList.remove('error');
        input.classList.add('success');
        
        // Remove error message if exists
        const existingError = input.parentElement.nextElementSibling;
        if (existingError && existingError.classList.contains('error-message')) {
            existingError.remove();
        }
    }
    
    function clearValidation(input) {
        input.classList.remove('error', 'success');
        
        // Remove error message if exists
        const existingError = input.parentElement.nextElementSibling;
        if (existingError && existingError.classList.contains('error-message')) {
            existingError.remove();
        }
    }
    
    // Real-time validation
    nameInput.addEventListener('blur', function() {
        const name = this.value.trim();
        if (name.length < 2) {
            showError(this, 'Name must be at least 2 characters long');
        } else {
            showSuccess(this);
        }
    });
    
    emailInput.addEventListener('blur', function() {
        const email = this.value.trim();
        if (!validateEmail(email)) {
            showError(this, 'Please enter a valid email address');
        } else {
            showSuccess(this);
        }
    });
    
    passwordInput.addEventListener('blur', function() {
        const password = this.value;
        if (!validatePassword(password)) {
            showError(this, 'Password must be at least 8 characters long');
        } else {
            showSuccess(this);
        }
    });
    
    confirmPasswordInput.addEventListener('blur', function() {
        const password = passwordInput.value;
        const confirmPassword = this.value;
        
        if (confirmPassword !== password) {
            showError(this, 'Passwords do not match');
        } else if (confirmPassword.length === 0) {
            showError(this, 'Please confirm your password');
        } else {
            showSuccess(this);
        }
    });
    
    // Clear validation on input
    [nameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
        input.addEventListener('input', function() {
            clearValidation(this);
        });
    });
    
    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear all previous validations
        [nameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
            clearValidation(input);
        });
        
        // Validate all fields
        let isValid = true;
        
        // Name validation
        const name = nameInput.value.trim();
        if (name.length < 2) {
            showError(nameInput, 'Name must be at least 2 characters long');
            isValid = false;
        }
        
        // Email validation
        const email = emailInput.value.trim();
        if (!validateEmail(email)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Password validation
        const password = passwordInput.value;
        if (!validatePassword(password)) {
            showError(passwordInput, 'Password must be at least 8 characters long');
            isValid = false;
        }
        
        // Confirm password validation
        const confirmPassword = confirmPasswordInput.value;
        if (confirmPassword !== password) {
            showError(confirmPasswordInput, 'Passwords do not match');
            isValid = false;
        }
        
        // Terms validation
        if (!termsCheckbox.checked) {
            alert('Please agree to the Terms and Conditions');
            isValid = false;
        }
        
        if (isValid) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #27ae60;
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
                z-index: 10000;
                animation: slideIn 0.3s ease-out;
            `;
            successMessage.innerHTML = '<i class="fa-solid fa-check-circle"></i> Account created successfully!';
            document.body.appendChild(successMessage);
            
            // Store user data (in real app, this would be sent to server)
            const userData = {
                name: name,
                email: email,
                password: password, // In real app, this should be hashed
                createdAt: new Date().toISOString()
            };
            
            localStorage.setItem('userData', JSON.stringify(userData));
            console.log('User data stored:', userData);
            
            // Reset form
            signupForm.reset();
            [nameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
                clearValidation(input);
            });
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
            
            // Redirect to login page or dashboard after 2 seconds
            setTimeout(() => {
                // In real app, you might redirect to login page
                console.log('Redirecting to login page...');
                // window.location.href = 'login.html';
            }, 2000);
        }
    });
    
    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.classList.contains('google') ? 'Google' : 'Facebook';
            
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Connecting...';
            this.disabled = true;
            
            // Simulate social login
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                
                const message = document.createElement('div');
                message.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #3498db;
                    color: white;
                    padding: 15px 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
                    z-index: 10000;
                    animation: slideIn 0.3s ease-out;
                `;
                message.innerHTML = `<i class="fa-solid fa-info-circle"></i> ${platform} login coming soon!`;
                document.body.appendChild(message);
                
                setTimeout(() => {
                    message.remove();
                }, 3000);
            }, 1500);
        });
    });
    
    // Add slide-in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});
