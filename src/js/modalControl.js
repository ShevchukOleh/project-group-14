import { LOCAL_STORAGE_FIELDS_NAME } from "../constant/constant";
import { addFilmToList, getFilmFromList, removeFromList } from "./localStore";

const btnWatched = document.querySelector('#modal-btn-watched');
const btnQueue = document.querySelector('#modal-btn-queue');

const mockFilm = {
    "adult": false,
    "backdrop_path": "/wybmSmviUXxlBmX44gtpow5Y9TB.jpg",
    id: 594767,
    "title": "Shazam! Fury of the Gods",
    "original_language": "en",
    "original_title": "Shazam! Fury of the Gods",
    "overview": "Billy Batson and his foster siblings, who transform into superheroes by saying \"Shazam!\", are forced to get back into action and fight the Daughters of Atlas, who they must stop from using a weapon that could destroy the world.",
    "poster_path": "/A3ZbZsmsvNGdprRi2lKgGEeVLEH.jpg",
    "media_type": "movie",
    "genre_ids": [
        28,
        35,
        14
    ],
    "popularity": 8158.349,
    "release_date": "2023-03-15",
    "video": false,
    "vote_average": 6.977,
    "vote_count": 771
}

const fetchFilm = async () => mockFilm

export const getButtonsState = () => {
    const watchedFilmId = parseInt(btnWatched.dataset.id);
    const queueFilmId = parseInt(btnQueue.dataset.id);

    const watchedFilm = getFilmFromList(LOCAL_STORAGE_FIELDS_NAME.LIST_OF_WATCHES, watchedFilmId)
    const queueFilm = getFilmFromList(LOCAL_STORAGE_FIELDS_NAME.LIST_OF_QUEUE, queueFilmId)

    if (watchedFilm) {
        btnWatched.innerHTML = 'Remove from watched';
    } else {
        btnWatched.innerHTML = 'Add to watched';
    }

    if (queueFilm) {
        btnQueue.innerHTML = 'Remove from queue';
    } else {
        btnQueue.innerHTML = 'Add to queue';
    }
}

const handleButtonClick = async (e, element, fieldName) => {
    const filmId = parseInt(element.dataset.id);
    const existFilm = getFilmFromList(fieldName, filmId);

    if (existFilm) {
        removeFromList(fieldName, filmId);
        getButtonsState();
        return
    }

    try {
        const film = await fetchFilm();

        addFilmToList(fieldName, film)
    } catch { } finally { getButtonsState(); }
}

btnWatched.addEventListener('click', (e) => handleButtonClick(e, btnWatched, LOCAL_STORAGE_FIELDS_NAME.LIST_OF_WATCHES));
btnQueue.addEventListener('click', (e) => handleButtonClick(e, btnQueue, LOCAL_STORAGE_FIELDS_NAME.LIST_OF_QUEUE));


//TODO: move to openModal func
getButtonsState()