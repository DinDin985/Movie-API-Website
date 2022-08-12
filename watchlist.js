const emptyText = document.getElementsByClassName("empty-text-add")[0];
const moviesContainer = document.getElementById("movies-container");
const removeBtns = document.getElementsByClassName("add-remove-watchlist");
const spanRemove = document.getElementsByClassName("watchlist-span");

grabWatchlist();
emptyCheck();

function emptyCheck(){
    if(moviesContainer.innerHTML!== ""){
        emptyText.classList.add("hidden");
    } else {
        emptyText.classList.remove("hidden");
    }
};

function grabWatchlist(){
    const keyArray = Object.keys(localStorage);
    keyArray.forEach(function(item, index){
        console.log(item);
        const convertItem = JSON.parse(localStorage.getItem(item));
        const poster = convertItem.Poster;
        const title = convertItem.Title;
        let rating = convertItem.Rating;
        const time = convertItem.Runtime;
        const genre = convertItem.Genre;
        const description = convertItem.Plot;

        if(convertItem.Ratings.length === 1){
            rating = convertItem.Ratings[0].Value;
        } else{
            rating = "";
        };

        moviesContainer.innerHTML += `
        <div class="movie-container">
        <div class="movie">
            <div class="img-container">
                <img src="${poster}" alt="Poster for ${title}">
            </div>
            
            <div class="right-container">
                <div class="title">
                    <h2>${title}</h2>
                    <div class="rating-img"></div>
                    <p class="rating">${rating}</p>
                </div>

                <div class="tags">
                    <p class="time">${time}</p>
                    <p class="genre">${genre}</p>
                    <button class="add-remove-watchlist" type="button">
                        <span class="watchlist-span">Remove</span>
                    </button>
                </div>

                <div class="description">
                    <p>${description}
                    </p>
                </div>
            </div>
        </div>
    </div>
    `;
    });

    keyArray.forEach(function(item, index){
        removeBtns[index].addEventListener("click", function(){
            localStorage.removeItem(item);
            spanRemove[index].innerText = "Removed";
            removeBtns[index].disabled = true;
        });
    });
    
};