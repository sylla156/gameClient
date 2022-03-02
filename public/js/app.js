const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const wrapper = document.querySelector('.wrapper');

let state = 0;
let slide = wrapper.clientWidth;
let slideCounter= 0;


nextBtn.addEventListener('click', (e) => {
    state++;
   slideCounter += slide;
   if(state >= 3){
       state = 0;
       slideCounter = 0;
   }
   wrapper.style.transform = `translate(-${slideCounter}px,0)`
})

prevBtn.addEventListener('click', (e) => {
    state--;
    slideCounter -= slide;
    if(state < 0){
        state = 2;
        slideCounter = slide * 2;
    }
   wrapper.style.transform = `translate(-${slideCounter}px,0)`
})