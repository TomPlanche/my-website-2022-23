/**
 * @file src/pages/CustomCursorPage/CustomCursorPage.tsx
 * @description CustomCursorPage component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import styled from 'styled-components';
import MyButton from "../components/MyButton";
import {useContext} from "react";
import {AppContext} from "../App";
import ProjectPageLayout from "./ProjectPageLayout";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
// Style variables
const StyledPage = styled.div`
  height: 100vh;
  width: 100vw;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  padding: 2rem;
`;

const StyledTitle = styled.h1`
  font-size: 5rem;
  font-family: "Mondwest", sans-serif;
  justify-self: center;
  
  color: #679fc5;
`;

const StyledParagraph = styled.p`
  font-size: 1.5rem;
  font-family: "Editorial New", sans-serif;
  
  text-align: justify;
  
  padding: 0 5rem;
  margin-top: 5rem;
  
  line-height: 2rem;
`;

const StyledBottomLink = styled.div<{$left: boolean}>`
  font-size: 2rem;
  font-family: "Mondwest", sans-serif;
  
  position: absolute;
  
  bottom: 2rem;
  left: ${props => props.$left ? '2rem' : 'auto'};
  right: ${props => props.$left ? 'auto' : '2rem'};
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
      title={"Tom's custom cursor."}
    >
      <StyledTitle>
        Tom&apos;s custom cursor.
      </StyledTitle>

      <StyledParagraph>
        I made this custom cursor for my <MyButton href={'https://tomplanche.fr'} customCursor={cursorRef}>portfolio website</MyButton>. It is a simple circle that follows the mouse cursor.
        I learned a lot about React and Typescript while making this project. I also learned basic animation tools
        such as lerping and easing and GSAP animations.
      </StyledParagraph>

    </ProjectPageLayout>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default CustomCursorPage;

/**
 * End of file src/components/src/pages/CustomCursorPage/CustomCursorPage.tsx
 */
