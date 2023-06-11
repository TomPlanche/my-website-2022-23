/**
 * @file src/components/Musictracker/Musictracker.tsx
 * @description Musictracker component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import styled from "styled-components";

import {AppContext, blurryBackground, commonTheme} from "../../App";
import IsPlayingDisplay from "../IsPlayingDisplay/IsPlayingDisplay";

import {NoSongCurrentlyPlaying} from "../../assets/LastFM_Handler";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLES
const StyledMusicTracker = styled.div(props => ({
  'background': props.theme.background,

  'color': props.theme.color,

  'minHeight': props.theme.minHeight,

  'padding': `${props.theme.sidePadding} 0`,
}));

const StyledMusicTrackerContainer = styled.div(props => ({
  width: '100%',
  height: '100%',

  'display': 'flex',
  'flexDirection': 'row',
  'alignItems': 'flex-start',
  'justifyContent': 'center',
  'flexWrap': 'wrap',
  'gap': '1rem',

}));

const StyledSong = styled.div(props => ({
  maxWidth: '40vw',
  borderRadius: '1rem',

  backgroundColor: props.theme['blurryBackground'],
  ...blurryBackground,

  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',

  padding: '1rem',
  margin: '1rem 0',

  borderBottom: `1px solid ${props.theme['blurryBackground']}`,

  position: 'relative',

  transition: 'all .2s ease-in-out',

  '&:hover': {
    transform: `translate(-${props.theme.boxShadowSize}, -${props.theme.boxShadowSize})`,
  },

  img: {
    height: '5rem',
    width: 'auto',
    marginRight: '1rem',
  },

  '.song-info': {
    fontSize: '1.5rem',
  }

}));
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * Musictracker component
 * @return {JSX.Element}
 * @constructor
 **/
const Musictracker = () => {
  // Context(s)
  const {LastFM_HandlerInstance} = useContext(AppContext);

  // State(s)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<any>({});
  const [recentTracks, setRecentTracks] = useState<object[]>([]);
  // Ref(s)

  // Method(s)
  // Getters
  const getCurrentlyPlaying = () => {
    LastFM_HandlerInstance.isCurrentlyPlaying()
      .then((response: any) => {
        console.log(response);
        setCurrentTrack(response);
        setIsPlaying(true);
      })
      .catch((error: NoSongCurrentlyPlaying) => {
      })
      .catch((error: any) => {
        console.log(error);
      })
  }

  const getRecentTracks = () => {
    LastFM_HandlerInstance.getRecentTracks()
      .then((response: any) => {
        console.log(response);
        setRecentTracks(response);

      })
      .catch((error: any) => {
        console.log(error);
      })
  }

  // Others
  const lookForChanges = () => {
    const lastTrack = LastFM_HandlerInstance.getRecentTracks(null, 1)
        .then((response: any) => {
            return response;
        })
        .catch((error: any) => {
            console.log(error);
        });

    if (lastTrack !== recentTracks[0]) {
      getRecentTracks();
    }
  }

  // Effect(s)
  useEffect(() => {
    getCurrentlyPlaying();
    getRecentTracks();

    const interval = setInterval(() => {
      lookForChanges();
    }, 5000);

  }, []);

  // Render
  return (
    <StyledMusicTracker>
      <h1>My 30 last tracks</h1>

      <StyledMusicTrackerContainer>
        {
          recentTracks.map((track: any, index: number) => {
            return (
              <StyledSong key={index}>
                <img src={track.image[track.image.length - 1]['#text']} alt={track.name} />
                <p className="song-info">
                  {track.name} - {track.artist['#text']}
                </p>
              </StyledSong>
            )
          })
        }
      </StyledMusicTrackerContainer>


      {
        isPlaying &&
          <IsPlayingDisplay {...currentTrack} />
      }
    </StyledMusicTracker>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default Musictracker;

/**
 * End of file src/components/Musictracker/Musictracker.tsx
 */
