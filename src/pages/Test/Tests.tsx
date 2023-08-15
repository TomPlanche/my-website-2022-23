/**
 * @file src/components/Test/Tests.tsx
 * @description Tests component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import styled from 'styled-components';
import ArrowLink from "../../components/ArrowLink";
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


// END VARIABLES =======================================================================================  END VARIABLES

// COMPONENENTS  ==========================================================================================   COMPONENT

/**
 * Tests component
 * @return
 * @constructor
 **/
const Tests = () => {
  // State(s)

  // Ref(s)

  // Method(s)

  // Effect(s)

  // Render
  return (
    <StyledTests>
      <ArrowLink title={"test"} style={{
        height: "4rem",
        gap: "2rem",

        padding: "0 2rem",

        fontSize: "2rem",
      }}/>
    </StyledTests>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default Tests;

/**
 * End of file src/components/src/components/Test/Tests.tsx
 */
