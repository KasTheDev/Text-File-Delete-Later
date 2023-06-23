const searchBtn = document.getElementById('search-btn')
let searchArray = []
let imdbIDArray = []

searchBtn.addEventListener('click', async () => {
    let searchInput = document.getElementById('movie-search').value
    await getImdb(searchInput)
    const movieData = await getMovieData()
    renderMovies(movieData)
    document.getElementById('movie-search').value = ""
})

async function getImdb(searchInput) {
    const response = await fetch(`https://www.omdbapi.com/?s=${searchInput}&apikey=1a8947bd`)
    const data = await response.json()
    searchArray = data.Search
    for (let i = 0; i < searchArray.length; i++) {
        imdbIDArray.push(searchArray[i].imdbID)
    }
    console.log(imdbIDArray)
}

async function getMovieData() {
  const movieDataPromises = imdbIDArray.map(async (imdbID) => {
    const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=1a8947bd`)
    return response.json()
  });

  const movieData = await Promise.all(movieDataPromises)
  console.log(movieData)
  return movieData
}

function renderMovies(movieData){
    let html = ""
    for(let movies of movieData){
        html += `
        <div class="movie-card">
            <img class="movie-poster" src="${movies.Poster}">
            <div class="movie-info">
                <div class="movie-header">
                    <h2 class="movie-title">${movies.Title}</h2>
                    <h3 class="imdb-rating">⭐${movies.imdbRating}</h3>
                </div>
                <div class="movie-subheader">
                    <h3 class="movie-runtime">${movies.Runtime}</h3>
                    <h3 class="movie-genre">${movies.Genre}</h3>
                    <a class="card-watchlist" href="watchlist.html" ><i class="fa-solid fa-circle-plus"></i>  Watchlist</a>
                </div>
                <h4 class="movie-plot">${movies.Plot}</h4>
            </div>
        </div>`
    }
    document.getElementById("movie-container").innerHTML = html
    searchArray=[]
    imdbIDArray=[]
}

// async function getMovieData() {
//     const response = await fetch(`https://www.omdbapi.com/?i=${imdbIDArray[0]}&apikey=1a8947bd`);
//     const data = await response.json();
//     console.log(data);
// }


// function renderMovies(searchArray){
//     let html = ""
//     for(let movies of searchArray){
//         html += `
//         <img class="movie-poster" src="${movies.Poster}">
//         <div class = "movie-info">
//             <h2 class="movie-title">${movies.Title}<h2>
//         </div>
//         `
//     }
//     document.getElementById('movie-container').innerHTML = html
// }