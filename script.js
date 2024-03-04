const API_KEY = "2d705958951f4869bef9c7c354f16bbf";
const url = "https://newsapi.org/v2/everything?q=";

// loading
window.addEventListener("load", () => fetchNews("India"));

function reload(){
    window.location.reload();   
}
//fetching the data from api
async function fetchNews (query){
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

// binding the data
function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = '';

    articles.forEach(article =>{
        if(!article.urlToImage ) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);// we are colning the all the div by this not only one
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    }) 
}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

     const date = new Date(article.publishedAt).toLocaleString("en-us",{
        timeZone: "Asia/Jakarta"
     });

     newsSource.innerHTML = `${article.source.name} ${date}`;
        // newsSource.innerHTML = article.source.name;
    //  console.log(date);
    cardClone.firstElementChild.addEventListener("click",() =>{
        window.open(article.url,"_blank");
    })
}

let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');

}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click",() =>{
        const query = searchText.value;
        console.log(query);
        if(!query) return;
        fetchNews(query);
        curSelectedNav?.classList.remove("active");
        curSelectedNav = null;

});
