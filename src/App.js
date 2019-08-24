/*global chrome*/

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import $ from 'jquery'
import { MODE } from './constants';

import styled from 'styled-components';
import SpotifyPlayer from './modules/spotify-player';
import LyricsPlayer from './modules/lyrics-player';
import MenuCollection from './modules/menu-collection';

import { YOUTUBE_PLAYER, SPOTIFY_PLAYER } from './constants/dimension';
import { DISPLAY_MODE } from './constants/index';
import YoutubePlayer from './modules/youtube-player';
import { getAllIcons } from './constants/icon';


const { ytBkg1, ytBkg2 } = getAllIcons(chrome);

const Root = styled.div`
    width:${(SPOTIFY_PLAYER.WIDTH * window.screen.availWidth) / 100}px;
    height:100vh;
    z-index:9000101;
`;

const MenuWrapper = styled.div`    
    width:${(SPOTIFY_PLAYER.WIDTH * window.screen.availWidth) / 100}px;
    position:fixed;
    right:30px;
    top:10px;
    overflow:hidden;
    z-index:5000;
    -webkit-box-shadow: 0px 0px 8px 2px rgba(163,145,163,1);
    -moz-box-shadow: 0px 0px 8px 2px rgba(163,145,163,1);
    box-shadow: 0px 0px 8px 2px rgba(163,145,163,1);
    border-radius:2px;
`;

const WrapperSpotify = styled.div`
    width:${(SPOTIFY_PLAYER.WIDTH * window.screen.availWidth) / 100}px;
    height:${SPOTIFY_PLAYER.HEIGHT}vh;
    position:fixed;
    right:30px;
    top:70px;
    overflow:hidden;
    -webkit-box-shadow: 0px 0px 8px 2px rgba(163,145,163,1);
    -moz-box-shadow: 0px 0px 8px 2px rgba(163,145,163,1);
    box-shadow: 0px 0px 8px 2px rgba(163,145,163,1);
    z-index:5000;
    border-radius:2px;
`;

const WrapperYoutube = styled.div`
    width:${(YOUTUBE_PLAYER.WIDTH * window.screen.availWidth) / 100}px;
    height:${Math.floor(((Math.floor((window.screen.availWidth * YOUTUBE_PLAYER.WIDTH) / 100)) * 10.9) / 16)}px;
    position:fixed;
    right:30px;
    top:70px;
    overflow:hidden;
    -webkit-box-shadow: 0px 0px 8px 2px rgba(163,145,163,1);
    -moz-box-shadow: 0px 0px 8px 2px rgba(163,145,163,1);
    box-shadow: 0px 0px 8px 2px rgba(163,145,163,1);
    z-index:5000;
    border-radius:2px;
    background:url(${ytBkg1});
    background-size: cover;
`;

const WrapperLyrics = styled.div`
    width:${(YOUTUBE_PLAYER.WIDTH * window.screen.availWidth) / 100}px;
    height:${Math.floor(((Math.floor((window.screen.availWidth * YOUTUBE_PLAYER.WIDTH) / 100)) * 10.9) / 16)}px;
    position:fixed;
    right:30px;
    top:70px;
    overflow:hidden;
    -webkit-box-shadow: 0px 0px 8px 2px rgba(163,145,163,1);
    -moz-box-shadow: 0px 0px 8px 2px rgba(163,145,163,1);
    box-shadow: 0px 0px 8px 2px rgba(163,145,163,1);
    z-index:5000;
    border-radius:2px;
    background-size: cover;
`;

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selected: DISPLAY_MODE.SPOTIFY,
      lyrics: ''
    }
  }

  static getDerivedStateFromProps() {
    return {}
  }

  onSelected = (selected) => {
    this.setState({ selected })
  }

  render() {
    const { store, mediaControl, onClose } = this.props;
    const { selected } = this.state

    return (
      <Root >
        <MenuWrapper>
          <MenuCollection selected={selected} onSelected={this.onSelected} />
        </MenuWrapper>
        {selected === DISPLAY_MODE.SPOTIFY &&
          <WrapperSpotify>
            <SpotifyPlayer store={store} mediaControl={mediaControl} onClose={onClose}></SpotifyPlayer>
          </WrapperSpotify>
        }
        {selected === DISPLAY_MODE.YOUTUBE &&
          <WrapperYoutube>
            <YoutubePlayer store={store} mediaControl={mediaControl} onClose={onClose} ></YoutubePlayer>
          </WrapperYoutube>
        }
        {selected === DISPLAY_MODE.LYRICS &&
          <WrapperLyrics>
            <LyricsPlayer store={store} mediaControl={mediaControl} onClose={onClose} ></LyricsPlayer>
          </WrapperLyrics>
        }
      </Root>
    );
  }
}

// App.defaultProps = {
//   mode: MODE.NONE,
//   songDetails: {
//     title: 'style',
//     artist: ['taylor swift'],
//     albumArt: '',
//     progressTime: '0:01',
//     totalTime: '3:51',
//     playing: false,
//   },
//   lyrics: '404'
// }

// App.prototypes = {
//   mode: PropTypes.string,
//   songDetails: PropTypes.shape({}),
//   mediaControl: PropTypes.func,
//   onClose: PropTypes.func,
//   switchToYoutubeMode: PropTypes.func,
// }

export default App;
