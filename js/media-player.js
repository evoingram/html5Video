
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

var textTrack;

var subtitleButton = document.getElementById('cc-button');
var subtitles;

for (var i = 0; i < video.textTracks.length; i++) {
    if(video.textTracks[i].kind = 'subtitles'){
        video.textTracks[i].mode = 'hidden';
        subtitles = video.textTracks[i];
    }
}

subtitleButton.addEventListener('click', (e) => {
    if (subtitles) {subtitles.mode = (subtitles.mode == 'showing' ? 'hidden' : 'showing');}
});


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
    
    mediaPlayer.addEventListener('ended', () => {mediaPlayer.pause(); }, false);	

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

function displayChapters(trackElement) {
    if ((trackElement) && (textTrack = trackElement.track)){
        if (textTrack.kind === "chapters"){
            textTrack.mode = 'hidden';
            for (var i = 0; i < textTrack.cues.length; ++i) {
                cue = textTrack.cues[i],
                chapterName = cue.text,
                start = cue.startTime,
                newChapterListItem = document.createElement("li");
                newChapterListItem.setAttribute('id', start);
                var chapterDescription = document.createTextNode(cue.text);
                newChapterListItem.appendChild(chapterDescription);
                chapterList.append(newChapterListItem);
                var chaptersList = document.getElementById('chapters');
                var chaptersListItems = chaptersList.getElementsByTagName('li');
                // loop through li items and add click event listener
                for (let x = 0; x < chaptersListItems.length; x++){
                    chaptersListItems[x].addEventListener("click", () => {                    
                        document.getElementById('media-video').currentTime = chaptersListItems[x].id;
                        chaptersListItems[x].style.textShadow = "-1px 1px 0 #340a67, 1px 1px 0 #340a67, 1px -1px 0 #340a67; -1px -1px 0 #340a67";
                    }, false);
                    chaptersListItems[x].style.fontFamily = 'Cascadia';
                    chaptersListItems[x].style.padding = '4%';
                }
            }
        textTrack.addEventListener("cuechange",
            function() {
                var currentChapter = this.activeCues[0].startTime;
                if (chapter = document.getElementById(currentChapter)) {
                    var locations = [].slice.call(document.querySelectorAll("#chapters li"));
                    for (var i = 0; i < locations.length; ++i) {locations[i].classList.remove("current");}
                    chapter.classList.add("current");
                    chapterList.style.top = "-"+chapter.parentNode.offsetTop+"px";
                }
            },false);
        }
    }
}

scrub = (e) => {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
var chapterList = document.getElementById("chapters");
var trackElement = video.getElementsByTagName("track")[0];