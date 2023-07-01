/**
 * @file src/components/MyButton/MyButton.tsx
 * @description MyButton component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes, createRef, forwardRef,
  ForwardRefExoticComponent, LegacyRef, RefAttributes, RefObject,
} from "react";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLES
type T_AnchorProps = AnchorHTMLAttributes<HTMLElement>
type T_ButtonProps = ButtonHTMLAttributes<HTMLElement>

type T_MyButtonProps = (T_AnchorProps | T_ButtonProps) & RefAttributes<HTMLElement>

type T_isAnchor = (props: T_MyButtonProps) => boolean;

export type T_MyButton = ForwardRefExoticComponent<T_MyButtonProps>;
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

  if (isAnchor(props)) {
    return <a {...props} ref={ref as RefObject<HTMLAnchorElement>} />;
  }

  const btnProps = {
    ...(props as T_ButtonProps),
  };

  return<button
    type={btnProps.type || 'button'}
    {...btnProps}
    ref={ref as RefObject<HTMLButtonElement>}
  />;
});

// END COMPONENT =======================================================================================  END COMPONENT

export default MyButton;

/**
 * End of file src/components/MyButton/MyButton.tsx
 */
