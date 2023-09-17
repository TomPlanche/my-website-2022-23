/**
 * @file src/components/src/pages/LastFMHandlerPage.tsx
 * @description LastFMHandlerPage component. This page is used to display the LastFMHandler component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import styled from 'styled-components';
import MyButton from "../components/MyButton";
import {useContext} from "react";
import {AppContext} from "../App";
import ProjectPageLayout from "./ProjectPageLayout";
import IsPlayingDisplay from "../components/IsPlayingDisplay";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
// Style variables
export const StyledParagraph = styled.p`
  font-size: 1.5rem;
  font-family: "Editorial New", sans-serif;
  
  text-align: justify;
  
  padding: 0 5rem;
  margin-top: 5rem;
  
  line-height: 2rem;
`;
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * CustomCursorPage component
 * @return
 * @constructor
 **/
const CustomCursorPage = () => {
  // Context(s)
  const {cursorRef} = useContext(AppContext);

  // State(s)

  // Ref(s)

  // Method(s)

  // Effect(s)

  // Render
  return (
    <ProjectPageLayout
      title={"Tom's LastFM Handler"}
    >

      {/*<StyledTitle>*/}
      {/*  Tom&apos;s LastFM Handler.*/}
      {/*</StyledTitle>*/}

      <StyledParagraph>
        I designed this <MyButton href={"https://www.last.fm/"} customCursor={cursorRef}>LastFM</MyButton> API middleware for my <MyButton href={'https://tomplanche.fr'} customCursor={cursorRef}>portfolio website</MyButton>.
        It is designed to facilitate interactions with the <MyButton href={"https://www.last.fm/fr/api"} customCursor={cursorRef}>LastFM API</MyButton>. It provides a structured interface for making requests to the API, handling various methods, and processing responses. This middleware simplifies the integration of LastFM data into your applications, allowing you to retrieve user information, top tracks, recent tracks, loved tracks, and more.
        <br/>
        <br/>
        I build it for my <MyButton href={'https://tomplanche.fr/my-music-player'} customCursor={cursorRef}>IsPlayingDisplay</MyButton> react component but you can use it for your own projects.
      </StyledParagraph>

      <IsPlayingDisplay
        raise={5}

        songIfNotPlaying={true}
      />

    </ProjectPageLayout>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default CustomCursorPage;

/**
 * End of file src/components/src/pages/LastFMHandlerPage.tsx
 */
