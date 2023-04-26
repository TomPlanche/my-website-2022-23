/**
 * @file src/components/MyButton/MyButton.tsx
 * @description MyButton component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {AnchorHTMLAttributes, ButtonHTMLAttributes} from "react";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLES
type AnchorProps = AnchorHTMLAttributes<HTMLElement>
type ButtonProps = ButtonHTMLAttributes<HTMLElement>
type MyButtonProps = AnchorProps | ButtonProps
// END VARIABLES ======================================================================================= END VARIABLES

function isAnchor(props: MyButtonProps): props is AnchorProps {
  return (props as AnchorProps).href !== undefined
}

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * MyButton component
 * @return {JSX.Element}
 * @constructor
 **/
export function MyButton(props: MyButtonProps) {
  if (isAnchor(props)) {
    return <a className="my-button" {...props} />
  }
  return <button type="button" className="my-button" {...props} />
}




// END COMPONENT =======================================================================================  END COMPONENT

export default MyButton;

/**
 * End of file src/components/MyButton/MyButton.tsx
 */
