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
} from "react";

import styled from "styled-components";

import {T_OnEnterLeave, T_OnEnterLeaveArgs} from "./CustomCursor";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLES
// Type(s)
type T_CursorRef = RefObject<{
  onCursorEnter: T_OnEnterLeave,
  onCursorLeave: T_OnEnterLeave,
}>

type T_AnchorProps = AnchorHTMLAttributes<HTMLElement> & {linkStyle?: boolean};
type T_ButtonProps = ButtonHTMLAttributes<HTMLElement>

type T_CurstomCursorTrue = {
  cursorRef: T_CursorRef;

  onEnterOptions?: T_OnEnterLeaveArgs;
  onLeaveOptions?: T_OnEnterLeaveArgs;
}

type T_MyButtonProps = (T_AnchorProps | T_ButtonProps) & RefAttributes<HTMLElement> & {
  customCursor?: T_CurstomCursorTrue | T_CursorRef;
}

type T_isAnchor = (props: T_MyButtonProps) => boolean;

export type T_MyButton = ForwardRefExoticComponent<T_MyButtonProps>;

// Styled components
const StyledMyButton = styled.button`
  display: inline-block;
  position: relative;
  cursor: pointer;

  color: #679fc5;

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #679fc5;
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

  color: #679fc5;

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #679fc5;
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
  // Method(s)
  const handleMouseEnter = () => {
    if (props.customCursor) {
      // Is props.customCursor a T_CurstomCursorTrue ?
      if ((props.customCursor as T_CursorRef).hasOwnProperty('current')) {
        const customCursor = props.customCursor as T_CursorRef;

        if (customCursor.current) {
          customCursor.current.onCursorEnter({},true);
        }
      } else {
        const customCursor = props.customCursor as T_CurstomCursorTrue;

        if (customCursor.cursorRef.current) {
          const {
            options,
            addBaseStyles,
            persist,
            verbose
          } = customCursor.onEnterOptions ?? {};

          customCursor.cursorRef.current.onCursorEnter(options ?? {}, addBaseStyles, persist, verbose);
        }
      }
    }
  }

  const handleMouseLeave = () => {
    if (props.customCursor) {
      if ((props.customCursor as T_CursorRef).hasOwnProperty('current')) {
        const customCursor = props.customCursor as T_CursorRef;

        if (customCursor.current) {
          customCursor.current.onCursorLeave({},true);
        }
      } else {
        const customCursor = props.customCursor as T_CurstomCursorTrue;

        if (customCursor.cursorRef.current) {
          const {
            options,
            addBaseStyles,
            persist,
            verbose
          } = customCursor.onLeaveOptions ?? {};

          customCursor.cursorRef.current.onCursorLeave(options ?? {}, addBaseStyles, persist, verbose);
        }
      }
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
