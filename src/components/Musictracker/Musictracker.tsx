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

import {NoSongCurrentlyPlaying, T_Track} from "../../assets/LastFM_Handler/LasfFM_handler";
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
  'flexDirection': 'column',
  'alignItems': 'flex-start',
  'justifyContent': 'center',
  'gap': '1rem',

}));

const StyledSong = styled.div(props => ({
  borderRadius: '1rem',

  backgroundColor: props.theme['blurryBackground'],
  ...blurryBackground,

  width: '100%',

  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',

  padding: '1rem',
  margin: '1rem 0',

  borderBottom: `1px solid ${props.theme['blurryBackground']}`,

  position: 'relative',

  img: {
    height: '5rem',
    width: 'auto',
    marginRight: '1rem',
  },

  '.song-info': {
    fontSize: '1.5rem',
  }

}));

const NoImageUrl: string = "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png";
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
  const [currentTrack, setCurrentTrack] = useState<T_Track>({} as T_Track);
  const [recentTracks, setRecentTracks] = useState<T_Track[]>([]);
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
    LastFM_HandlerInstance.getRecentTracks(null, 1)
        .then((response: any) => {
          const lastTrack = response[0];

          if (lastTrack?.name !== recentTracks[0].name) {
            getRecentTracks();
          }
        })
        .catch((error: any) => {
            console.log(error);
        });
  }

  // Effect(s)
  useEffect(() => {
    getCurrentlyPlaying();
    getRecentTracks();

    const interval = setInterval(() => {
      lookForChanges();
    }, 5000);

    return () => {
      clearInterval(interval);
    }
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
                <img
                  src={track.image[track.image.length - 1]['#text'] !== "" ? track.image[track.image.length - 1]['#text'] : NoImageUrl}
                  alt={track.name}
                />
                <p className="song-info">
                  {track.name} - {track.artist['#text']}
                </p>
              </StyledSong>
            )
          })
        }
      </StyledMusicTrackerContainer>


      {/*{*/}
      {/*  isPlaying &&*/}
      {/*    <IsPlayingDisplay track={currentTrack} />*/}
      {/*}*/}
    </StyledMusicTracker>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default Musictracker;

/**
 * End of file src/components/Musictracker/Musictracker.tsx
 */
