const searchEvent = document.getElementById("search-container");
const searchBar = document.getElementById("search-bar");
const moviesContainer = document.getElementById("movies-container");
const explore = document.getElementsByClassName("explore")[0];
const unable = document.getElementsByClassName("unable")[0];
const addWatchlistBtns = document.getElementsByClassName("add-remove-watchlist");
const addWatchlistTextBtns = document.getElementsByClassName("watchlist-span");


let filmInfo = [];
let filmArray = [];

searchEvent.addEventListener("submit", function(e) {
    e.preventDefault();
    explore.classList.add("hidden");
    moviesContainer.innerHTML = "";
    searchFilm();
})

function searchFilm(){
    fetch(`http://www.omdbapi.com/?s=${searchBar.value}&apikey=4023427c`)
        .then(res => res.json())
        .then(data => {
            filmInfo = [];
            filmArray = [];
            filmArray = data.Search;
            if(typeof filmArray === "undefined"){
                unable.classList.remove("hidden");
            } else{
                watchlistTracker = 0;
                if(unable.classList.contains("hidden")){
                    
                } else{
                    unable.classList.add("hidden");
                };

                for(let film of filmArray){
                    fetch(`http://www.omdbapi.com/?i=${film.imdbID}&apikey=4023427c`)
                        .then(res => res.json())
                        .then(data => {
                            renderFilm(data);
                            filmInfo.push(data);
                            watchlistListener(filmInfo);
                        });
                };
            };
        })
};

function watchlistListener(filmInfo){
    filmInfo.forEach(function(item, index){
        addWatchlistBtns[index].addEventListener("click", function(e){
            e.preventDefault();
            console.log(item);
            addWatchlistTextBtns[index].innerText = "Added";
            addWatchlistBtns[index].disabled = true;
            console.log("test");
            localStorage.setItem(item.imdbID, JSON.stringify(item));
        });
    });
};

function renderFilm(film){
    const poster = film.Poster;
    const title = film.Title;
    let rating;
    const time = film.Runtime;
    const genre = film.Genre;
    const description = film.Plot;

    if(film.Ratings.length === 1){
        rating = film.Ratings[0].Value;
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
                        <span class="watchlist-span">Watchlist</span>
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
};
