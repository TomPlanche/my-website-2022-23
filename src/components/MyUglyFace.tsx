/**
 * @file src/components/MyUglyFace/MyUglyFace.tsx
 * @description MyUglyFace component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {forwardRef, ForwardRefExoticComponent, RefAttributes, useContext} from "react";

import styled from "styled-components";

import {HomeContext} from "../pages/Home/Home";
import MagnetikContainer from "./Magnetik/MagnetikContainer";

// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLES
const StyledContainer = styled.div`
  height: 45vmin;
  width: 35vmin;

  border-radius: 5rem;
`;


export const MyUglyFaceImg = styled.img`
  height: 45vmin;
  width: auto;

  border-radius: 5rem;
`;

type T_MyUglyFace = ForwardRefExoticComponent<RefAttributes<HTMLDivElement>>;
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * MyUglyFace component
 * @return {JSX.Element}
 * @constructor
 **/
const MyUglyFace: T_MyUglyFace = forwardRef((_, passedRef) => {
  // Context(s)
  const {isPlayingLoadingAnimation} = useContext(HomeContext)

  // Ref(s)

  // Method(s)

  // Effect(s)

  // Render
  return (
    <MagnetikContainer
      onMouseEnter={() => {
        console.log('enter');
      }}

      ref={passedRef}

      fieldForce={.85}
      fieldSize={1.5}
      block={isPlayingLoadingAnimation}

    >
      <StyledContainer
      >
        <MyUglyFaceImg
          src="/imgs/imageCV.png"
          alt="My ugly face"
        />
      </StyledContainer>
    </MagnetikContainer>
  )
})
// END COMPONENT =======================================================================================  END COMPONENT

MyUglyFace.displayName = 'MyUglyFace';

export default MyUglyFace;

/**
 * End of file src/components/MyUglyFace/MyUglyFace.tsx
 */
