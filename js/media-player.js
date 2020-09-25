
document.addEventListener("DOMContentLoaded", function() { initialiseMediaPlayer(); }, false);

var mediaPlayer;

var stopBtn = document.getElementById('stop-button');
var muteBtn = document.getElementById('mute-button');

const player = document.querySelector('#media-player');
const video = player.querySelector('#media-video');
const toggle = player.querySelector('#play-pause-button');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const ranges = player.querySelectorAll('.player__slider');

var playPauseBtn = document.getElementById('play-pause-button');

    
    function initialiseMediaPlayer() {
        mediaPlayer = document.getElementById('media-video');
        
        mediaPlayer.controls = false;
        
        mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);
        
        playPauseBtn.addEventListener('click', function() {
            changeButtonType(playPauseBtn, 'pause');}, false);
        
        playPauseBtn.addEventListener('click', function() {
            changeButtonType(playPauseBtn, 'play');}, false);
        
        muteBtn.addEventListener('click', function(e) { 
            changeButtonType(muteBtn, 'unmute');}, false);	
        
        muteBtn.addEventListener('click', function(e) { 
            changeButtonType(muteBtn, 'mute');}, false);	
        
        mediaPlayer.addEventListener('ended', function() { 
            this.pause(); }, false);	
    }
    
    async function togglePlayPause() {
    
        if (mediaPlayer.paused || mediaPlayer.ended) {
            await changeButtonType(playPauseBtn, 'pause');
            mediaPlayer.play();
        }
        else {
            await changeButtonType(playPauseBtn, 'play');
            mediaPlayer.pause();
        }
    }
    
    function stopPlayer() {
        mediaPlayer.pause();
        mediaPlayer.currentTime = 0;
    }
    
    function changeVolume(direction) {
        if (direction === '+') mediaPlayer.volume += mediaPlayer.volume == 1 ? 0 : 0.1;
        else mediaPlayer.volume -= (mediaPlayer.volume == 0 ? 0 : 0.1);
        mediaPlayer.volume = parseFloat(mediaPlayer.volume).toFixed(1);
    }
    
    async function toggleMute() {
        if (mediaPlayer.muted) {
            await changeButtonType(muteBtn, 'mute');
            mediaPlayer.muted = false;
        }
        else {
            await changeButtonType(muteBtn, 'unmute');
            mediaPlayer.muted = true;
        }
    }
    
    function replayMedia() {
        resetPlayer();
        mediaPlayer.play();
    }
    
    function updateProgressBar() {
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.style.flexBasis = `${percent}%`;
    }    
    
    function changeButtonType(btn, value) {
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
    
    function loadVideo() {
        for (var i = 0; i < arguments.length; i++) {
            var file = arguments[i].split('.');
            var ext = file[file.length - 1];
            if (canPlayVideo(ext)) {
                resetPlayer();
                mediaPlayer.src = arguments[i];
                mediaPlayer.load();
                break;
            }
        }
    }
    
    function canPlayVideo(ext) {
        var ableToPlay = mediaPlayer.canPlayType('video/' + ext);
        if (ableToPlay == '') return false;
        else return true;
    }
    
    function resetPlayer() {
        progressBar.value = 0;
        video.currentTime = 0;
        changeButtonType(playPauseBtn, 'play');
    }
    
    function handleRangeUpdate() {
        video[this.name] = this.value;
    }
    
    function handleProgress() {
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.style.flexBasis = `${percent}%`;
    }
    
    function scrub(e) {
        const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
        video.currentTime = scrubTime;
    }
    
    video.addEventListener('click', togglePlayPause);
    video.addEventListener('play', changeButtonType);
    video.addEventListener('pause', changeButtonType);
    video.addEventListener('timeupdate', handleProgress);
    
    ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
    ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
    
    let mousedown = false;
    
    progress.addEventListener('click', scrub);
    progress.addEventListener('mousemove', ()=> mousedown && scrub);
    progress.addEventListener('mousedown', () => mousedown = true);
    progress.addEventListener('mouseup', () => mousedown =false);
    progress.addEventListener('change', handleProgress);
    
    window.onkeyup = function(e){
        if(e.keyCode == 32){
            togglePlayPause();
        }
    }