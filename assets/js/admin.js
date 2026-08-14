import { auth, db, cloudinaryConfig } from './firebase-config.js';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
  collection, addDoc, getDocs, deleteDoc,
  doc, serverTimestamp, query, orderBy, writeBatch
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ─── DOM refs ───────────────────────────────────────────────────
const viewLogin     = document.getElementById('view-login');
const viewDashboard = document.getElementById('view-dashboard');
const appNav        = document.getElementById('app-nav');
const loginForm     = document.getElementById('login-form');
const loginError    = document.getElementById('login-error');
const loginBtn      = document.getElementById('login-btn');
const logoutBtn     = document.getElementById('logout-btn');
const uploadForm    = document.getElementById('upload-form');
const uploadBtn     = document.getElementById('upload-btn');
const imageGrid     = document.getElementById('admin-image-grid');
const galleryCount  = document.getElementById('gallery-count');
const selectModeBtn = document.getElementById('select-mode-btn');
const bulkBar       = document.getElementById('bulk-bar');
const bulkCountText = document.getElementById('bulk-count-text');
const bulkDeleteBtn = document.getElementById('bulk-delete-btn');

// ─── State ───────────────────────────────────────────────────────
let selectionMode = false;
let selected = new Set();       // doc IDs

// ─── Toast ───────────────────────────────────────────────────────
function toast(msg, type = 'info') {
  const wrap = document.getElementById('toast-container');
  const el = document.createElement('div');
  const icons = { success: 'check-circle', error: 'alert-circle', info: 'info' };
  el.className = `toast toast-${type}`;
  el.innerHTML = `<i data-feather="${icons[type] || 'info'}"></i><span>${msg}</span>`;
  wrap.appendChild(el);
  if (window.feather) feather.replace({ 'stroke-width': 2 });
  setTimeout(() => {
    el.classList.add('out');
    setTimeout(() => el.remove(), 300);
  }, 3500);
}

// ─── Auth state ───────────────────────────────────────────────────
onAuthStateChanged(auth, user => {
  if (user) {
    showView(viewDashboard);
    appNav.style.display = '';
    loadImages();
  } else {
    showView(viewLogin);
    appNav.style.display = 'none';
    exitSelectionMode();
  }
});

function showView(target) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  target.classList.add('active');
}

// ─── Login ────────────────────────────────────────────────────────
loginForm.addEventListener('submit', async e => {
  e.preventDefault();
  const email    = document.getElementById('admin-email').value.trim();
  const password = document.getElementById('admin-password').value;
  loginError.style.display = 'none';
  loginBtn.disabled = true;
  loginBtn.textContent = 'Signing in…';
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast('Welcome back!', 'success');
  } catch (err) {
    loginError.style.display = 'block';
    loginError.textContent = friendlyAuthError(err.code);
  } finally {
    loginBtn.disabled = false;
    loginBtn.textContent = 'Sign In';
  }
});

function friendlyAuthError(code) {
  const map = {
    'auth/wrong-password':        'Incorrect password. Please try again.',
    'auth/user-not-found':        'No account found with that email.',
    'auth/invalid-email':         'Please enter a valid email address.',
    'auth/too-many-requests':     'Too many attempts. Please wait and try again.',
    'auth/invalid-credential':    'Invalid email or password.',
  };
  return map[code] || 'Login failed. Please check your credentials.';
}

// ─── Logout ───────────────────────────────────────────────────────
logoutBtn.addEventListener('click', () => {
  signOut(auth);
  toast('Signed out', 'info');
});

