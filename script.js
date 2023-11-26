

const searchForm = document.getElementById('searchForm');
const queryInput = document.getElementById('query');

const resultsContainer1 = document.getElementById('results1');
const resultsContainer2 = document.getElementById('results2');
const resultsContainer3 = document.getElementById('results3');

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const query = queryInput.value;
  if (query.trim() === '') {
    return;
  }



  const url = 'https://cors-anywhere.herokuapp.com/https://deezerdevs-deezer.p.rapidapi.com/search?q=' + encodeURIComponent(query);
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '9eae4b9b12msh6456b54b4a34685p1cbffajsna2bed76af12c',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
      'X-Requested-With': 'XMLHttpRequest'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    displayResults(data);
  } catch (error) {
    console.error(error);
  }
});





function displayResults(data) {

  resultsContainer1.innerHTML = '';
  resultsContainer2.innerHTML = '';
  resultsContainer3.innerHTML = '';

  if (data && data.data) {
    data.data.forEach((item) => {
      const resultItem = document.createElement('div');
      resultItem.innerHTML = `
      <section class="cont1">
        <div>${item.artist.name}</div>
        <img src="${item.artist.picture_medium}" alt="${item.artist.name}">
        <button class="show-albums" data-artist-id="${item.artist.id}">Show Albums</button>
        </section>
      `;
      resultsContainer1.appendChild(resultItem);

      resultItem.querySelector('.show-albums').addEventListener('click', async (e) => {
        const artistId = item.artist.id;
        displayArtistAlbums(artistId);
      });
    });
  } else {
    resultsContainer1.innerHTML = 'Nothing found';
  }
}

async function displayArtistAlbums(artistId) {
  const albumsUrl = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${artistId}/albums`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '9eae4b9b12msh6456b54b4a34685p1cbffajsna2bed76af12c',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
      'X-Requested-With': 'XMLHttpRequest'
    }
  };

  try {
    const response = await fetch(albumsUrl, options);
    const data = await response.json();

    displayAlbum(data);
  } catch (error) {
    console.error(error);
  }
}

function displayAlbum(data) {
  const albumsContainer = document.createElement('div');

  if (data && data.data) {
    data.data.forEach((item) => {
      const albumItem = document.createElement('div');
      albumItem.innerHTML = `
      <section class="cont2">
        ${item.title}
        ${item.release_date}
        <img src="${item.cover_medium}" alt="${item.title}">
        <button class="show-tracks" data-album-id="${item.id}">Show Tracks</button>
        </section>
      `;
      albumsContainer.appendChild(albumItem);

      albumItem.querySelector('.show-tracks').addEventListener('click', async (e) => {
        const albumId = item.id;
        displayTracks(albumId);
      });
    });
  } else {
    albumsContainer.innerHTML = 'No albums found';
  }

  resultsContainer2.appendChild(albumsContainer);
}

async function displayTracks(albumId) {
  const tracksUrl = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/${albumId}/tracks`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '9eae4b9b12msh6456b54b4a346p1cbffajsna2bed76af12c',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
      'X-Requested-With': 'XMLHttpRequest',
      'Accept-Encoding': 'identity'
    }
  };

  try {
    const response = await fetch(tracksUrl, options);
    const data = await response.json();

    displayTracksInAudio(data);
  } catch (error) {
    console.error(error);
  }
}

function displayTracksInAudio(data) {
  const audioContainer = document.createElement('div');

  if (data && data.data) {
    data.data.forEach((item) => {
      const trackItem = document.createElement('div');
      trackItem.innerHTML = `
      <section class="cont3">
      <div>${item.title}</div> 
        <audio src="${item.preview}" controls></audio>
        </section>
      `;
      audioContainer.appendChild(trackItem);
    });
  } else {
    audioContainer.innerHTML = 'No tracks found';
  }

  resultsContainer3.appendChild(audioContainer);
}