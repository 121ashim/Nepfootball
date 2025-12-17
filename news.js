// ✅ Call YOUR backend (not NewsAPI directly)
const url = "/news/";

// Load default news on page load
window.addEventListener("load", () => {
    fetchNews("soccer");
});

// Reload page
function reload() {
    window.location.reload();
}

// Fetch news from backend
async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}`);
        const data = await res.json();
        bindData(data.articles);
    } catch (error) {
        console.error("News fetch error:", error);
    }
}

// Bind news cards
function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    if (!articles) return;

    articles.forEach((article) => {
        if (!article.urlToImage) return;

        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

// Fill card data
function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerText = article.title;
    newsDesc.innerText = article.description || "";

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Kathmandu",
    });

    newsSource.innerText = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

// Search functionality
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value.trim();
    if (!query) return;
    fetchNews(query);
});
