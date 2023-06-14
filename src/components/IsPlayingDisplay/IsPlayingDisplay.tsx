/**
 * @file src/components/IsPlayingDisplay/IsPlayingDisplay.tsx
 * @description IsPlayingDisplay component.
 *
 * TODO: Add scenario where we go from a track to no track playing.
 *
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

import {NoCurrentlyPlayingTrackError, T_RecentTracksTrackAll} from "../../assets/LastFM_Handler/LasfFM_handler";
import {compareTracks} from "../../assets/utils";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLES
// Styled component(s)
const playingDisplayVars = {
  height: '6rem',
  width: '6rem',

  maxWidth: '22rem',

  marginFromBottom: '2rem',
  marginFromRight: '2rem',
}

const StyledIsPlayingDisplay = styled.div(props => ({
  ...blurryBackground,

  position: 'absolute',
  bottom: playingDisplayVars.marginFromBottom,
  right: playingDisplayVars.marginFromRight,

  height: playingDisplayVars.height,
  width: playingDisplayVars.width,

  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '1rem',

  padding: '4px',

  borderRadius: '8px',
  border: `1px solid ${props.theme.color}`,

  opacity: 0,
}));

const StyledAlbumCover = styled.img`
  height: 100%;
  width: auto;

  border-radius: 4px;
`;

const StyledTrackInfo = styled.div(props => ({
  height: '100%',
  width: '100%',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: '.25rem',

  color: props.theme.color,
  fontFamily: 'Radikal, sans-serif !important',

  opacity: 0,

  'span': {
    textAlign: 'left',
  }
}));
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
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [finalTrack, setFinalTrack] = useState<T_RecentTracksTrackAll | undefined>(undefined);

  // Ref(s)
  // HTML
  const isPlayingDisplayRef = useRef<HTMLDivElement>(null);
  const albumCoverRef = useRef<HTMLImageElement>(null);
  const trackInfoRef = useRef<HTMLDivElement>(null);
  // Current track
  const currentTrackRef = useRef<T_RecentTracksTrackAll | undefined>(undefined);
  // Variable(s)
  const emptyAlbumCover = 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';

  // Method(s)
  // Getters
  const getCurrentlyPlaying = () => {
    LastFM_HandlerInstance.ifNowPlaying()
      .then((track: T_RecentTracksTrackAll) => {
        if (!currentTrackRef.current) {
          currentTrackRef.current = track;
          setFinalTrack(track)
        } else {
          if (compareTracks(currentTrackRef.current, track)) {
          } else {
            setFinalTrack(track);
          }
        }

      })
      .catch((err: NoCurrentlyPlayingTrackError) => {
        console.log(`[IsPlayingDisplay] ifNowPlaying error: ${err.message}`);

        currentTrackRef.current = undefined;
      })
  }

  // Others

  // UseEffect(s)
  useEffect(() => {
    getCurrentlyPlaying();

    const interval = setInterval(() => {
      getCurrentlyPlaying();
    }, 5000);

    return () => {
      clearInterval(interval);
    }
  }, []);


  useEffect(() => {
    if (finalTrack) {
      if (!isPlaying) {
        setIsPlaying(true);
      } else {
        const tl = gsap.timeline();
        tl
          .to(trackInfoRef.current, {
            opacity: 0,
          })
          .fromTo(isPlayingDisplayRef.current, {
            opacity: 0,
            scale: 0,
            width: playingDisplayVars.width
          }, {
            opacity: 1,
            scale: 1,
            duration: .75,
            ease: 'power3.out'
          })
          .to(isPlayingDisplayRef.current, {
            width: playingDisplayVars.maxWidth,
            duration: .75,
            ease: 'power3.out'
          })
          .to(trackInfoRef.current, {
            opacity: 1,
            duration: .75,
            ease: 'power3.out'
          })

        currentTrackRef.current = finalTrack;
      }
    } else {
      setIsPlaying(false);
    }
  }, [finalTrack]);


  useEffect(() => {
    if (isPlaying) {
      const tl = gsap.timeline();
      tl
        .fromTo(isPlayingDisplayRef.current, {
          opacity: 0,
          scale: 0
        }, {
          opacity: 1,
          scale: 1,
          duration: .75,
          ease: 'power3.out'
        })
        .to(isPlayingDisplayRef.current, {
          width: playingDisplayVars.maxWidth,
          duration: .75,
          ease: 'power3.out'
        })
        .to(trackInfoRef.current, {
          opacity: 1,
          duration: .75,
          ease: 'power3.out'
        })
    }
  }, [isPlaying]);

  // Render
  return (
    <StyledIsPlayingDisplay
      style={{
        // display: isPlaying ? 'flex' : 'none',
      }}
      ref={isPlayingDisplayRef}
    >

      {
        isPlaying && finalTrack &&
          <>
            <StyledAlbumCover
              ref={albumCoverRef}
              src={finalTrack.image ? finalTrack.image[2]['#text'] : emptyAlbumCover}
              alt={finalTrack.name}
              // onLoad={handleAlbumCoverOnLoad}
            />

            <StyledTrackInfo
              ref={trackInfoRef}
            >
              <span>{finalTrack.name}</span>
              <span>{finalTrack.artist['#text']}</span>
            </StyledTrackInfo>

          </>
      }


    </StyledIsPlayingDisplay>
  );
}
// END COMPONENT =======================================================================================  END COMPONENT

export default IsPlayingDisplay;

/**
 * End of file src/components/IsPlayingDisplay/IsPlayingDisplay.tsx
 */
