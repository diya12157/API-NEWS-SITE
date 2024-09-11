const API_KEY = "72b62fed72ed45f3a33d11744b61944b";
const url = "https://newsapi.org/v2/everything?q=tesla&from=2024-08-04&sortBy=publishedAt&apiKey=72b62fed72ed45f3a33d11744b61944b";
const turl = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=72b62fed72ed45f3a33d11744b61944b";

window.addEventListener("load", () => TopNews());


async function fetchNews(query) {
    console.clear();
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles); console.clear();

}

async function TopNews() {
    const res = await fetch(`${turl}`);
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
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");

    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

function mode() {
    document.body.classList.toggle("dark-mode");

}
function verifyForm() {

    const selectedTopics = getCheckedValues();
    if (selectedTopics.length > 0) {

      document.getElementById("form").style.display = "none";
    }

    selectedTopics.forEach((item) => {
        const cartItems = document.getElementById('navLink');
        const li = document.createElement('li');
        li.classList.add("hover-link", "nav-item");
        li.setAttribute('onclick', `onNavItemClick("${item}")`);
        li.setAttribute('id', `${ item }`);
        li.textContent = item;
        cartItems.appendChild(li);

    })

  
}
function getCheckedValues() {

    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="topic"]');
    const checkedValues = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkedValues.push(checkbox.value);
        }
    });

    return checkedValues;
}
