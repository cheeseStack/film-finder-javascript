
// Populate dropdown menu with all the available genres
const populateGenreDropdown = (genres) => {
    const select = document.getElementById('genres')

    for (const genre of genres) {
        let option = document.createElement("option");
        option.value = genre.id;
        option.text = genre.name;
        select.appendChild(option);
    }
};

// Returns the current genre selection from the dropdown menu
const getSelectedGenre = () => {
    const selectedGenre = document.getElementById('genres').value;
    return selectedGenre;
};

// Displays the like and dislike buttons on the page
const showBtns = () => {
    const btnDiv = document.getElementById('likeOrDislikeBtns');
    btnDiv.removeAttribute('hidden');
};

// Clear the current movie from the screen
const clearCurrentMovie = () => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    const movieTitleDiv = document.getElementById('movieTitle')
    const movieReleaseDateDiv = document.getElementById('movieReleaseDate')
    const movieRuntimeDiv = document.getElementById('movieDuration')
    moviePosterDiv.innerHTML = '';
    movieTextDiv.innerHTML = '';
    movieTitleDiv.innerHTML = '';
    movieReleaseDateDiv.innerHTML = '';
    movieRuntimeDiv.innerHTML = '';

}

const showLikeDislikeDiv = () => {
    document.getElementById('likeOrDislikeListsDiv').style.display = 'flex'
}


// After liking a movie, clears the current movie from the screen and gets another random movie
let likeListArray = []

const likeMovie = () => {
    const movieName = randomMovieTitle
    likeListArray.push(movieName)
    // console.log(`movie name: ${movieName}`)
    // console.log(`like List: ${likeListArray}`)
    clearLikeList()
    renderLikeList(likeListArray)
    clearCurrentMovie();
    showRandomMovie();
    showLikeDislikeDiv()
};

// function to create like List and render to the DOM
const renderLikeList = (movieArray) => {
    // create a ul element
    let movieListUl = document.createElement('ul')
    movieArray.forEach((movie) => {
        let movieLi = document.createElement('li')
        movieLi.setAttribute('class', 'like')
        movieLi.innerHTML = movie
        movieListUl.appendChild(movieLi)
    })

    const movieListDiv = document.getElementById('likesListDiv')
    movieListDiv.innerHTML = `<h5>Likes:</h5>`
    movieListDiv.appendChild(movieListUl)
}

const clearLikeList = () => {
    const movieListUl = document.getElementById('likesListDiv')
    movieListUl.innerHTML = ''
}


// Function for dislike list
const renderDislikeList = (movieArray) => {
    // create the ul element
    const dislikeListUl = document.createElement('ul')

    // forEach method for the array
    movieArray.forEach((movie) => {
        let movieLi = document.createElement('li')
        movieLi.setAttribute('class', 'dislike')
        movieLi.innerHTML = movie
        dislikeListUl.append(movieLi)
    })
    const dislikeListDiv = document.getElementById('dislikesListDiv')
    dislikeListDiv.innerHTML = `<h5>Dislikes:</h5>`
    dislikeListDiv.appendChild(dislikeListUl)
}

//  function to clear the dislike list ul

const clearDislikeList = () => {
    const dislikeListDiv = document.getElementById('dislikesListDiv')
    dislikeListDiv.innerHTML = ''
}



// array for disliked movies
let dislikeListArray = []
// After disliking a movie, clears the current movie from the screen and gets another random movie
const dislikeMovie = () => {
    const movieName = randomMovieTitle
    dislikeListArray.push(movieName)
    clearDislikeList()
    renderDislikeList(dislikeListArray)
    clearCurrentMovie();
    showRandomMovie();
    showLikeDislikeDiv()
};

// Create HTML for movie poster
const createMoviePoster = (posterPath) => {
    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

    const posterImg = document.createElement('img');
    posterImg.setAttribute('src', moviePosterUrl);
    posterImg.setAttribute('id', 'moviePoster');
  
    return posterImg;
};

// Create HTML for movie title
const createMovieTitle = (title) => {
    const titleHeader = document.createElement('h1');
    titleHeader.setAttribute('id', 'movieTitle');
    titleHeader.innerHTML = `<h5>Title:</h5>${title}`;

    
    return titleHeader
};

// Create HTML for movie overview
const createMovieOverview = (overview) => {
    const overviewParagraph = document.createElement('p');
    overviewParagraph.setAttribute('id', 'movieOverview');
    overviewParagraph.innerHTML = `<h5>Overview:</h5>${overview}`;
  
    return overviewParagraph;
};


// Create the released date p element
const createReleaseDate = (release_date) => {
    const releaseDateElement = document.createElement('p')
    releaseDateElement.setAttribute('id', 'releaseDate')
    const dateParts = release_date.split('-')
    const year = dateParts[0]
    releaseDateElement.innerHTML = `<h6>Released: </h6> ${year}`

    return releaseDateElement
}


// Create the Movie Length p element
const createRuntime = (runtime) => {
    const movieRuntime = document.createElement('p')
    movieRuntime.setAttribute('id', 'movieRuntime')
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    movieRuntime.innerHTML = `<h6>Runtime: </h6>${hours}h ${minutes}min`

    return movieRuntime
}


// Returns a random movie from the first page of movies
const getRandomMovie = (movies) => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    return randomMovie;
};

// Uses the DOM to create HTML to display the movie
const displayMovie = (movieInfo) => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTitleDiv = document.getElementById('movieTitle')
    const movieTextDiv = document.getElementById('movieText');
    const likeBtn = document.getElementById('likeBtn');
    const dislikeBtn = document.getElementById('dislikeBtn');
    // release date, runtime, director, cast divs
    const movieReleaseDateDiv = document.getElementById('movieReleaseDate')
    const movieRuntimeDiv = document.getElementById('movieDuration')
  
    // Create HTML content containing movie info
    const moviePoster = createMoviePoster(movieInfo.poster_path);
    const titleHeader = createMovieTitle(movieInfo.title);
    const overviewText = createMovieOverview(movieInfo.overview);
  
    // create year, runtime, director, cast
    const movieReleaseDate = createReleaseDate(movieInfo.release_date)
    const movieRuntimeInfo = createRuntime(movieInfo.runtime)

    // Append title, poster, and overview to page
    moviePosterDiv.appendChild(moviePoster);
    movieTitleDiv.appendChild(titleHeader);
    movieTextDiv.appendChild(overviewText);
    movieReleaseDateDiv.appendChild(movieReleaseDate)
    movieRuntimeDiv.appendChild(movieRuntimeInfo)
   

    // Append release date, runtime, director, cast
  
    showBtns();
    likeBtn.onclick = likeMovie;
    dislikeBtn.onclick = dislikeMovie;
};

