import { db } from './firebase-config.js';
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

async function loadDynamicPortfolio() {
  try {
    const q = query(collection(db, 'portfolio_images'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      // Push the dynamic images to the existing hardcoded array
      // Note: PORTFOLIO_IMAGES_DATA is a global constant array defined in app.js
      if (window.PORTFOLIO_IMAGES_DATA) {
        window.PORTFOLIO_IMAGES_DATA.unshift({
          url: data.url,
          category: data.category || 'weddings',
          title: data.title || 'Portfolio Image'
        });
      }
    });

    // Re-render the portfolio if the function exists
    if (typeof window.renderPortfolio === 'function') {
      // Get current active filter
      const activeBtn = document.querySelector('.filter-btn.active');
      let currentFilter = 'all';
      if (activeBtn) {
        if (activeBtn.textContent.toLowerCase().includes('weddings')) currentFilter = 'weddings';
        else if (activeBtn.textContent.toLowerCase().includes('stories')) currentFilter = 'stories';
        else if (activeBtn.textContent.toLowerCase().includes('lifestyle')) currentFilter = 'lifestyle';
        else if (activeBtn.textContent.toLowerCase().includes('branding')) currentFilter = 'branding';
      }
      window.renderPortfolio(currentFilter);
    }
    
  } catch (error) {
    console.error("Error loading dynamic portfolio images:", error);
  }
}

// Ensure it runs after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Give app.js a tiny moment to initialize its variables if needed, though they should be ready
  setTimeout(loadDynamicPortfolio, 100);
});
