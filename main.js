const body = document.body;
//getting data
const getData = async () =>{
    const response = await fetch("https://api.tvmaze.com/shows/179/episodes");
    let data = await response.json();

    createCards(data);
};
//header
const headerElements = () =>{
    const header = document.createElement("header");

    const nav = document.createElement("nav");
    nav.classList.add("navigation");

    const title = document.createElement("h2");
    title.textContent = "TV MAZE > The Wire";

    const searchBarDiv = document.createElement("div");
    searchBarDiv.className = "searchbar-div";

    const searchIcon = document.createElement("img");
    searchIcon.src = "./img/searchIcon.svg";

    const searchBar = document.createElement("input");
    searchBar.className = "searchbar";
    searchBar.type = "search";
    searchBar.placeholder = "Search Here";

    const result = document.createElement("p");
    result.className ="show-result"

    //add
    searchBarDiv.append(searchBar);
    searchBarDiv.append(searchIcon);
    nav.append(title);
    nav.append(searchBarDiv);
    header.append(nav);
    nav.append(result)
    body.append(header);
};
//main elements
const mainElements = () => {
    const main = document.createElement("main");

    const episodes = document.createElement("div");
    episodes.className = "episodes";

    main.append(episodes);
    body.querySelector("header").insertAdjacentElement("afterend",main);
};
const createCards = (data) =>{
    let cardsData = [...data];
    const navigation = document.querySelector("header");

    const episodeOption = document.createElement("option");
    episodeOption.innerText = "Select Episode";
    episodeOption.setAttribute("selected", "selected");
    episodeOption.setAttribute("disabled","disabled");

    const select = document.createElement("select");
    select.className = "select-episode";

    cardsData.forEach((e)=>{
        const option = document.createElement("option");
        option.className = "episode-option";
        option.innerText = `S${String(e.season).padStart(2,"0")}E${String(e.number).padStart(2, "0")} : ${e.name}`;
        option.value = e.url;
        select.append(option);
    });
    select.prepend(episodeOption);
    navigation.append(select);

    select.addEventListener("change",()=>{
        if(select.value != episodeOption.value)
            window.open(select.value);
    });
    //cards
    cardsData.forEach((e)=>{
        const card = document.createElement("div");
        card.className = "card";
        card.classList.add("show")
        const picture = document.createElement("img");
        picture.src = e.image.medium;
        picture.className = "card-img"
        picture.alt = e.name;

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const cardInformation = document.createElement("div");
        cardInformation.className = "card-information";
        
        const cardTitle = document.createElement("h3");
        cardTitle.className = "card-title";
        cardTitle.innerText = e.name;

        const seasonInfo = document.createElement("h4");
        seasonInfo.className = "card-infoSeason"
        seasonInfo.innerText = `S${String(e.season).padStart(2,"0")}E${String(e.number).padStart(2, "0")}`;

        const descriptionText = document.createElement("p");
        descriptionText.className = "description"
        descriptionText.innerHTML = e.summary;
        descriptionText.innerHTML = descriptionText.innerHTML.substring(0,120)+"..."
        const cardButton = document.createElement("a");
        cardButton.classList = "card-button";
        cardButton.innerText = "Watch";
        cardButton.href = e.url;

        cardInformation.append(cardTitle);
        cardInformation.append(seasonInfo);
        cardBody.append(cardInformation);
        cardBody.append(descriptionText);
        cardBody.append(cardButton);
        card.append(picture);
        card.append(cardBody);
        body.querySelector(".episodes").append(card);
    });
};
const footerElements = () =>{
    const footer = document.createElement("footer");
    footer.className = "footer";
    body.querySelector("main").insertAdjacentElement("afterend",footer);

    const licenseText = document.createElement("p");
	licenseText.className = "tvmaze-api-license";

    const licenseLink = document.createElement("a");
    licenseLink.innerText = "This website created by TVmaze Api";
    licenseLink.href = "https://www.tvmaze.com/api#licensing";
    licenseLink.target = "_blank";

    const designer = document.createElement("p");
    designer.className = "designer";
    designer.innerText = "Designed by Mohammad Javad Salehi"
    licenseText.append(licenseLink);
    footer.append(licenseText);
    footer.append(designer);
};
getData();
headerElements();
mainElements();
//search function
let searchBox = document.querySelector(".searchbar");
searchBox.addEventListener("input",()=>{
    const cards = document.querySelectorAll(".card");

    let val = searchBox.value.toLowerCase();
    cards.forEach((e)=>{
        const cardsTitle = e.querySelector(".card-title").innerText.toLowerCase();
        if(cardsTitle.includes(val)){
            e.classList.add("show");
            e.classList.remove("hide");
        }
        else{
            e.classList.add("hide");
            e.classList.remove("show");
        }
    });
    const result = document.querySelector(".show-result")
    let numS = document.querySelectorAll(".show").length
    result.textContent =numS + " result found"
    if(cards.length == numS) result.textContent = "" 

})
footerElements();