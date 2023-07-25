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

    const submit = document.getElementById('submit-form')
    if(!id){
        submit.disabled = true;
    }
    else {
        submit.addEventListener("click", submitForm);
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

function submitForm(event) {
    console.log('submit...')

    const submit = document.getElementById('submit-form')
    submit.disabled = true;
    const loader = document.getElementById('loader')
    loader.style.display = 'block'
    const boxTools = document.getElementsByClassName('box-tools')[0]
    boxTools.style.opacity = '0.2'

    const statusRes = document.getElementById('status-res')

    fetch(localStorage.getItem('apiendpoint'))
        .then(response => {
            if(response.status == 200){
                statusRes.innerHTML = 'status ' + response.status + ' in ' + new Date().getTime()
                return response.json()
            }
            else {
                statusRes.innerHTML = 'status ' + response.status + ' in ' + new Date().getTime()
                return null;
            }
        })
        .then(data => {
            console.log(data)

            submit.disabled = false;
            loader.style.display = 'none'
            boxTools.style.opacity = '1'
        })
        .catch(error => {
            console.error(error)

            submit.disabled = false;
            loader.style.display = 'none'
            boxTools.style.opacity = '1'
        });
}
