/**
 * @file src/components/IsPlayingDisplay/IsPlayingDisplay.tsx
 * @description IsPlayingDisplay component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {useContext, useEffect, useRef, useState} from "react";

import {gsap} from "gsap";

import styled from "styled-components";

import {
  commonTheme,
  blurryBackground, AppContext
} from "../../App";

import {NoSongCurrentlyPlaying} from "../../assets/LastFM_Handler";
import {calcCssVar} from "../../assets/utils";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLES
interface IIsPlayingDisplayVariables {
  padding: string,
  borderRadius: string,
  albumBorderRadius: string,
}

const closeBtnSize = '1rem';

const IsPlayingDisplayVariablesBig: IIsPlayingDisplayVariables & {
  closeBtnSize: string,
  closeBtnPosition: string,
  textInfoRightPadding: string,
  maxWidth: string,
} = {
  padding: '0.5rem',
  borderRadius: '1rem',
  albumBorderRadius: '10px',
  maxWidth: '40vw',

  closeBtnSize: closeBtnSize,
  textInfoRightPadding: calcCssVar(closeBtnSize, (v) => v * 1.5),
  closeBtnPosition: calcCssVar(closeBtnSize, (v) => v / 4),
}

const IsPlayingDisplayVariablesSmall: IIsPlayingDisplayVariables = {
  padding: '0.25rem',
  borderRadius: '8px',
  albumBorderRadius: '6px',
}

const StyledIsPlayingDisplay = styled.div(props => ({
  background: props.theme.background,
  color: props.theme.color,

  height: '6rem',
  maxWidth: IsPlayingDisplayVariablesBig.maxWidth,
  width: 'auto',

  position: 'fixed',
  bottom: commonTheme.sidePadding,
  right: commonTheme.sidePadding,
  zIndex: '1000',

  backgroundColor: props.theme['blurryBackground'],
  ...blurryBackground,

  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',

  borderRadius: IsPlayingDisplayVariablesBig.borderRadius,
  padding: IsPlayingDisplayVariablesBig.padding,
}));

const StyledAlbumCoverContainer = styled.div(props => ({
  height: '100%',
  width: 'auto',

  position: 'relative',
}));


const StyledCloseBtn = styled.svg(props => ({
  position: 'absolute',
  top: IsPlayingDisplayVariablesBig.closeBtnPosition,
  right:  IsPlayingDisplayVariablesBig.closeBtnPosition,

  height: IsPlayingDisplayVariablesBig.closeBtnSize,
  width: IsPlayingDisplayVariablesBig.closeBtnSize,

  opacity: '.1',

  cursor: 'pointer',

  transition: 'all .2s ease-in-out',

  zIndex: '1001',

  'path': {
    fill: props.theme.blueFontColor,
  },

  '&:hover': {
    transform: 'scale(1.1)',
    opacity: '1',
  }
}));

const StyledAlbumCover = styled.img(props => ({
  height: '100%',
  width: 'auto',

  borderRadius: IsPlayingDisplayVariablesBig.albumBorderRadius,
}));

const StyledInfo = styled.div(props => ({
  color: props.theme.blueFontColor,

  width: 'auto',
  height: '100%',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',

  fontSize: '1.25rem',

  padding: IsPlayingDisplayVariablesBig.padding,
  paddingRight: calcCssVar(closeBtnSize, (v) => v * 1.25),

  'p': {
    maxWidth: calcCssVar(IsPlayingDisplayVariablesBig.maxWidth, (v) => v / 2),
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
}));


interface ITrackInfo {
    "artist": {
        "mbid": string
        "#text": string
    },
    "streamable": number,
    "image": [{
      "size": "small" | "medium" | "large" | "extralarge"
      "#text": string
    }],
    "mbid": string
    "album": {
        "mbid": string
        "#text": string
    },
    "name": string
    "@attr": {
        "nowplaying": boolean
    },
    "url": string
}

const emptyTrackInfo: ITrackInfo = {
  "artist": {
      "mbid": "",
      "#text": ""
  },
  "streamable": -1,
  "image": [{
    "size": "small",
    "#text": "",
  }],
  "mbid": "",
  "album": {
      "mbid": "",
      "#text": "",
  },
  "name": "",
  "@attr": {
      "nowplaying": false
  },
  "url": "",
}
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * IsPlayingDisplay component
 * @return {JSX.Element}
 * @constructor
 **/