// ─── Upload ───────────────────────────────────────────────────────
uploadForm.addEventListener('submit', async e => {
  e.preventDefault();

  const fileInput = document.getElementById('image-file');
  const category  = document.getElementById('image-category').value;
  const baseTitle = document.getElementById('image-title').value.trim();
  const progressWrap = document.getElementById('upload-progress-wrap');
  const progressBar  = document.getElementById('upload-progress-bar');
  const progressText = document.getElementById('upload-progress-text');

  if (!fileInput.files.length) {
    toast('Please select at least one photo first', 'error');
    return;
  }

  const files = Array.from(fileInput.files);
  const total = files.length;

  uploadBtn.disabled = true;
  uploadBtn.innerHTML = '<svg class="spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"/></svg> Uploading…';
  progressWrap.style.display = 'block';
  progressBar.style.width = '0%';
  progressText.textContent = `Uploading 0 of ${total}…`;

  let done = 0;
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`;

  try {
    // Sequential upload to show progress bar properly
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', cloudinaryConfig.uploadPreset);

      const res = await fetch(cloudinaryUrl, { method: 'POST', body: formData });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error?.message || 'Cloudinary upload failed');
      }

      const data = await res.json();

      let title = baseTitle;
      if (total > 1) {
        title = baseTitle ? `${baseTitle} ${i + 1}` : `Photo ${i + 1}`;
      } else if (!baseTitle) {
        title = 'Untitled';
      }

      await addDoc(collection(db, 'portfolio_images'), {
        url:       data.secure_url,
        category:  category,
        title:     title,
        createdAt: serverTimestamp(),
      });

      done++;
      const pct = Math.round((done / total) * 100);
      progressBar.style.width = `${pct}%`;
      progressText.textContent = `Uploading ${done} of ${total}…`;
    }

    toast(`${done} photo${done > 1 ? 's' : ''} uploaded successfully!`, 'success');
    uploadForm.reset();
    document.getElementById('file-name-display').textContent = 'Tap to select photos';
    document.getElementById('file-sub').textContent = 'Supports JPG, PNG, WEBP';

    // Switch to Gallery
    document.querySelector('.nav-item[data-target="view-dashboard"]').click();
    loadImages();

  } catch (err) {
    console.error('Upload error:', err);
    toast('Upload failed: ' + err.message, 'error');
  } finally {
    uploadBtn.disabled = false;
    uploadBtn.innerHTML = '<i data-feather="upload"></i> Upload to Portfolio';
    if (window.feather) feather.replace({ 'stroke-width': 2 });
    progressWrap.style.display = 'none';
    progressBar.style.width = '0%';
  }
});

// ─── Load images ─────────────────────────────────────────────────
async function loadImages() {
  if (!imageGrid) return;
  imageGrid.innerHTML = '<p class="empty-text">Loading…</p>';

  try {
    const q = query(collection(db, 'portfolio_images'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);

    galleryCount.textContent = `${snap.size} photo${snap.size !== 1 ? 's' : ''} in portfolio`;

    if (snap.empty) {
      imageGrid.innerHTML = '<p class="empty-text">No photos yet — go upload some!</p>';
      return;
    }

    imageGrid.innerHTML = '';
    snap.forEach(docSnap => {
      const d = docSnap.data();
      const el = document.createElement('div');
      el.className = `masonry-item${selectionMode ? ' selectable' : ''}`;
      el.dataset.id = docSnap.id;

      el.innerHTML = `
        <div class="select-check"><i data-feather="check"></i></div>
        <img src="${d.url}" alt="${d.title}" loading="lazy">
        <div class="masonry-overlay">
          <div class="masonry-info">
            <h4>${d.title}</h4>
            <p>${d.category}</p>
          </div>
          <button class="img-delete-btn" data-id="${docSnap.id}" title="Delete">
            <i data-feather="trash-2"></i>
          </button>
        </div>`;
      imageGrid.appendChild(el);
    });

    if (window.feather) feather.replace({ 'stroke-width': 2 });
    attachImageListeners();

  } catch (err) {
    console.error(err);
    imageGrid.innerHTML = `<p class="empty-text" style="color:var(--danger)">Error: ${err.message}</p>`;
  }
}

function attachImageListeners() {
  // Individual delete
  document.querySelectorAll('.img-delete-btn').forEach(btn => {
    btn.addEventListener('click', async e => {
      if (selectionMode) return;
      e.stopPropagation();
      if (!confirm('Delete this photo from your portfolio?')) return;
      btn.disabled = true;
      try {
        await deleteDoc(doc(db, 'portfolio_images', btn.dataset.id));
        toast('Photo deleted', 'success');
        loadImages();
      } catch {
        toast('Delete failed', 'error');
        btn.disabled = false;
      }
    });
  });

  // Selection tap
  document.querySelectorAll('.masonry-item').forEach(item => {
    item.addEventListener('click', () => {
      if (!selectionMode) return;
      const id = item.dataset.id;
      if (selected.has(id)) {
        selected.delete(id);
        item.classList.remove('selected');
      } else {
        selected.add(id);
        item.classList.add('selected');
      }
      updateBulkBar();
    });
  });
}

// ─── Selection Mode ───────────────────────────────────────────────
selectModeBtn.addEventListener('click', () => {
  selectionMode ? exitSelectionMode() : enterSelectionMode();
});

function enterSelectionMode() {
  selectionMode = true;
  selected.clear();
  selectModeBtn.innerHTML = '<i data-feather="x"></i><span>Cancel</span>';
  selectModeBtn.classList.add('btn-danger');
  selectModeBtn.classList.remove('btn-ghost');
  if (window.feather) feather.replace({ 'stroke-width': 2 });

  document.querySelectorAll('.masonry-item').forEach(el => {
    el.classList.add('selectable');
    el.querySelector('.img-delete-btn').style.display = 'none';
  });
  updateBulkBar();
}

function exitSelectionMode() {
  selectionMode = false;
  selected.clear();
  selectModeBtn.innerHTML = '<i data-feather="check-square"></i><span>Select</span>';
  selectModeBtn.classList.remove('btn-danger');
  selectModeBtn.classList.add('btn-ghost');
  if (window.feather) feather.replace({ 'stroke-width': 2 });

  document.querySelectorAll('.masonry-item').forEach(el => {
    el.classList.remove('selectable', 'selected');
    const btn = el.querySelector('.img-delete-btn');
    if (btn) btn.style.display = '';
  });
  bulkBar.classList.remove('show');
}

function updateBulkBar() {
  bulkCountText.textContent = `${selected.size} selected`;
  bulkBar.classList.toggle('show', selected.size > 0);
}

// ─── Bulk Delete ──────────────────────────────────────────────────
bulkDeleteBtn.addEventListener('click', async () => {
  if (!selected.size) return;
  if (!confirm(`Delete ${selected.size} photo${selected.size > 1 ? 's' : ''}? This cannot be undone.`)) return;

  bulkDeleteBtn.disabled = true;
  bulkDeleteBtn.textContent = 'Deleting…';

  try {
    // Firestore batch delete (up to 500 per batch)
    const batch = writeBatch(db);
    selected.forEach(id => batch.delete(doc(db, 'portfolio_images', id)));
    await batch.commit();

    toast(`${selected.size} photo${selected.size > 1 ? 's' : ''} deleted`, 'success');
    exitSelectionMode();
    loadImages();
  } catch (err) {
    console.error(err);
    toast('Bulk delete failed: ' + err.message, 'error');
  } finally {
    bulkDeleteBtn.disabled = false;
    bulkDeleteBtn.innerHTML = '<i data-feather="trash-2"></i> Delete';
    if (window.feather) feather.replace({ 'stroke-width': 2 });
  }
});
