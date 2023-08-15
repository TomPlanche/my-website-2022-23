/**
 * @file src/pages/IsPlayingDisplayPage/IPDHome.tsx
 * @description IPDHome component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import styled from 'styled-components';
import IsPlayingDisplay from "../../components/IsPlayingDisplay/IsPlayingDisplay";
import MyButton from "../../components/MyButton";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
const StyledIPDHome = styled.div`
  height: 100vh;
  width: 100vw;
`;
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * IPDHome component
 * @return
 * @constructor
 **/
const IPDHome = () => {
  // State(s)

  // Ref(s)

  // Method(s)

  // Effect(s)

  // Render
  return (
    <>
      <StyledIPDHome>
        <h1>IsPlayingDisplay</h1>
        <p>
          This little diisplay shows what I am currently playing.
          I used the <MyButton href="https://www.last.fm/fr/api">LastFM API</MyButton> with the <MyButton
          href="https://apps.apple.com/app/id1447768809">Marvis Pro</MyButton> app.
        </p>

        <p>
          It uses my own <MyButton href={"https://github.com/TomPlanche/LastFM_handler"}>LastFM middleware</MyButton>
        </p>
      </StyledIPDHome>

      <IsPlayingDisplay songIfNotPlaying/>
    </>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default IPDHome;

/**
 * End of file src/components/src/pages/IsPlayingDisplayPage/IPDHome.tsx
 */
