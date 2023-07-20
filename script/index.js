var url = ""
var id = "";

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let tab = tabs[0];
    url = tab.url;
    let urlDisplay = document.getElementById('urlDisplay');
    urlDisplay.textContent = url;

    let isYoutubeSite = isYouTubeWebsite();
    let isYoutube = document.getElementById('isYoutube');
    isYoutube.textContent = isYoutubeSite

    id = getYouTubeIDFromURL()
    let youtubeIds = document.getElementsByClassName('youtubeId');
    for(let i = 0; i < youtubeIds.length; i++){
        youtubeIds[i].textContent = id
    }

    if(!id){
        const submit = document.getElementById('submit-form')
        submit.disabled = true;
    }

    const apiendpointEle = document.getElementById('api-to-call');
    apiendpointEle.addEventListener("blur", storeEndpoint);
    apiendpointEle.value = localStorage.getItem('apiendpoint');

});

function isYouTubeWebsite() {
    const youtubeDomains = ["youtube.com", "youtu.be"];
    const currentURL = url;

    // Check if any of the youtubeDomains is present in the current URL
    for (const domain of youtubeDomains) {
        if (currentURL.includes(domain)) {
            return true;
        }
    }

    return false;
}

function getYouTubeIDFromURL() {
    const urlObj = new URL(url);
    if (urlObj.hostname === "www.youtube.com" || urlObj.hostname === "youtube.com") {
        const searchParams = new URLSearchParams(urlObj.search);
        return searchParams.get("v");
    } else if (urlObj.hostname === "youtu.be") {
        return urlObj.pathname.slice(1);
    } else {
        return null;
    }
}

function storeEndpoint(event) {
    const inputValue = event.target.value;
    localStorage.setItem('apiendpoint', inputValue);
}
