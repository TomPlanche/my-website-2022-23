/**
 * @file src/components/MyButton/MyButton.tsx
 * @description MyButton component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  RefObject,
  useContext,
} from "react";
import {AppContext} from "../App";
import styled from "styled-components";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLES
type T_AnchorProps = AnchorHTMLAttributes<HTMLElement> & {linkStyle?: boolean};
type T_ButtonProps = ButtonHTMLAttributes<HTMLElement>


type T_MyButtonProps = (T_AnchorProps | T_ButtonProps) & RefAttributes<HTMLElement>;

type T_isAnchor = (props: T_MyButtonProps) => boolean;

export type T_MyButton = ForwardRefExoticComponent<T_MyButtonProps>;

const StyledMyButton = styled.button`
  display: inline-block;
  position: relative;
  cursor: pointer;

  color: #2077b2;

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #2077b2;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;

    z-index: 444;
  }

  &:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

const StyledMyLink = styled.a`
  display: inline-block;
  position: relative;
  cursor: pointer;

  color: #2077b2;

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #2077b2;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;

    z-index: 444;
  }

  &:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

const NonStyledAnchor = styled.a``;
// END VARIABLES ======================================================================================= END VARIABLES

const isAnchor: T_isAnchor = (props) => {
  return (props as T_AnchorProps).href !== undefined
}


// COMPONENENT  ============================================================================================= COMPONENT
/**
 * MyButton component
 * @return {JSX.Element}
 * @constructor
 **/
const MyButton: T_MyButton = forwardRef((props, ref) => {
  // Context(s)
  const {cursorRef} = useContext(AppContext);

  // Method(s)
  const handleMouseEnter = () => {
    if (cursorRef.current) {
      cursorRef.current.onCursorEnter({
        backgroundColor: 'red',
      }, true)
    }
  }

  const handleMouseLeave = () => {
    if (cursorRef.current) {
      cursorRef.current.onCursorLeave({}, true)
    }
  }

  // Render
  if (isAnchor(props)) {

    const finalProps = props as T_AnchorProps;
    const linkClass = finalProps.linkStyle ?? true;

    const FinalLink = linkClass ? StyledMyLink : NonStyledAnchor;

    return <FinalLink
      {...props}

      ref={ref as RefObject<HTMLAnchorElement>}

      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />;
  }

  const btnProps = {
    ...(props as T_ButtonProps),
  };

  return <StyledMyButton
    type={btnProps.type || 'button'}

    {...btnProps}

    ref={ref as RefObject<HTMLButtonElement>}

    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  />;
});

// END COMPONENT =======================================================================================  END COMPONENT

MyButton.displayName = 'MyButton';

export default MyButton;

/**
 * End of file src/components/MyButton/MyButton.tsx
 */
