const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const facebookBtn = document.getElementById("facebook-button");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById('loader'); 

/* show loading */
function showLoadingSpinner (){

    loader.hidden = false;
    quoteContainer.hidden = true;

}
// hide loading 

function removeLoadingSpinner (){
    if (!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}


//get quote from api

async function getQuote() {
  showLoadingSpinner();
  const proxyUrl = "https://sleepy-tor-37540.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    /* if author is blank, ad unknown to autor text */

    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    // reduce font size for long quotes

    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }

    quoteText.innerText = data.quoteText;
    //stop loader show quote
    removeLoadingSpinner();
  } catch (error) {
    getQuote();
  }
}

//tweet the desired quote
function tweetQUote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author};`;
  window.open(twitterUrl, "_blank");
}

//Event listeners

newQuoteBtn.addEventListener("click", getQuote);

facebookBtn.addEventListener("click", tweetQUote);

//On Load
getQuote();
