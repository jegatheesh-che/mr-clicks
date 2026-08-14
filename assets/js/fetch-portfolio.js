import { db } from './firebase-config.js';
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

async function loadDynamicPortfolio() {
  try {
    // 1. Fetch Categories dynamically
    const categoriesQ = query(collection(db, 'categories'), orderBy('createdAt', 'asc'));
    const categoriesSnap = await getDocs(categoriesQ);
    
    const filterContainer = document.querySelector('.portfolio-filters');
    if (filterContainer && !categoriesSnap.empty) {
      let filtersHTML = `<button class="filter-btn active" onclick="filterPortfolio('all', this)">All Work</button>`;
      categoriesSnap.forEach(docSnap => {
        const cat = docSnap.data();
        filtersHTML += `<button class="filter-btn" onclick="filterPortfolio('${cat.slug}', this)">${cat.name}</button>`;
      });
      filterContainer.innerHTML = filtersHTML;
    }

    // 2. Fetch Images dynamically
    const q = query(collection(db, 'portfolio_images'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (window.PORTFOLIO_IMAGES_DATA) {
        window.PORTFOLIO_IMAGES_DATA.push({
          url: data.url,
          category: data.category || 'weddings',
          title: data.title || 'Portfolio Image'
        });
      }
    });

    // 3. Re-render the portfolio
    if (typeof window.renderPortfolio === 'function') {
      const activeBtn = document.querySelector('.filter-btn.active');
      let currentFilter = 'all';
      if (activeBtn && activeBtn.textContent !== 'All Work') {
        currentFilter = activeBtn.getAttribute('onclick').match(/'([^']+)'/)[1];
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
