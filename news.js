const API_KEY = "b5207fb060a54fe0ad5200ae697e4b44"; // news APi le deko api
const url = "https://newsapi.org/v2/everything?q=";// news api bata leko 

window.addEventListener("load", () => fetchNews("soccer"));// website load huna ko lagi eventlistener suru ma weather section dekhauna wihtout seaching

function reload() {
    window.location.reload();
    
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);//aako data articles ma hunxa
}

function bindData(articles) {// teslai bind garni
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";//yo garena vane data aako aai garxa thapidai janxa

    articles.forEach((article) => {
        if (!article.urlToImage) return;// photo navako image lai return gardai
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}
   
function fillDataInCard(cardClone, article) {// html ko id bata login milaudai

    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Kathmandu",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;
// article lai click garda tyo original link ma lanxa
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
    
}



//  references dinalai to the search button and search text input elements.
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");
// event listener add gareko to search button
searchButton.addEventListener("click", () => {
    //search text input bata search query lina
    const query = searchText.value;
    // edi kei query xaina vane reuturn gardini
    if (!query) return;
    // news lai fetch garni to search query
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;

});

// -------- NEWS API (Backend Proxy) --------
const NEWS_API_KEY = "b5207fb060a54fe0ad5200ae697e4b44";

app.get("/news/:query", async (req, res) => {
  try {
    const query = req.params.query;
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&apiKey=${NEWS_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});
