import { auth, db, cloudinaryConfig } from './firebase-config.js';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// DOM Elements
const viewLogin = document.getElementById('view-login');
const viewDashboard = document.getElementById('view-dashboard');
const appNav = document.getElementById('app-nav');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');
const uploadForm = document.getElementById('upload-form');
const uploadBtn = document.getElementById('upload-btn');
const adminImageGrid = document.getElementById('admin-image-grid');
const galleryCount = document.getElementById('gallery-count');

// Toast Notification System
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-icon">
      <i data-feather="${type === 'success' ? 'check-circle' : 'alert-circle'}"></i>
    </div>
    <div style="font-size: 0.9rem; font-weight: 500;">${message}</div>
  `;
  
  container.appendChild(toast);
  if (window.feather) feather.replace();
  
  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Check Auth State
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
    viewDashboard.classList.add('active');
    appNav.style.display = 'flex';
    loadImages();
  } else {
    // User is signed out
    document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
    viewLogin.classList.add('active');
    appNav.style.display = 'none';
  }
});

// Handle Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('admin-email').value;
  const password = document.getElementById('admin-password').value;
  const loginBtn = document.getElementById('login-btn');
  
  loginBtn.disabled = true;
  loginBtn.textContent = 'Authenticating...';
  
  try {
    await signInWithEmailAndPassword(auth, email, password);
    showToast('Login successful!', 'success');
  } catch (error) {
    showToast("Error: " + error.message, 'error');
  } finally {
    loginBtn.disabled = false;
    loginBtn.textContent = 'Secure Login';
  }
});

// Handle Logout
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    signOut(auth);
    showToast('Logged out successfully', 'success');
  });
}

// Handle Image Upload
if (uploadForm) {
  uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('image-file');
    const category = document.getElementById('image-category').value;
    const title = document.getElementById('image-title').value;
    
    if (fileInput.files.length === 0) return;
    const file = fileInput.files[0];

    uploadBtn.disabled = true;
    uploadBtn.innerHTML = '<i data-feather="loader" style="animation: spin 1s linear infinite;"></i> Uploading...';
    if (window.feather) feather.replace();

    try {
      // 1. Upload to Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', cloudinaryConfig.uploadPreset);

      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`;
      
      const cloudinaryRes = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: formData
      });

      if (!cloudinaryRes.ok) {
        throw new Error('Failed to upload image. Check your CloudName and UploadPreset.');
      }

      const cloudinaryData = await cloudinaryRes.json();
      const imageUrl = cloudinaryData.secure_url;

      // 2. Save URL to Firestore
      uploadBtn.innerHTML = 'Saving to Database...';
      
      await addDoc(collection(db, 'portfolio_images'), {
        url: imageUrl,
        category: category,
        title: title || 'Untitled',
        createdAt: serverTimestamp()
      });

      showToast("Image uploaded and saved successfully!", 'success');
      uploadForm.reset();
      document.getElementById('file-name-display').textContent = 'Tap to choose a file';
      
      // Reload images and switch to dashboard
      loadImages();
      document.querySelector('.nav-item[data-target="view-dashboard"]').click();

    } catch (error) {
      console.error(error);
      showToast(error.message, 'error');
    } finally {
      uploadBtn.disabled = false;
      uploadBtn.innerHTML = 'Upload to Cloudinary';
    }
  });
}

// Load Images from Firestore
async function loadImages() {
  if (!adminImageGrid) return;
  adminImageGrid.innerHTML = '<p style="color: var(--app-text-muted);">Loading images...</p>';
  
  try {
    const q = query(collection(db, 'portfolio_images'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    if (galleryCount) {
      galleryCount.textContent = `${querySnapshot.size} image${querySnapshot.size !== 1 ? 's' : ''} in portfolio`;
    }
    
    if (querySnapshot.empty) {
      adminImageGrid.innerHTML = '<p style="color: var(--app-text-muted);">No images uploaded yet.</p>';
      return;
    }

    adminImageGrid.innerHTML = '';
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const item = document.createElement('div');
      item.className = 'masonry-item';
      item.innerHTML = `
        <img src="${data.url}" alt="${data.title}">
        <div class="masonry-overlay">
          <div class="masonry-info">
            <h4>${data.title}</h4>
            <p>${data.category.toUpperCase()}</p>
          </div>
          <button class="delete-btn delete-icon" data-id="${docSnap.id}" title="Delete Image">
            <i data-feather="trash-2" style="width: 16px; height: 16px;"></i>
          </button>
        </div>
      `;
      adminImageGrid.appendChild(item);
    });
    
    if (window.feather) feather.replace();

    // Add delete event listeners
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        if (confirm('Delete this image from the portfolio?')) {
          e.currentTarget.disabled = true;
          try {
            await deleteDoc(doc(db, 'portfolio_images', id));
            showToast('Image deleted successfully', 'success');
            loadImages();
          } catch(err) {
            showToast('Error deleting image', 'error');
            e.currentTarget.disabled = false;
          }
        }
      });
    });

  } catch (error) {
    console.error("Error loading images:", error);
    adminImageGrid.innerHTML = `<p style="color: var(--app-danger);">Error loading images: ${error.message}</p>`;
  }
}

// Add CSS for spinner
const style = document.createElement('style');
style.innerHTML = `
  @keyframes spin { 100% { transform: rotate(360deg); } }
`;
document.head.appendChild(style);
