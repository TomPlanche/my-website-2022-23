/**
 * @file src/components/Test/Tests.tsx
 * @description Tests component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import styled from 'styled-components';

import Header from "../../components/Header";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
// Styled components
const StyledTests = styled.div(props => ({
  minHeight: "100vh",
  width: '100vw',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',

  padding: props.theme.sidePadding,
  paddingTop: props.theme.minTopPadding,
}));

// Normal

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
      <Header />

    </StyledTests>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default Tests;

/**
 * End of file src/components/src/components/Test/Tests.tsx
 */
