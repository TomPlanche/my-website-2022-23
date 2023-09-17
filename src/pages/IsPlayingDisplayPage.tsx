/**
 * @file src/pages/IsPlayingDisplayPage.tsx
 * @description IsPlayingDisplayPage component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {StyledParagraph} from "./LastFMHandlerPage";
import ProjectPageLayout from "./ProjectPageLayout";
import MyButton from "../components/MyButton";
import IsPlayingDisplay from "../components/IsPlayingDisplay";
import {AppContext} from "../App";
import {useContext} from "react";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * IsPlayingDisplayPage component
 * @return
 * @constructor
 **/
const IsPlayingDisplayPage = () => {
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
        I designed this component for fun.
        In order to fetch the data from <MyButton href={"https://www.last.fm/"} customCursor={cursorRef}>LastFM</MyButton>&apos;s API,
        I build my own <MyButton href={'https://tomplanche.fr/lastFM-middleware'} customCursor={cursorRef}>LastFM Middleware</MyButton> in TypeScript.
      </StyledParagraph>

      <IsPlayingDisplay
        raise={5}

        songIfNotPlaying={true}
      />

    </ProjectPageLayout>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default IsPlayingDisplayPage;

/**
 * End of file src/components/src/pages/IsPlayingDisplayPage.tsx
 */
