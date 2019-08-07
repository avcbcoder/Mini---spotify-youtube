/* global gapi */
/*global chrome*/
import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import WindowButton from "./components/youtube/window-button"
import { SUPPORTED_SITES, ID, MEDIA_CONTROLS } from './constants'
import { YOUTUBE_API_KEYS, LYRICS_API } from './config'
import { identifySite } from './utils/functions'
import YTSearch from 'youtube-api-search';
import axios from 'axios';
import RootApp from './app';

class Main extends React.Component {
  send = () => {
    chrome.runtime.sendMessage({
      type: "notification", options: {
        type: "basic",
        iconUrl: chrome.extension.getURL("icon128.png"),
        title: "Test",
        message: "Test"
      }
    });
  }

  injectInSpotify = () => {
    chrome.runtime.sendMessage({
      type: "extract-spotify-data", options: {
        type: "basic"
      }
    });
  }

  controls = (media) => {
    chrome.runtime.sendMessage({
      type: "media", options: {
        type: media
      }
    });
  }

  videoSearch(term) {
    YTSearch({ key: YOUTUBE_API_KEYS[0], term: term }, videos => {
      console.log('432', videos)
    });
  }

  getLyrics = (track, artist) => {
    const url = `https://orion.apiseeds.com/api/music/lyric/${artist}/${track}?apikey=${LYRICS_API.API_SEEDS}`
    axios.get(url)
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    const { p } = this.props
    console.log(432, p)
    return (
      // <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}>
      //   <FrameContextConsumer>
      //     {
      //       // Callback is invoked with iframe's window and document instances
      //       ({ document, window }) => {
      //         // Render Children
      //         return (
      //           <div className={'my-extension'}>
      //             <h1>----</h1>
      //             <button onClick={this.send}>Click to console to all tabs</button>
      //             <button onClick={this.injectInSpotify}>Click to remove spotify</button>
      //             <button onClick={() => { this.controls(MEDIA_CONTROLS.NEXT) }}>Next</button>
      //             <button onClick={() => { this.controls(MEDIA_CONTROLS.PREVIOUS) }}>Previous</button>
      //             <button onClick={() => { this.controls(MEDIA_CONTROLS.PLAY_PAUSE) }}>Play/Pause</button>
      //             <button onClick={() => { this.controls(MEDIA_CONTROLS.SHUFFLE) }}>Shuffle</button>
      //             <button onClick={() => { this.controls(MEDIA_CONTROLS.REPEAT) }}>Repeat</button>
      //             <button onClick={() => { this.videoSearch('bad at love'); }}>Search</button>
      //             <button onClick={() => { this.getLyrics('bad at love', 'halsey'); }}>Lyrics</button>
      //           </div>
      //         )
      //       }
      //     }
      //   </FrameContextConsumer>
      // </Frame>
      <RootApp />
    )
  }
}

// since we have access of document (dom) in this file, we can inject any react component now

function performMagic() {
  document.getElementsByTagName('video')[0].requestPictureInPicture();
}

if (identifySite(document.location.href) === SUPPORTED_SITES.YOUTUBE) {

  window.onload = function () {
    const myDoc = this.document
    const collectionButtons = myDoc.getElementById('top-level-buttons');
    const app = myDoc.createElement('div');
    app.id = "432";
    collectionButtons.insertBefore(app, collectionButtons.childNodes[0])
    ReactDOM.render(
      <WindowButton
        document={myDoc}
        width={collectionButtons.childNodes[0].offsetWidth}
        height={collectionButtons.childNodes[0].offsetHeight}
        magic={performMagic}
      />,
      app
    );
  }
}

const app = document.createElement('div');
app.id = "my-extension";
app.style.zIndex = 5000;
document.body.appendChild(app);
ReactDOM.render(<RootApp />, app);

app.style.display = "none";

// recieve message sent from backgound
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
      console.log(request.tabs)
      toggle();
    }
    if (request.message === "console") {
      console.log('console me ye dikhane ka abb')
    }
  }
);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "current-song-details" || request.type === "current-song-details") {
    console.log("songDetails", request, request.songDetailsObj)
    ReactDOM.render(<Main p="hanji" />, app);
  }
});

function toggle() {
  if (app.style.display === "none") {
    app.style.display = "block";
  } else {
    app.style.display = "none";
  }
}



