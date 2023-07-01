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
  blurryBackground, AppContext
} from "../../App";

import {NoCurrentlyPlayingTrackError, T_RecentTracksTrackAll} from "../../assets/LastFM_Handler/LasfFM_handler";
import {calcCssVar, compareTracks} from "../../assets/utils";
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

  position: 'fixed',
  bottom: playingDisplayVars.marginFromBottom,
  right: playingDisplayVars.marginFromRight,

  height: playingDisplayVars.height,
  width: playingDisplayVars.width,
  maxWidth: playingDisplayVars.maxWidth,

  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '1rem',

  padding: '4px',
  paddingRight: '1rem',

  borderRadius: '8px',
  border: `1px solid ${props.theme['blurryBackground']}`,

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

// Normal variable(s)
const emptyAlbumCover: string = 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * IsPlayingDisplay component
 * @return {JSX.Element}
 * @constructor
 **/
const IsPlayingDisplay = () => {
  // Context(s)
  const {LastFM_HandlerInstance, cursorRef} = useContext(AppContext);

  // State(s)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [finalTrack, setFinalTrack] = useState<T_RecentTracksTrackAll>();
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isSmall, setIsSmall] = useState<boolean>(false);

  // Ref(s)
  // HTML
  const isPlayingDisplayRef = useRef<HTMLDivElement>(null);
  const albumCoverRef = useRef<HTMLImageElement>(null);
  const trackInfoRef = useRef<HTMLDivElement>(null);

  // Current track
  const currentTrackRef = useRef<T_RecentTracksTrackAll | undefined>(undefined);

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
        setIsPlaying(false);
      })
      .catch((err: Error) => {
        console.error(err);
      })
  }

  // Others
  const handleMouseEnter = () => {
    if (cursorRef.current) {
      cursorRef.current.onCursorEnter({
        backgroundColor: 'red',
      }, true)
    }
  }

  const handleMouseLeave = () => {
    if (cursorRef.current) {
      cursorRef.current.onCursorLeave({}, true)
    }
  }

  const handleClicked = () => {
    if (isAnimating) {
      return;
    }

    const animationTl = gsap.timeline({
      duration: .75,
      ease: 'power3.out',

      onStart: () => {
        setIsAnimating(true);
      },
      onComplete: () => {
        setIsAnimating(false);
        setIsSmall(!isSmall);
      }
    });

    if (!isSmall) {
      animationTl
        .to(trackInfoRef.current, {
          opacity: 0,
        })
        .to(isPlayingDisplayRef.current, {
          width: playingDisplayVars.width,
        })
        .to(isPlayingDisplayRef.current, {
          height: calcCssVar(playingDisplayVars.height, (variable) => variable * 0.75),
          width: calcCssVar(playingDisplayVars.width, (variable) => variable * 0.75),
        })

    } else {
      animationTl
        .to(isPlayingDisplayRef.current, {
          height: playingDisplayVars.height,
          width: playingDisplayVars.width,
        })
        .to(isPlayingDisplayRef.current, {
          width: 'auto',
        })
        .to(trackInfoRef.current, {
          opacity: 1,
        })
    }
  }

  const handleTrackImage = () => {
    if (finalTrack?.image) {
      return finalTrack.image[finalTrack.image.length - 1]['#text'] || emptyAlbumCover;
    }

    return emptyAlbumCover;
  }

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
      if (isSmall || isAnimating) {
        currentTrackRef.current = finalTrack;
        return;
      }

      if (!isPlaying) {
        setIsPlaying(true);
      } else {
        const tl = gsap.timeline({
          duration: .75,
          ease: 'power3.out',

          onStart: () => {
            setIsAnimating(true);
          },
          onComplete: () => {
            setIsAnimating(false);
          }
        });
        tl
          .to(trackInfoRef.current, {
            opacity: 0,
            duration: 0
          })
          .fromTo(isPlayingDisplayRef.current, {
            opacity: 0,
            scale: 0,
            duration: 0,
            width: playingDisplayVars.width
          }, {
            opacity: 1,
            scale: 1,
          })
          .to(isPlayingDisplayRef.current, {
            width: 'auto',
          })
          .to(trackInfoRef.current, {
            opacity: 1,

          })

        currentTrackRef.current = finalTrack;
      }
    } else {
      setIsPlaying(false);
    }
  }, [finalTrack]);


  useEffect(() => {
    if (isPlaying) {
      const tl = gsap.timeline({
          duration: .75,
          ease: 'power3.out',

          onStart: () => {
            setIsAnimating(true);
          },
          onComplete: () => {
            setIsAnimating(false);
          }
        });
      tl
        .fromTo(isPlayingDisplayRef.current, {
          opacity: 0,
          scale: 0,
          duration: 0,
        }, {
          opacity: 1,
          scale: 1,
        })
        .to(isPlayingDisplayRef.current, {
          width: 'auto',
        })
        .to(trackInfoRef.current, {
          opacity: 1,
        })
    } else {
      if (currentTrackRef.current) {
        const closeTl = gsap.timeline({
          duration: .75,
          ease: 'power3.out',

          onStart: () => {
            setIsAnimating(true);
          },
          onComplete: () => {
            setIsAnimating(false);
          }
        });
        closeTl
          .to(trackInfoRef.current, {
            opacity: 0,
          })
          .to(isPlayingDisplayRef.current, {
            width: playingDisplayVars.width,
          })
          .to(isPlayingDisplayRef.current, {
            opacity: 0,
            scale: 0,
          })

        currentTrackRef.current = undefined;
      }
    }
  }, [isPlaying]);

  // Render
  return (
    <StyledIsPlayingDisplay
      ref={isPlayingDisplayRef}

      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClicked}
    >

      {
        finalTrack &&
          <>
            <StyledAlbumCover
              ref={albumCoverRef}
              src={handleTrackImage()}
              alt={finalTrack.name}
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
