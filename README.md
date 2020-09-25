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
            </section>
        </section>

        <!-- Footer -->
        <footer id="footer">
            <p>&copy; Created By Erica Ingram   |   <br />(425) 610-7447   |  me at ericaingram dot tech</p>
        </footer>

    <script src="js/media-player.js" ></script>
</body>
```

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

- 

```HTML

```

```HTML

```

```HTML

```

```HTML

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

