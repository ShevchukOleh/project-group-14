import axios from 'axios';
import { BASE_IMAGE_URL, API_KEY, BASE_URL } from "./fetch-popular-render";
import { LOCAL_STORAGE_FIELDS_NAME } from "../constant/constant";
import { addFilmToList, getFilmFromList, removeFromList } from "./localStore";

refs = {
    btnHeaderWatched: document.querySelector(`button[data-watched]`),
    btnHeaderQueue: document.querySelector(`button[data-queue]`),
    galleryContainer: document.querySelector('.gallery')
};
console.log(refs.btnHeaderWatched);
console.log(refs.btnHeaderQueue);
console.log(refs.galleryContainer);

refs.btnHeaderWatched.addEventListener('click', onBtnHeaderWathedClick);
refs.btnHeaderQueue.addEventListener(`click`, onBtnHeaderQueueClick);



function onBtnHeaderWathedClick(e) { 
  const listWatches = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FIELDS_NAME.LIST_OF_WATCHES));
  console.log(listWatches);

    const markup = createGalleryCardMarkup(listWatches);
    console.log(markup);
    return refs.galleryContainer.innerHTML = markup;
};



function onBtnHeaderQueueClick(e) { 
  const listQueue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FIELDS_NAME.LIST_OF_QUEUE));
  console.log(listQueue);
  

  const markup = createGalleryCardMarkup(listQueue);
  console.log(markup);
  return refs.galleryContainer.innerHTML = markup;
};


 function createGalleryCardMarkup(films) {
    return films.map(({
      genre_ids,
      poster_path,
      title,
      original_title,
      release_date,
      id, }) => {
      return `<li class="films__item" data-mvid='${id}'>
                  <div class="films__img">
                    <img src=${poster_path} alt='Poster ${original_title}'data-mvid='${id}' loading='lazy' />
                  </div>
                  <div class="films__description" data-mvid='${id}'>
                    <p class="films__title" data-mvid='${id}'>
                      <b data-mvid='${id}'>${title.toUpperCase()}</b>
                    </p>
                    <div class="films__meta" data-mvid='${id}'>
                      <p class="films__genres" data-mvid='${id}'>${genre_ids}</p>
                      <p class="films__data" data-mvid='${id}'>${release_date}</p>
                    </div>
                  </div>
                </li>`
    }
    )
      .join('');
  };
       
        

        
