/**
 * @file src/components/Footer/Footer.tsx
 * @description Footer component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import styled from 'styled-components';
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
const StyledFooter = styled.div`
  height: 5rem;
  width: 100%;
  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  
  font-family: 'Cirka', sans-serif;
  font-size: 2rem;
`;
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * Footer component
 * @return
 * @constructor
 **/
const Footer = () => {
  // State(s)

  // Ref(s)

  // Method(s)

  // Effect(s)

  // Render
  return (
    <StyledFooter>
      <p>"Designed" and coded by Tom Planche</p>
    </StyledFooter>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default Footer;

/**
 * End of file src/components/src/components/Footer/Footer.tsx
 */
