// API from :
// https://developers.themoviedb.org/3/genres

const tmdbKey = '34c2ed67ae7d6835a304a7604b8c7c86';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
    const genreRequestEndpoint = '/genre/movie/list'
    const requestParams = `?api_key=${tmdbKey}`
    const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`

    try {
        const response = await fetch(urlToFetch)
        if (response.ok) {
            const jsonResponse = await response.json()
            // console.log(jsonResponse)
            const genres = jsonResponse.genres
            return genres
        }
    }
    catch(error) {
        console.log(error)
    }

};

const getMovies = async () => {

    let movies = null;
    while (!movies) {

    
    const selectedGenre = getSelectedGenre();
    const discoverMovieEndpoint = '/discover/movie'
    const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`

    //   select a random results page
    const randomPage = Math.ceil(Math.random() * 1000)
    const pageToShow = `&page=${randomPage}`
    console.log(randomPage)
    const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}${pageToShow}`
        
    try {
        response = await fetch(urlToFetch)
        if (response.ok) {
            const jsonResponse = await response.json()
            // console.log(jsonResponse)
            const movies = jsonResponse.results
            console.log(movies)
            return movies
        } 

    }
    catch(error) {
        console.log(error)
    }
}
};

//  call getMovies to check output to console and movie attributes
// getMovies()

const getMovieInfo = async (movie) => {
    const movieId = movie.id
    const movieEndpoint = `/movie/${movieId}`
    const requestParams = `?api_key=${tmdbKey}`
    const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`

    try {
        const response = await fetch(urlToFetch)
        if (response.ok) {
            const movieInfo = await response.json()
            console.log(movieInfo)
            return movieInfo
        }
    }
    catch(error) {
        console.log(error)
    }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
let randomMovieTitle;
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies()
  const randomMovie = getRandomMovie(movies)
  info = await getMovieInfo(randomMovie)
  randomMovieTitle = info.title
  displayMovie(info)
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
