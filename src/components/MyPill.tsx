/**
 * @file src/components/MyPill.tsx
 * @description MyPill component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import styled from 'styled-components';
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
// Styled components
const StyledMyPill = styled.span<{$bgColor?: string}>(props => ({
  height: 'max-content',
  width: 'fit-content',

  display: 'flex',
  flexDirection: 'row',

  fontSize: '1.5rem',
  fontFamily: "Fraktion Mono, sans-serif !important",
  padding: '.25rem 1rem',

  borderRadius: '1rem',

  backgroundColor: props.$bgColor ?? "#679fc5",
  color: props.theme.color,
}));

// Type(s)
export type T_MyPillProps = {
  children?: JSX.Element | JSX.Element[] | string;

  icon?: string;
  bgColor?: string;
}

type T_MyPill = (props: T_MyPillProps) => JSX.Element;
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * MyPill component
 * @return
 * @constructor
 **/
const MyPill: T_MyPill = (props) => {
  // State(s)

  // Ref(s)

  // Method(s)

  // Effect(s)

  // Render
  return (
    <StyledMyPill
      $bgColor={props.bgColor}
    >
      {props.icon}
      <>
        {props.children}
      </>
    </StyledMyPill>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default MyPill;

/**
 * End of file src/components/src/components/MyPill.tsx
 */
