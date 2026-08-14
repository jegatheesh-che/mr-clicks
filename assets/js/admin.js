import { auth, db, cloudinaryConfig } from './firebase-config.js';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// DOM Elements
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const loginForm = document.getElementById('login-form');
const loginStatus = document.getElementById('login-status');
const logoutBtn = document.getElementById('logout-btn');
const uploadForm = document.getElementById('upload-form');
const uploadStatus = document.getElementById('upload-status');
const uploadBtn = document.getElementById('upload-btn');
const adminImageGrid = document.getElementById('admin-image-grid');

// Check Auth State
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    loginSection.style.display = 'none';
    dashboardSection.style.display = 'block';
    loadImages();
  } else {
    // User is signed out
    loginSection.style.display = 'block';
    dashboardSection.style.display = 'none';
  }
});

// Handle Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('admin-email').value;
  const password = document.getElementById('admin-password').value;
  
  try {
    await signInWithEmailAndPassword(auth, email, password);
    loginStatus.style.display = 'none';
  } catch (error) {
    loginStatus.textContent = "Error: " + error.message;
    loginStatus.className = 'status-msg error';
  }
});

// Handle Logout
logoutBtn.addEventListener('click', () => {
  signOut(auth);
});

// Handle Image Upload
uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fileInput = document.getElementById('image-file');
  const category = document.getElementById('image-category').value;
  const title = document.getElementById('image-title').value;
  
  if (fileInput.files.length === 0) return;
  const file = fileInput.files[0];

  uploadBtn.disabled = true;
  uploadBtn.textContent = 'Uploading to Cloudinary...';
  uploadStatus.style.display = 'none';

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
      throw new Error('Failed to upload image to Cloudinary. Check your CloudName and UploadPreset.');
    }

    const cloudinaryData = await cloudinaryRes.json();
    const imageUrl = cloudinaryData.secure_url;

    // 2. Save URL to Firestore
    uploadBtn.textContent = 'Saving to Database...';
    
    await addDoc(collection(db, 'portfolio_images'), {
      url: imageUrl,
      category: category,
      title: title || 'Untitled',
      createdAt: serverTimestamp()
    });

    uploadStatus.textContent = "Image uploaded and saved successfully!";
    uploadStatus.className = 'status-msg success';
    uploadForm.reset();
    
    // Reload images
    loadImages();

  } catch (error) {
    console.error(error);
    uploadStatus.textContent = "Error: " + error.message;
    uploadStatus.className = 'status-msg error';
  } finally {
    uploadBtn.disabled = false;
    uploadBtn.textContent = 'Upload to Cloudinary';
  }
});

// Load Images from Firestore
async function loadImages() {
  adminImageGrid.innerHTML = '<p>Loading images...</p>';
  try {
    const q = query(collection(db, 'portfolio_images'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      adminImageGrid.innerHTML = '<p>No images uploaded yet.</p>';
      return;
    }

    adminImageGrid.innerHTML = '';
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const card = document.createElement('div');
      card.className = 'image-card';
      card.innerHTML = `
        <img src="${data.url}" alt="${data.title}">
        <div style="padding: 0.5rem; font-size: 0.9rem;">
          <strong>${data.title}</strong><br>
          <span style="color: #666; font-size: 0.8rem;">Category: ${data.category}</span>
        </div>
        <button class="delete-btn" data-id="${docSnap.id}">Delete</button>
      `;
      adminImageGrid.appendChild(card);
    });

    // Add delete event listeners
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.target.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this image? (This removes it from the website, but not from Cloudinary)')) {
          e.target.textContent = 'Deleting...';
          e.target.disabled = true;
          await deleteDoc(doc(db, 'portfolio_images', id));
          loadImages();
        }
      });
    });

  } catch (error) {
    console.error("Error loading images:", error);
    adminImageGrid.innerHTML = `<p style="color: red;">Error loading images: ${error.message}</p>`;
  }
}
