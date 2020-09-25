# How to Create an HTML5 Video Player for your Portfolio

I understand anybody might just come across this repo, but if you are a Lambda student or staff, I ask that you please don't share this with the general public.   Lambda folks need every leg up they can get!

## What You Need

- your favorite coding editor
- photo editing software (making buttons, nothing major)
- Premiere Pro or your favorite editing software (optional)
- PowerPoint or your favorite presentation software (optional)
- Zoom, Microsoft Teams, or your favorite recording software (optional)

## Notes

- All SVGs were downloaded from Pixabay and are in Creative Commons, so you are free to do w/e with them.  They are not mine.
- The button template files are created by me, but you are free to do whatever with it.  It's just a base you can use to start making a button, although of course you don't have to use it if you don't want to.

## Directions for HTML5 Video Player

- Set up your new repo for this project.  
- Create folders within it for css, js, img, and fonts.
- Download the fonts you want to use for this player and put them in the fonts folder.
- In the main directory, make an index.html skeleton which you will be editing later.
- In the css folder, create three files:  index.css, media-player.css, and subtitles.css.
- In the js folder, create three files:  index.js and media-player.js, and tracks.js.
- in the img folder, create two files:  captions.vtt and chapters.vtt (make a text file and just change the whole thing, including extension).  These two files ***MUST*** be in the ***same directory*** as your video files, no exceptions!!
- Create and style your button images with your favorite photo editing software.  Again, the button template files are just a base you can use to start making a button, although of course you don't have to use it if you don't want to.  There are also white SVGs provided for the middle portion of the button image from Pixabay if you would like to use those.  Once you get the player up and running, you will be able to use regular CSS to style it in any way you want.
- Next, you will want to open your index.html and add the following to the head:

```HTML
    <title>How To Make an HTML5 Video Player, by Erica Ingram</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/index.css" />
    <script src="js/index.js"></script>
    <link rel="stylesheet" href="css/media-player.css" />
    <link rel="stylesheet" href="css/subtitles.css" />
```

- If you are doing a portfolio, make sure you also add your avatar as a favicon and meta keywords/description in the head as well if you haven't already:

```HTML
    <link rel="icon" href="img/myAvatar.png" sizes="32x32" />
    <link rel="icon" href="img/myAvatar.png" sizes="192x192" />
    <link rel="apple-touch-icon-precomposed" href="img/myAvatar.png" sizes="180x180" />

    <meta name="keywords"
        content="HTML5 video player" />

    <meta name="description"
        content="skeleton for how-to on making a video player">
```

- Next, add your body tag with the following:

```HTML
<body>

        <!-- Header -->
        <header id="header">
            <h1>Video Player HTML Skeleton</h1>
        </header>

        <!-- Main -->
        <section id="main">
            <section class="video-section">
                <h2 id="video-player-title" class="video-player-title">Video Player HTML Skeleton</h2>
                <br />
            </section>
        </section>

        <!-- Footer -->
        <footer id="footer">
            <p>&copy; Created By Erica Ingram   |   <br />(425) 610-7447   |  me at ericaingram dot tech</p>
        </footer>

    <script src="js/media-player.js" ></script>
</body>
```

- Save it.
- So now we are going to write some JavaScript.  I'm not going to explain this part because ya'll learned it in school!
- Just inside your closing body tag, add the following:

```HTML
    <script src="js/media-player.js" ></script>
    <script src="js/tracks.js" ></script>
    <script src="js/index.js" ></script>
```

- Then, in index.js, add the following:

```JavaScript
var shareModal = document.getElementById("share-modal");
var shareButton = document.getElementById("share-button");
var shareSpan = document.getElementsByClassName("share-close")[0];

shareButton.onclick = () => {shareModal.style.display = "flex";}
shareSpan.onclick = () => {shareModal.style.display = "none";}

window.onclick = (event) => {if (event.target == shareModal) {shareModal.style.display = "none";}}
```

- Save and close index.js for now.

- ***VERY IMPORTANT***:  When you are working on this video player locally, make sure you have the following flag in the browser you are testing this in.  IDK what this flag is on non-Chromium browsers, so you will have to research it on your own if you are not using a Chromium-based browser (new Edge, Chrome, Brave, etc.).  The reason for this is because, if you don't do it, it's going to not let you read chapter or caption VTT files locally later when you go to use them.  Close and restart your browser once you've added the flag.

```pseudocode
--allow-file-access-from-files
```

![How To Add Flag to Browser Execution](img/howto/file-access.png)

- Now we're going to go back to the HTML index file and add the HTML code for the video, chapters, and subtitles.  Add the following under the ```<br />``` tag inside the ```video-section``` class section.  This part is going to hold your video player, its controls, and the HTML for the chapters and captions.

```HTML
<figure id='media-player' class="media-player">
    <div id="player-controls" class="player-controls">
        <div id='media-controls' class="media-controls">
        </div>
    </div>
    <div id='media-chapters'>
        <figcaption>
            <ol id="chapters" class="chapters">
            </ol>
        </figcaption>
    </div>
    <div id="share-modal" class="share-modal">
        <div class="share-modal-content">
            <div class="share-close">X</div>
            <div class="share-modal-body">
            </div>
        </div>
    </div>
</figure>
```

