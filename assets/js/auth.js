// Authentication JavaScript

// Tab Switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        
        // Remove active class from all tabs and contents
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and content
        this.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    });
});

// Password Toggle
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = event.currentTarget.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// User Login Form
const userLoginForm = document.getElementById('userLoginForm');
if (userLoginForm) {
    userLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        // Simulate login
        showLoading();
        setTimeout(() => {
            hideLoading();
            localStorage.setItem('user', JSON.stringify({
                email: email,
                name: 'User Name',
                role: 'user'
            }));
            alert('Login successful! Redirecting to dashboard...');
            window.location.href = 'dashboard.html';
        }, 1500);
    });
}

// Admin Login Form
const adminLoginForm = document.getElementById('adminLoginForm');
if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = this.querySelector('input[type="text"]').value;
        
        // Simulate admin login
        showLoading();
        setTimeout(() => {
            hideLoading();
            localStorage.setItem('user', JSON.stringify({
                username: username,
                name: 'Admin User',
                role: 'admin'
            }));
            alert('✅ Admin login successful! Redirecting to admin panel...');
            window.location.href = 'admin-dashboard.html';
        }, 1500);
    });
}

// Registration Form Steps
let currentStep = 1;

function nextStep(step) {
    // Hide current step
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelectorAll('.progress-step')[currentStep - 1].classList.remove('active');
    
    // Show next step
    currentStep = step;
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
    document.querySelectorAll('.progress-step')[currentStep - 1].classList.add('active');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevStep(step) {
    // Hide current step
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelectorAll('.progress-step')[currentStep - 1].classList.remove('active');
    
    // Show previous step
    currentStep = step;
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
    document.querySelectorAll('.progress-step')[currentStep - 1].classList.add('active');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Registration Form Submit
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        console.log('📝 Registration form submitted');
        
        // Get form values by ID
        const name = document.getElementById('regName').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value;
        
        console.log('Form values:', { name, email, password: '***' });
        
        if (!name || !email || !password) {
            alert('⚠️ Please fill in all required fields');
            return;
        }
        
        // Simple email validation
        if (!email.includes('@') || !email.includes('.')) {
            alert('⚠️ Please enter a valid email address');
            return;
        }
        
        // Password length check
        if (password.length < 6) {
            alert('⚠️ Password must be at least 6 characters long');
            return;
        }
        
        showLoading();
        
        try {
            console.log('🔄 Sending registration request to backend...');
            
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            
            console.log('Response status:', response.status);
            
            const data = await response.json();
            console.log('Response data:', data);
            
            hideLoading();
            
            if (data.success) {
                // Store token and user data
                localStorage.setItem('dasToken', data.token);
                localStorage.setItem('dasUser', JSON.stringify(data.user));
                
                console.log('✅ Registration successful!');
                alert('✅ Registration successful! Welcome aboard!\n\nRedirecting to dashboard...');
                setTimeout(() => window.location.href = 'dashboard.html', 1500);
            } else {
                console.error('❌ Registration failed:', data.error);
                alert('❌ Registration failed: ' + (data.error || 'Please try again'));
            }
        } catch (err) {
            hideLoading();
            console.error('❌ Connection error:', err);
            alert('❌ Connection error. Make sure the backend server is running.\n\nError: ' + err.message);
        }
    });
}

// Loading Overlay
function showLoading() {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = `
        <div class="loading-spinner">
            <i class="fas fa-circle-notch fa-spin"></i>
            <p>Processing...</p>
        </div>
    `;
    document.body.appendChild(overlay);
}

function hideLoading() {
    const overlay = document.querySelector('.loading-overlay');
    if (overlay) {
        overlay.remove();
    }
}

// Check if user is logged in
function checkAuth() {
    const user = localStorage.getItem('user');
    if (!user && window.location.pathname.includes('dashboard')) {
        window.location.href = 'login.html';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('Auth system initialized');
});
