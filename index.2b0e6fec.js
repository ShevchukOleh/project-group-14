!function(){const t={LIST_OF_WATCHES:"listOfWatches",LIST_OF_QUEUE:"listOfQueue"},e=(t,e)=>{try{return JSON.parse(localStorage.getItem(t)).find((t=>t.id===e))}catch{return null}},a=(t,e)=>{let a=[];try{const o=JSON.parse(localStorage.getItem(t));a.push(...o)}catch{}finally{a.push(e),localStorage.setItem(t,JSON.stringify(a))}},o=(t,e)=>{try{const a=JSON.parse(localStorage.getItem(t)).filter((t=>t.id===e.id));localStorage.setItem(t,JSON.stringify(a))}catch{}},r=document.querySelector("#modal-btn-watched"),i=document.querySelector("#modal-btn-queue"),n={adult:!1,backdrop_path:"/wybmSmviUXxlBmX44gtpow5Y9TB.jpg",id:594767,title:"Shazam! Fury of the Gods",original_language:"en",original_title:"Shazam! Fury of the Gods",overview:'Billy Batson and his foster siblings, who transform into superheroes by saying "Shazam!", are forced to get back into action and fight the Daughters of Atlas, who they must stop from using a weapon that could destroy the world.',poster_path:"/A3ZbZsmsvNGdprRi2lKgGEeVLEH.jpg",media_type:"movie",genre_ids:[28,35,14],popularity:8158.349,release_date:"2023-03-15",video:!1,vote_average:6.977,vote_count:771},s=()=>{const a=parseInt(r.dataset.id),o=parseInt(i.dataset.id),n=e(t.LIST_OF_WATCHES,a),s=e(t.LIST_OF_QUEUE,o);r.innerHTML=n?"Remove from watched":"Add to watched",i.innerHTML=s?"Remove from queue":"Add to queue"},d=async(t,r,i)=>{const d=parseInt(r.dataset.id);if(e(i,d))return o(i,d),void s();try{const t=await(async()=>n)();a(i,t)}catch{}finally{s()}};r.addEventListener("click",(e=>d(0,r,t.LIST_OF_WATCHES))),i.addEventListener("click",(e=>d(0,i,t.LIST_OF_QUEUE))),s()}();
//# sourceMappingURL=index.2b0e6fec.js.map