- Next we add the actual video player.  Above the div with id ```media-controls```, inside the div with id ```player-controls```, add the video player.  
- The first line of this section opens the video tag.  
- ```controls``` specifies that the video controls should be displayed.
- Preload ```auto``` specifies if and how the video should be loaded when the page loads.  You may select from ```auto```, ```metadata```, or ```none```.
- [Other possible attributes for the ```video``` tag](https://www.w3schools.com/TAgs/tag_video.asp).

<br />
<br />

- The second and third lines are the video's source, where to get the file and what type of file it is.  You may have only one of these if you have only one format of a certain video.  I put two here to show that you may have multiples if you wish.
- [Other possible attributes for the ```source``` tag](https://www.w3schools.com/TAgs/tag_source.asp).

<br />
<br />

- Then there are two tracks, one for chapters (the right-hand menu) and one for subtitles (closed captioning).
- ```kind``` specifies what type of text track it is.  The available options for this are ```captions```, ```chapters```, ```descriptions```, ```metadata```, or ```subtitles```.  So you will need two tracks if you want BOTH captions and chapters.
- ```label``` signifies the title of the text track.
- ```src``` specifies the URL to the file location of that track.
- ```srclang``` signifies the text data language, required if ```kind='subtitles'```.
- ```default``` being enabled means that, if the user's preferences do not say whether to turn it on or off, enable it.

<br />
<br />

- Close the video tag.

```HTML
<video
    id='media-video'
    controls
    preload="auto"
    class="media-video" >
    <source src='img/SampleVideo1.mp4' type='video/mp4'>
    <source src='img/SampleVideo1.webm' type='video/webm'>
    <track kind="chapters"
        label="Projects"
        src="img/chapters.vtt"
        srclang="en"
        onload="displayChapters(this)"
        default />  
    <track kind="subtitles"
        srclang="en"
        src="img/captions.vtt"  
        label="English"
        default >
</video>
```

- Next, below your closing ```</video>``` tag, still inside the div with id ```player-controls```, add the following.  This will contain the progress bar, the playback speed bar, and the actual player buttons.
- The progress bar is just an empty div with another empty div inside of it that will represent the filling portion of the progress bar after we've styled it with CSS.
- The input field here is the guts of the playback speed bar.  Its type is ```range``` and its ```min``` and ```max``` signify the max and min speeds you want the player to be able to play at.  ```step``` signifies how much each individual step should go up in the range, and ```value``` specifies what the range's value is currently set at.  So right now, the player will play at 1x speed, normal regular speed.
- Then we have an empty div representing what will shortly be the player buttons.

```HTML
<div id='media-controls' class="media-controls">
    <div class="progress">
        <div class="progress__filled"></div>
    </div>
    <input
        id="playbackSpeed"
        type="range"
        name="playbackRate"
        class="player__slider"
        min="0.5"
        max="2"
        step="0.1"
        value="1">
    <div id="media-buttons" class="media-buttons">
    </div>
</div>
```

- Next, we'll add the actual buttons inside the div with id ```media-buttons```, each with their own onclick attribute to run the respective function on click.  Ensure each image has an ```alt``` attribute.  Notice there is a button for each of ```replay```, ```play/pause```, ```stop```, ```volume up```, ```volume down```, ```mute/unmute```, ```share```, and ```cc```, and six of the eight each run a separate function, which we will write shortly.

```HTML
<div id='replay-button' class='replay icon'
    title='replay' onclick='replayMedia();'>
    <img src="img/png/replay.png" alt="replay" />
</div>
<div id='play-pause-button' class='play icon'
    title='play' onclick='togglePlayPause();'>
    <img id='play-img' src="img/png/play.png" alt="play/pause" />
</div>
<div id='stop-button' class='stop icon'
    title='stop' onclick='stopPlayer();'>
    <img src="img/png/stop.png" alt="stop" />
</div>
<div id='volume-inc-button' class='volume-plus icon'
    title='increase volume' onclick='changeVolume("+");'>
    <img src="img/png/plus.png" alt="volume up" />
</div>
<div id='volume-dec-button' class='volume-minus icon'
    title='decrease volume' onclick='changeVolume("-");'>
    <img src="img/png/minus.png" alt="volume down" />
</div>
<div id='mute-button' class='mute icon'
    title='mute' onclick='toggleMute("true");'>
    <img id='mute-img' src="img/png/mute.png" alt="mute/unmute" />
</div>
<div id='share-button' class='icon'
    title='share on social media'>
    <img id='share-img' src="img/png/share.png" alt="share on social media" />
</div>
<div id='cc-button' class='icon'
    title='closed captioning'>
    <img id='cc-img' src="img/png/cc.png" alt="toggle closed captioning" />
</div>
```

```HTML

```

```HTML

```

### Resources for Making a Video Player

- TBD

## How To Do Minor Video Editing Tasks in Premiere Pro

- TBD

## How To Set Up Screens to Record

- TBD

