/**
 * @file src/components/Test/Tests.tsx
 * @description Tests component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import styled from 'styled-components';
import MyButton from "../MyButton";
import MagnetikContainer from "../Magnetik/MagnetikContainer";
import {useRef} from "react";
import MagnetikButton from "../Magnetik/MagnetikButton";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
// Styled components
const StyledTests = styled.div(props => ({
  height: props.theme.firstPageHeight,
  width: '100%',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledButton = styled(MyButton)`
  height: 5rem;
  width: 10rem;

  border-radius: 2.5rem;

  font-size: 2rem;
  font-family: 'Cirka', sans-serif;

  background: ${props => props.theme.background};
  border: 0.2rem solid ${props => props.theme.color};
`;

const StyledMagnetikButton = styled(MagnetikButton)`
  height: 5rem;
  width: 10rem;

  border-radius: 2.5rem;

  font-size: 2rem;
  font-family: 'Cirka', sans-serif;

  background: ${props => props.theme.background};
  border: 0.2rem solid ${props => props.theme.color};
`;
// Others

// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * Tests component
 * @return
 * @constructor
 **/
const Tests = () => {
  // State(s)

  // Ref(s)
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonTextRef = useRef<HTMLSpanElement>(null);

  const textBtnRef = useRef<HTMLButtonElement>(null);
  // Method(s)

  // Effect(s)

  // Render
  return (
    <StyledTests>
      <MagnetikContainer
        ref={buttonRef}

        fieldSize={2}
        fieldForce={1}
        // centered
      >
        <StyledButton>
          <span
            ref={buttonTextRef}
          >
            Test
          </span>
        </StyledButton>
      </MagnetikContainer>

      <div className="spacer" style={{
        margin: "2rem"
      }}></div>

      <MagnetikButton
        ref={textBtnRef}
        text={"Test"}
        style={{
          height: "5rem",
          width: "10rem",

          borderRadius: "2.5rem",

          fontSize: "2rem",
          fontFamily: "'Cirka', sans-serif",

          border: "0.2rem solid #eeeeee",
        }}

        fieldSize={2}
        fieldForce={1}
        // centered
      />

    </StyledTests>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default Tests;

/**
 * End of file src/components/src/components/Test/Tests.tsx
 */
