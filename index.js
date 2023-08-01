
const API_KEY = "3a6b8e97418740429d1eb714fc84b2fc";
const url = "https://newsapi.org/v2/everything?q=";


window.addEventListener("load", () => fetchNews("world"));
// window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
   const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
   const data = await res.json();
   bindData(data.articles);
}

function bindData(articles) {
   const cardsContainer = document.getElementById("cards-container");
   const newsCardTemplate = document.getElementById("template-news-card");

   cardsContainer.innerHTML = "";

   articles.forEach((article) => {
      if (!article.urlToImage) return;
      const cardClone = newsCardTemplate.content.cloneNode(true);
      fillData(cardClone, article);
      cardsContainer.appendChild(cardClone);
   });
}

function fillData(cardClone, article) {
   const newsImg = cardClone.querySelector('#news-img');
   const newsTitle = cardClone.querySelector('#news-title');
   const newsSource = cardClone.querySelector('#news-source');
   const newsDesc = cardClone.querySelector('#news-desc');

   newsImg.src = article.urlToImage;
   newsTitle.innerHTML = article.title;
   newsDesc.innerHTML = article.description;

   const date = new Date(article.publishedAt).toLocaleString("en-US", {
      timeZone: "Asia/Jakarta"
   });

   newsSource.innerHTML = `${article.source.name} ${date}`;

   cardClone.firstElementChild.addEventListener('click', () => {
      window.open(article.url, "_blank");
   })
}

let curselectedNav = null;

function onNavItemClick(id) {
   fetchNews(id);
   const navItem = document.getElementById(id);
   curselectedNav?.classList.remove('active');
   curselectedNav = navItem;
   curselectedNav.classList.add('active');
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
   const query = searchText.value;
   if (!query) return;
   fetchNews(query);
   curselectedNav?.classList.remove('active');
   curselectedNav = null;
});


function toggleDarkMode() {
   const body = document.body;
   body.classList.toggle('dark-mode');
}

// Setup the UI
window.addEventListener('load', () => {
   // ... existing JavaScript code ...

   // Set up the dark mode toggle button
   const darkModeButton = document.getElementById('dark-mode-button');
   darkModeButton.addEventListener('click', toggleDarkMode);
});
