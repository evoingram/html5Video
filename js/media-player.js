
document.addEventListener("DOMContentLoaded", () => { initializeMediaPlayer(); }, false);

var mediaPlayer;

var stopBtn = document.getElementById('stop-button');
var muteBtn = document.getElementById('mute-button');

const player = document.querySelector('#media-player');
const video = player.querySelector('#media-video');
const toggle = player.querySelector('#play-pause-button');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const speedRanges = player.querySelectorAll('.player__slider');

var playPauseBtn = document.getElementById('play-pause-button');

initializeMediaPlayer = () => {
    mediaPlayer = document.getElementById('media-video');
    
    mediaPlayer.controls = false;
    
    mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);
    
    playPauseBtn.addEventListener('click', () => {
        changeButtonType(playPauseBtn, 'pause');}, false);
    
    playPauseBtn.addEventListener('click', () => {
        changeButtonType(playPauseBtn, 'play');}, false);
    
    muteBtn.addEventListener('click', () => { 
        changeButtonType(muteBtn, 'unmute');}, false);	
    
    muteBtn.addEventListener('click', () => { 
        changeButtonType(muteBtn, 'mute');}, false);	
    
    mediaPlayer.addEventListener('ended', () => { 
        mediaPlayer.pause(); }, false);	

    video.addEventListener('click', togglePlayPause);
    video.addEventListener('play', changeButtonType);
    video.addEventListener('pause', changeButtonType);
    video.addEventListener('timeupdate', handleProgress);
    
    speedRanges.forEach(range => range.addEventListener('change', handleRangeUpdate));
    speedRanges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
    
    let mousedown = false;
    
    progress.addEventListener('click', scrub);
    progress.addEventListener('mousemove', ()=> mousedown && scrub);
    progress.addEventListener('mousedown', () => mousedown = true);
    progress.addEventListener('mouseup', () => mousedown =false);
    progress.addEventListener('change', handleProgress);
        
    window.onkeyup = (e) => {if(e.keyCode == 32){togglePlayPause();}}
}

togglePlayPause = () => {

    if (mediaPlayer.paused || mediaPlayer.ended) {
        changeButtonType(playPauseBtn, 'pause');
        mediaPlayer.play();
    }
    else {
        changeButtonType(playPauseBtn, 'play');
        mediaPlayer.pause();
    }
}

stopPlayer = () => {
    mediaPlayer.pause();
    mediaPlayer.currentTime = 0;
}

changeVolume = (direction) => {
    if (direction === 'up') {
        mediaPlayer.volume += mediaPlayer.volume == 1 ? 0 : 0.1
    }
    else {
        mediaPlayer.volume -= (mediaPlayer.volume == 0 ? 0 : 0.1)
    };
    mediaPlayer.volume = parseFloat(mediaPlayer.volume).toFixed(1);
}

toggleMute = () => {
    if (mediaPlayer.muted) {
        changeButtonType(muteBtn, 'mute');
        mediaPlayer.muted = false;
    }
    else {
        changeButtonType(muteBtn, 'unmute');
        mediaPlayer.muted = true;
    }
}

replayMedia = () => {
    resetPlayer();
    mediaPlayer.play();
}

updateProgressBar = () => {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

changeButtonType = (btn, value) => {
    if(btn && value){
        btn.title = value;
        var buttonImage;
        if(btn.classList.contains('play')){
            buttonImage = document.getElementById('play-img');
            buttonImage.src = "img/png/pause.png";
            btn.classList.add('pause');
            btn.classList.remove('play');
        }
        else if (btn.classList.contains('pause')){
            buttonImage = document.getElementById('play-img');
            buttonImage.src = "img/png/play.png";
            btn.classList.add('play');
            btn.classList.remove('pause');

        }
        if(btn.classList.contains('mute')){
            buttonImage = document.getElementById('mute-img');
            buttonImage.src = "img/png/unmute.png";
            btn.classList.add('unmute');
            btn.classList.remove('mute');
        }
        else if (btn.classList.contains('unmute')){
            buttonImage = document.getElementById('mute-img');
            buttonImage.src = "img/png/mute.png";
            btn.classList.add('mute');
            btn.classList.remove('unmute');

        }
    }
}

resetPlayer = () => {
    progressBar.value = 0;
    video.currentTime = 0;
    changeButtonType(playPauseBtn, 'play');
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

handleProgress = () => {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

scrub = (e) => {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
