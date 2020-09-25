
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
    
var chapterList = document.getElementById("chapters");
var trackElement = video.getElementsByTagName("track")[0];