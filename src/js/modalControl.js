import axios from "axios";

import { LOCAL_STORAGE_FIELDS_NAME } from "../constant/constant";
import { API_KEY, BASE_URL } from "./fetch-popular-render";
import { addFilmToList, getFilmFromList, removeFromList } from "./localStore";

const fetchFilm = async (id) => {
    try {
        const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
        const result = await axios.get(url);

        return result.data
    } catch {
        return null
    }
}

export const getButtonsState = (buttonEl, fieldName) => {
    const filmId = parseInt(buttonEl.dataset.id);
    const existFilm = getFilmFromList(fieldName, filmId)

    if (existFilm) {
        buttonEl.innerHTML = fieldName === LOCAL_STORAGE_FIELDS_NAME.LIST_OF_WATCHES ? 'Remove from watched' : 'Remove from queue';
    } else {
        buttonEl.innerHTML = fieldName === LOCAL_STORAGE_FIELDS_NAME.LIST_OF_WATCHES ? 'Add to watched' : 'Add to queue';
    }
}

const handleButtonClick = async (e, element, fieldName) => {
    const filmId = parseInt(element.dataset.id);
    const existFilm = getFilmFromList(fieldName, filmId);
    if (existFilm) {
        removeFromList(fieldName, filmId);
        getButtonsState(element, fieldName);

        return
    }

    try {
        const film = await fetchFilm(filmId);

        film && addFilmToList(fieldName, film)
    } catch { } finally { getButtonsState(element, fieldName); }
}

export const initModalButtonsHandler = () => {
    const btnWatched = document.querySelector('[data-btn-type="modal-btn-watched"]');
    const btnQueue = document.querySelector('[data-btn-type="modal-btn-queue"]');

    getButtonsState(btnWatched, LOCAL_STORAGE_FIELDS_NAME.LIST_OF_WATCHES);
    getButtonsState(btnQueue, LOCAL_STORAGE_FIELDS_NAME.LIST_OF_QUEUE);

    btnWatched.addEventListener('click', (e) => handleButtonClick(e, btnWatched, LOCAL_STORAGE_FIELDS_NAME.LIST_OF_WATCHES));
    btnQueue.addEventListener('click', (e) => handleButtonClick(e, btnQueue, LOCAL_STORAGE_FIELDS_NAME.LIST_OF_QUEUE));
}