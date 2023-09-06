const mod = document.querySelector('#mode');

mod.addEventListener('click', () => {
    document.querySelector('.phone').classList.toggle('dark');
    document.querySelector('.bi-brightness-high-fill').classList.toggle('bi-moon');
});



let currentMusic = 0;
const music  = document.querySelector('#audio');

const slider = document.querySelector('.slider');
const songTitle = document.querySelector('.song-title');
const artist = document.querySelector('.artist');
const songCover = document.querySelector('.song-cover');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.duration');
const backwardBtn = document.querySelector('#backward-btn');
const forwardBtn = document.querySelector('#forward-btn');
const playBtn = document.querySelector('.play-btn');


playBtn.addEventListener('click', () => {
    if(playBtn.className.includes('pause')){
        music.play();
    }else{
        music.pause();
    }
    playBtn.classList.toggle('pause');
})

const setMusic = (i) => {
    slider.value = 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    songTitle.innerHTML = song.name;
    artist.innerHTML = song.artist;
    songCover.style.backgroundImage = `url('${song.cover}')`;

    currentTime.innerHTML = '00:00';
    setTimeout(() => {
    slider.max = music.duration;
    musicDuration.innerHTML = formatTime(music.duration);
    }, 300);
}

setMusic(0);

const formatTime = (time) => {
    let min= Math.floor(time / 60);
    if(min < 10){
        min = `0${min}`;
    }
    let sec= Math.floor(time % 60);
    if(sec < 10){
        sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
}

setInterval(() =>{
    slider.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
    if  (Math.floor(music.currentTime) == Math.floor(slider.max)) {
        forwardBtn.click();
    }
}, 500)

slider.addEventListener('change', () => {
    music.currentTime = slider.value;
})

const playMusic = () => {
    music.play();
    playBtn.classList.remove('pause');
    songCover.classList.add('play');
}

forwardBtn.addEventListener('click', () => {
    if (currentMusic >= songs.length - 1){
        currentMusic = 0;
    }else {
        currentMusic++;
    }
    setMusic(currentMusic);
    playBtn.click;
})

backwardBtn.addEventListener('click', () => {
    if (currentMusic <= 0) {
        currentMusic = song.length - 1;
    }else {
        currentMusic--;
    }
    setMusic(currentMusic);
    playBtn.click;
})