const IsPlayingDisplay = () => {
  // Context(s)
  const {LastFM_HandlerInstance} = useContext(AppContext);

  // State(s)
  const [small, setSmall] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<any>(emptyTrackInfo);

  // Ref(s)
  let currentTrackRef = useRef<ITrackInfo>(emptyTrackInfo);
  const isPlayingDisplayRef = useRef<HTMLDivElement>(null);
  const albumCoverRef = useRef<HTMLImageElement>(null);
  const trackInfoRef = useRef<HTMLDivElement>(null);

  // Variable(s)
  const emptyAlbumCover = 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';

  // Method(s)
  // Getters
  const getCurrentlyPlaying = () => {
    LastFM_HandlerInstance.isCurrentlyPlaying()
      .then((response: any) => {
        if (
          response.name !== currentTrackRef.current.name ||
          response.mbid !== currentTrackRef.current.mbid
        ) {
          setIsPlaying(true);
          setCurrentTrack(response);
          currentTrackRef.current = response;
        }
      })
      .catch((error: NoSongCurrentlyPlaying) => {
        console.log(`[IsPlayingDisplay] ${error.message}`);
        setIsPlaying(false);
      })
      .catch((error: any) => {
        console.log(error);
      })
  }

  // Others
  const toogleSmall = () => {
    const animation_tl = gsap.timeline();

    if (!small) {
      animation_tl
        .to(trackInfoRef.current, {
          opacity: "0",
          scale: 0,
          duration: .2,
        })
        .to(isPlayingDisplayRef.current, {
          padding: IsPlayingDisplayVariablesSmall.padding,
          borderRadius: IsPlayingDisplayVariablesSmall.borderRadius,
        }, '<')
        .to(albumCoverRef.current, {
          borderRadius: IsPlayingDisplayVariablesSmall.albumBorderRadius,
        }, '<')
        .to(trackInfoRef.current, {
          width: '0',
          duration: .2,
        })
        .to(trackInfoRef.current, {
          padding: '0',
          duration: .1,
        }, '<')
    } else {
      animation_tl
        .to(trackInfoRef.current, {
          display: 'flex',
          width: 'auto',
        })
        .to(trackInfoRef.current, {
          padding: calcCssVar(closeBtnSize, (v) => v * 1.25),
          duration: .2,
        })
        // .to(trackInfoRef.current, {
        //   opacity: 1,
        //   scale: 1,
        // })
    }

    setSmall(!small);
  }

  const handleAlbumCoverOnClick = () => {
    window.open(currentTrack.url, '_blank');
  }

  // UseEffect(s)
  useEffect(() => {
    getCurrentlyPlaying();

    setTimeout(() => {
      toogleSmall();
    }, 1000)

    const interval = setInterval(() => {
      getCurrentlyPlaying();
    }, 5000);

    return () => clearInterval(interval);
  }, [])

  // Render
  return (
      <StyledIsPlayingDisplay
        ref={isPlayingDisplayRef}
        style={{
          display: isPlaying ? 'flex' : 'none',
        }}
        title={`${currentTrack.artist['#text']} - ${currentTrack.name}`}
      >
        {
          !small &&
            <StyledCloseBtn
              width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
              onClick={toogleSmall}
            >
              <path d="M16.3394 9.32245C16.7434 8.94589 16.7657 8.31312 16.3891 7.90911C16.0126 7.50509 15.3798 7.48283 14.9758 7.85938L12.0497 10.5866L9.32245 7.66048C8.94589 7.25647 8.31312 7.23421 7.90911 7.61076C7.50509 7.98731 7.48283 8.62008 7.85938 9.0241L10.5866 11.9502L7.66048 14.6775C7.25647 15.054 7.23421 15.6868 7.61076 16.0908C7.98731 16.4948 8.62008 16.5171 9.0241 16.1405L11.9502 13.4133L14.6775 16.3394C15.054 16.7434 15.6868 16.7657 16.0908 16.3891C16.4948 16.0126 16.5171 15.3798 16.1405 14.9758L13.4133 12.0497L16.3394 9.32245Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" fill="currentColor" />
            </StyledCloseBtn>
        }

        <StyledAlbumCoverContainer
          onClick={small ? toogleSmall : handleAlbumCoverOnClick}
        >
          <StyledAlbumCover
            ref={albumCoverRef}
            src={currentTrack.image[currentTrack.image.length - 1]['#text'] || emptyAlbumCover}
            alt={currentTrack.album['#text']}
          />
        </StyledAlbumCoverContainer>
        <StyledInfo
          ref={trackInfoRef}
        >
          <p>{currentTrack.artist['#text']}</p>
          <p>{currentTrack.name}</p>
        </StyledInfo>
      </StyledIsPlayingDisplay>
  );
}
// END COMPONENT =======================================================================================  END COMPONENT

export default IsPlayingDisplay;

/**
 * End of file src/components/IsPlayingDisplay/IsPlayingDisplay.tsx
 */
