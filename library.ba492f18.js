var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},n={},o=t.parcelRequired7c6;null==o&&((o=function(t){if(t in e)return e[t].exports;if(t in n){var o=n[t];delete n[t];var a={id:t,exports:{}};return e[t]=a,o.call(a.exports,a,a.exports),a.exports}var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(t,e){n[t]=e},t.parcelRequired7c6=o);var a={};function r(t){if("BUTTON"==t.target.nodeName)return t.target.dataset.id}a=function t(e,n,o){function a(i,s){if(!n[i]){if(!e[i]){var l=void 0;if(!s&&l)return l(i,!0);if(r)return r(i,!0);var c=new Error("Cannot find module '"+i+"'");throw c.code="MODULE_NOT_FOUND",c}var d=n[i]={exports:{}};e[i][0].call(d.exports,(function(t){return a(e[i][1][t]||t)}),d,d.exports,t,e,n,o)}return n[i].exports}for(var r=void 0,i=0;i<o.length;i++)a(o[i]);return a}({1:[function(t,e,n){Object.defineProperty(n,"__esModule",{value:!0}),n.create=n.visible=void 0;var o=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=document.createElement("div");return n.innerHTML=t.trim(),!0===e?n.children:n.firstChild},a=function(t,e){var n=t.children;return 1===n.length&&n[0].tagName===e},r=function(t){return null!=(t=t||document.querySelector(".basicLightbox"))&&!0===t.ownerDocument.body.contains(t)};n.visible=r,n.create=function(t,e){var n=function(t,e){var n=o('\n\t\t<div class="basicLightbox '.concat(e.className,'">\n\t\t\t<div class="basicLightbox__placeholder" role="dialog"></div>\n\t\t</div>\n\t')),r=n.querySelector(".basicLightbox__placeholder");t.forEach((function(t){return r.appendChild(t)}));var i=a(r,"IMG"),s=a(r,"VIDEO"),l=a(r,"IFRAME");return!0===i&&n.classList.add("basicLightbox--img"),!0===s&&n.classList.add("basicLightbox--video"),!0===l&&n.classList.add("basicLightbox--iframe"),n}(t=function(t){var e="string"==typeof t,n=t instanceof HTMLElement==1;if(!1===e&&!1===n)throw new Error("Content must be a DOM element/node or string");return!0===e?Array.from(o(t,!0)):"TEMPLATE"===t.tagName?[t.content.cloneNode(!0)]:Array.from(t.children)}(t),e=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(null==(t=Object.assign({},t)).closable&&(t.closable=!0),null==t.className&&(t.className=""),null==t.onShow&&(t.onShow=function(){}),null==t.onClose&&(t.onClose=function(){}),"boolean"!=typeof t.closable)throw new Error("Property `closable` must be a boolean");if("string"!=typeof t.className)throw new Error("Property `className` must be a string");if("function"!=typeof t.onShow)throw new Error("Property `onShow` must be a function");if("function"!=typeof t.onClose)throw new Error("Property `onClose` must be a function");return t}(e)),i=function(t){return!1!==e.onClose(s)&&function(t,e){return t.classList.remove("basicLightbox--visible"),setTimeout((function(){return!1===r(t)||t.parentElement.removeChild(t),e()}),410),!0}(n,(function(){if("function"==typeof t)return t(s)}))};!0===e.closable&&n.addEventListener("click",(function(t){t.target===n&&i()}));var s={element:function(){return n},visible:function(){return r(n)},show:function(t){return!1!==e.onShow(s)&&function(t,e){return document.body.appendChild(t),setTimeout((function(){requestAnimationFrame((function(){return t.classList.add("basicLightbox--visible"),e()}))}),10),!0}(n,(function(){if("function"==typeof t)return t(s)}))},close:i};return s}},{}]},{},[1])(1);var i=o("cYYIA");const s=new class{constructor(){this.searchQuery="",this.pageTMDB=1,this.TMDB_API="https://api.themoviedb.org/3/",this.MY_TMDB_KEY="3f36abdfc741814416ed3a9d78fd33b6"}async getMoviesSearch(){return fetch(`${this.TMDB_API}search/keyword?api_key=${this.MY_TMDB_KEY}&query=${this.searchQuery}`).then((t=>{if(!t.ok)throw new Error(t.status);return t.json()}))}async getMoviesTop(){return fetch(`${this.TMDB_API}trending/movie/day?api_key=${this.MY_TMDB_KEY}&id`).then((t=>{if(!t.ok)throw new Error(t.status);return t.json()}))}async getMovieId(t){return fetch(`${this.TMDB_API}movie/${t}?api_key=${this.MY_TMDB_KEY}&language=en-US`).then((t=>{if(!t.ok)throw new Error(t.status);return this.incrementPage(),t.json()}))}async getMovieTrailerbyId(t){return fetch(`${this.TMDB_API}movie/${t}/videos?api_key=${this.MY_TMDB_KEY}&language=en-US`).then((t=>{if(!t.ok)throw new Error(t.status);return this.incrementPage(),t.json()}))}incrementPage(){this.pageTMDB+=1}resetPage(){this.pageTMDB=1}get query(){return this.searchQuery}set query(t){this.searchQuery=t}};document.querySelector(".container-body").addEventListener("click",(async function(t){if("DIV"!=t.target.nodeName&&"LI"!=t.target.nodeName&&"IMG"!=t.target.nodeName&&"P"!=t.target.nodeName&&"B"!=t.target.nodeName)return;if(!t.target.dataset.mvid)return;await s.getMovieId(t.target.dataset.mvid).then((({genres:t,poster_path:e,original_title:n,popularity:o,overview:s,vote_average:d,vote_count:u,title:m,id:h})=>{let p=e?`https://image.tmdb.org/t/p/w500${e}`:"https://via.placeholder.com/400x600/FFFFFF/000000?text=Not+Found";const b={id:h,vote:Math.round(10*Number(d))/10,votes:u,genres:t.map((t=>` ${t.name}`)),title:m||n,img:p,popularity:Math.round(10*Number(o))/10,origin_title:n||m,about:s||"Not found"},f=l(b),_=a.create(f);_.show((()=>{(0,i.initModalButtonsHandler)();const t={btnEl:document.querySelector(".modal__close"),bodyElScroll:document.querySelector("body"),basicLightboxEl:document.querySelector(".basicLightbox"),btnYoutube:document.querySelector(".modal__play")};function e(){_.close((()=>{t.bodyElScroll.classList.remove("no-scroll")}))}t.btnYoutube.addEventListener("click",c),t.bodyElScroll.classList.add("no-scroll"),t.basicLightboxEl.addEventListener("click",(function(e){"basicLightbox"===e.target.classList[0]&&_.close((()=>{t.bodyElScroll.classList.remove("no-scroll")}))})),t.btnEl.addEventListener("click",e),document.addEventListener("keydown",(function n(o){"Escape"!==o.key&&" "!==o.key&&"Enter"!==o.key||_.close((()=>{t.bodyElScroll.classList.remove("no-scroll")}));a.visible()||(document.removeEventListener("keydown",n),t.btnEl.removeEventListener("click",e))}))}));const g={modal:document.querySelector(".basicLightbox__placeholder")};g.modal.addEventListener("click",r),g.modal.insertAdjacentHTML("beforeend",`\n\t\t<button class="modal__close">\n\t\t\t<svg class="modal__close-icon" width="30px" height="30px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">\n\t\t\t\t<polygon points="340.2,160 255.8,244.3 171.8,160.4 160,172.2 244,256 160,339.9 171.8,351.6 255.8,267.8 340.2,352 352,340.3 267.6,256 352,171.8"></polygon>\n\t\t\t</svg>\n\t\t</button>\n    <button class="modal__play" data-yid=${h}>\n\t\t<svg class="modal__play-icon" xmlns="http://www.w3.org/2000/svg" data-yid=${h} viewBox="0 0 50 50" style="width="150px" height="150px"><path data-yid=${h} d="M 24.402344 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.402344 16.898438 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.902344 40.5 17.898438 41 24.5 41 C 31.101563 41 37.097656 40.5 40.597656 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.097656 35.5 C 45.5 33 46 29.402344 46.097656 24.902344 C 46.097656 20.402344 45.597656 16.800781 45.097656 14.300781 C 44.699219 12.101563 42.800781 10.5 40.597656 10 C 37.097656 9.5 31 9 24.402344 9 Z M 24.402344 11 C 31.601563 11 37.398438 11.597656 40.199219 12.097656 C 41.699219 12.5 42.898438 13.5 43.097656 14.800781 C 43.699219 18 44.097656 21.402344 44.097656 24.902344 C 44 29.199219 43.5 32.699219 43.097656 35.199219 C 42.800781 37.097656 40.800781 37.699219 40.199219 37.902344 C 36.597656 38.601563 30.597656 39.097656 24.597656 39.097656 C 18.597656 39.097656 12.5 38.699219 9 37.902344 C 7.5 37.5 6.300781 36.5 6.101563 35.199219 C 5.300781 32.398438 5 28.699219 5 25 C 5 20.398438 5.402344 17 5.800781 14.902344 C 6.101563 13 8.199219 12.398438 8.699219 12.199219 C 12 11.5 18.101563 11 24.402344 11 Z M 19 17 L 19 33 L 33 25 Z M 21 20.402344 L 29 25 L 21 29.597656 Z"/></svg>\n    </button>\n   \t`)})).catch((t=>console.log(t)))}));const l=o("amrNH").compile("<div class='modal modal-click'>\n    <div class='modal__container-picture'>\n      <img class='modal__picture' src={{img}} alt='icon-film'/>\n    </div>\n    <div>\n      <h2 class='modal__title'>{{title}}</h2>\n      <div class='modal__char'><span class='modal__char-name'>Vote / Votes</span>\n        <p class='modal__char-api'><span class='modal__char-api modal__vote'>{{vote}}</span> / <span class='modal__char-api'>{{votes}}</span></p>\n      </div>\n      <p class='modal__char'><span class='modal__char-name'>Popularity</span><span class='modal__char-api'>{{popularity}}</span></p>\n      <p class='modal__char'><span class='modal__char-name'>Original Title</span><span class='modal__char-api'>{{origin_title}}</span></p>\n      <p class='modal__char modal__char-mb'><span class='modal__char-name'>Genre</span><span class='modal__char-api'>{{genres}}</span></p>\n      <p class='modal__about-title'>About</p><p class='modal__about-text'>{{about}}</p>\n      <div class='modal__btn-container'>\n        <button class='modal__btn modal__btn-mr' type='button' data-btn-type=\"modal-btn-watched\" data-id={{id}}>ADD TO WATCHED</button>\n        <button class='modal__btn' type='button' data-btn-type=\"modal-btn-queue\" data-id={{id}}>ADD TO QUEUE</button>\n      </div>\n    </div>\n  </div>");async function c(t){if("BUTTON"!=t.target.nodeName&&"svg"!=t.target.nodeName&&"puth"!=t.target.nodeName)return;if(!t.target.dataset.yid)return;const e=await s.getMovieTrailerbyId(t.target.dataset.yid),n=await e.results,o=await n[0].key;(await a.create(`\n       <iframe src="https://www.youtube.com/embed/${o}" width="1200" height="650" frameborder="0"></iframe>\n`)).show()}
//# sourceMappingURL=library.ba492f18.js.map
