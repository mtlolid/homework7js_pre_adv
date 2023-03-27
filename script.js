const sel = (selector) => document.querySelector(selector);

const searchMovie = async () => {
    const searchValue = await searchBar.searchInput.value;
    const response = await fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=b996c29a`);
    const data = await response.json();

    const searchResult = data.Search;
    document.querySelector('main').innerHTML = '';

    for (const elem of searchResult) {
        document.querySelector('main').innerHTML +=
            `<div class="movie">
        <img class="movie__pic" src="${elem.Poster}" height="100%" width="100%" alt="No image"></img>
        <div class="movie__name">
            <p>${elem.Title}</p>
        </div>
        <div class="movie__info">
            <p class="movie__type">${elem.Type}</p>
            <p class="movie__year">${elem.Year}</p>
        </div>
        <button type="button" value = "${elem.Title},${elem.Year}" class="movie__details" onclick="movieDetails()">More details</button>
        </div>`;
    };
};

const showModal = () => {
    document.querySelector('.modal').classList.toggle('show');
    scrollTo(0, 0);
    document.body.classList.toggle('noScroll');

};

const movieDetails = async () => {
    const searchMovie = await event.target.value.split(',');
    const response = await fetch(`https://www.omdbapi.com/?t=${searchMovie[0]}&y=${searchMovie[1]}&plot=full&apikey=b996c29a`);
    const data = await response.json();

    sel('.poster').src = data.Poster;
    sel('.text__title').textContent = data.Title;
    sel('.text__type').textContent = `${data.Rated} ${data.Year} ${data.Genre}`;
    sel('.text__description').textContent = data.Plot;
    sel('.text__writenBy').innerHTML = `<b>Written by:</b>${data.Writer}`;
    sel('.text__directedBy').innerHTML = `<b>Directed by:</b>${data.Director}`;
    sel('.text__starring').innerHTML = `<b>Starring:</b>${data.Actors}`;
    sel('.text__boxOffice').innerHTML = `<b>Box office:</b>${data.BoxOffice}`;
    sel('.text__awards').innerHTML = `<b>Awards:</b>${data.Awards}`;
    sel('.text__ratings').innerHTML = `<b>Ratings:</b><br>`;
    
    for (const elem of data.Ratings) {
        document.querySelector('.text__ratings').innerHTML += `${elem.Source} ${elem.Value} <br>`;
    }

    showModal();

};




