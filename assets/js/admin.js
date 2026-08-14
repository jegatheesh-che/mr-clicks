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

// Selection Mode State
let isSelectionMode = false;
let selectedImageIds = new Set();
const selectModeBtn = document.getElementById('select-mode-btn');
const bulkActionBar = document.getElementById('bulk-action-bar');
const bulkCountText = document.getElementById('bulk-count');
const bulkDeleteBtn = document.getElementById('bulk-delete-btn');

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
    document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
    viewDashboard.classList.add('active');
    appNav.style.display = 'flex';
    loadImages();
  } else {
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

// Handle Bulk Image Upload
if (uploadForm) {
  uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('image-file');
    const category = document.getElementById('image-category').value;
    let baseTitle = document.getElementById('image-title').value.trim();
    
    if (fileInput.files.length === 0) {
      showToast('Please select at least one image to upload', 'error');
      return;
    }
    const files = Array.from(fileInput.files);

    uploadBtn.disabled = true;
    uploadBtn.innerHTML = '<i data-feather="loader" style="animation: spin 1s linear infinite;"></i> Uploading...';
    if (window.feather) feather.replace();

    try {
      let successCount = 0;
      
      // Upload files sequentially or in parallel (using Promise.all for parallel)
      const uploadPromises = files.map(async (file, index) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', cloudinaryConfig.uploadPreset);

        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`;
        
        const cloudinaryRes = await fetch(cloudinaryUrl, {
          method: 'POST',
          body: formData
        });

        if (!cloudinaryRes.ok) throw new Error('Failed to upload image to Cloudinary.');

        const cloudinaryData = await cloudinaryRes.json();
        
        // Auto-numbering title if there are multiple files
        let finalTitle = baseTitle;
        if (files.length > 1) {
          finalTitle = baseTitle ? `${baseTitle} ${index + 1}` : `Untitled ${index + 1}`;
        } else if (!baseTitle) {
          finalTitle = 'Untitled';
        }
        
        await addDoc(collection(db, 'portfolio_images'), {
          url: cloudinaryData.secure_url,
          category: category,
          title: finalTitle,
          createdAt: serverTimestamp()
        });
        
        successCount++;
      });
      
      await Promise.all(uploadPromises);

      showToast(`Successfully uploaded ${successCount} image(s)!`, 'success');
      uploadForm.reset();
      document.getElementById('file-name-display').textContent = 'Tap to choose files';
      
      loadImages();
      document.querySelector('.nav-item[data-target="view-dashboard"]').click();

    } catch (error) {
      console.error(error);
      showToast('Error uploading images', 'error');
    } finally {
      uploadBtn.disabled = false;
      uploadBtn.innerHTML = 'Upload to Cloudinary';
    }
  });
}

// Handle Selection Mode Toggle
if (selectModeBtn) {
  selectModeBtn.addEventListener('click', () => {
    isSelectionMode = !isSelectionMode;
    selectedImageIds.clear();
    
    if (isSelectionMode) {
      selectModeBtn.style.background = 'var(--app-primary)';
      selectModeBtn.style.color = 'var(--app-bg)';
      selectModeBtn.textContent = 'Cancel';
      bulkActionBar.classList.add('visible');
    } else {
      selectModeBtn.style.background = 'var(--app-surface-elevated)';
      selectModeBtn.style.color = 'var(--app-text)';
      selectModeBtn.textContent = 'Select';
      bulkActionBar.classList.remove('visible');
    }
    updateBulkCount();
    
    // Toggle selectable class on all items
    document.querySelectorAll('.masonry-item').forEach(item => {
      if (isSelectionMode) {
        item.classList.add('selectable');
        item.querySelector('.delete-icon').style.display = 'none'; // hide normal delete button
      } else {
        item.classList.remove('selectable', 'selected');
        item.querySelector('.delete-icon').style.display = 'flex';
      }
    });
  });
}

// Update Bulk Selection Count
function updateBulkCount() {
  if (bulkCountText) {
    bulkCountText.textContent = `${selectedImageIds.size} Selected`;
  }
}

// Handle Bulk Delete
if (bulkDeleteBtn) {
  bulkDeleteBtn.addEventListener('click', async () => {
    if (selectedImageIds.size === 0) return showToast('No images selected', 'error');
    
    if (confirm(`Are you sure you want to delete ${selectedImageIds.size} image(s)?`)) {
      bulkDeleteBtn.disabled = true;
      bulkDeleteBtn.innerHTML = 'Deleting...';
      
      try {
        const deletePromises = Array.from(selectedImageIds).map(id => {
          return deleteDoc(doc(db, 'portfolio_images', id));
        });
        
        await Promise.all(deletePromises);
        showToast(`Deleted ${selectedImageIds.size} image(s)`, 'success');
        
        // Exit selection mode
        selectModeBtn.click(); 
        loadImages();
      } catch (err) {
        console.error(err);
        showToast('Error deleting images', 'error');
      } finally {
        bulkDeleteBtn.disabled = false;
        bulkDeleteBtn.innerHTML = 'Delete Selected';
      }
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
      item.className = `masonry-item ${isSelectionMode ? 'selectable' : ''}`;
      item.setAttribute('data-id', docSnap.id);
      
      item.innerHTML = `
        <img src="${data.url}" alt="${data.title}">
        <div class="masonry-overlay">
          <div class="masonry-info">
            <h4>${data.title}</h4>
            <p>${data.category.toUpperCase()}</p>
          </div>
          <button class="delete-btn delete-icon" data-id="${docSnap.id}" title="Delete Image" style="display: ${isSelectionMode ? 'none' : 'flex'};">
            <i data-feather="trash-2" style="width: 16px; height: 16px;"></i>
          </button>
        </div>
      `;
      adminImageGrid.appendChild(item);
    });
    
    if (window.feather) feather.replace();

    // Event listener for masonry items (Selection Mode)
    document.querySelectorAll('.masonry-item').forEach(item => {
      item.addEventListener('click', (e) => {
        if (!isSelectionMode) return;
        // Don't trigger if they somehow clicked the delete button
        if (e.target.closest('.delete-btn')) return;
        
        const id = item.getAttribute('data-id');
        if (selectedImageIds.has(id)) {
          selectedImageIds.delete(id);
          item.classList.remove('selected');
        } else {
          selectedImageIds.add(id);
          item.classList.add('selected');
        }
        updateBulkCount();
      });
    });

    // Event listener for individual delete buttons (Normal Mode)
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        if (isSelectionMode) return;
        e.stopPropagation(); // prevent bubbling up
        
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
