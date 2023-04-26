/**
 * @file src/components/Menu/Menu.tsx
 * @description Menu component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {useEffect, useRef} from "react";

import gsap from "gsap";
import styled from "styled-components";

import {
  blurryBackground
} from "../../App";
import ProxySensor from "../../assets/proxySensor";
import {lineEq0to100} from "../../assets/utils";


// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLES
// STYLE
const menuConstants = {
  width: window.innerWidth * .125,
  height: window.innerHeight,
}

const StyledRightMenuTrigger = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  
  height: 100vh;
  width: 1px;
  
  transform: translateX(100%);
  
`;

const StyledRightMenu = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  
  height: 40vh;
  width: ${menuConstants.width}px;
  
  border-radius: 8px 0 0 8px;
  
  transform: translate(100%, -50%);
  
  background-color: ${props => props.theme['blurryBackground']};
  
  ...blurryBackground,
`;

const MenuSVG = <svg viewBox="0 0 14 37" width="100%" height="100%"><path d="M13.95.94v36.01h-3.858V.94zM3.919.94v36.01H.06V.94z"></path></svg>

const StyledMenuIcon = styled.div(props => ({
  position: 'absolute',
  top: '50%',
  right: 0,
  
  height: '1rem',
  width: '1rem',

  zIndex: 222,
  transform: 'translate(-100%, -50%)',
  
  svg: {
    height: '100%',
    width: '100%',

    path: {
      fill: props.theme.blueFontColor,
    },
  },
}))

// DATA
const translationInterval: {from: number, to: number} = {
  from: 0,
  to: 100,
}

const distanceThreshold: {min: number, max: number} = {
  min: menuConstants.width,
  max: menuConstants.width * 1.25,
}
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * Menu component
 * @return {JSX.Element}
 * @constructor
 **/
const Menu = () => {
  // State(s)

  // Ref(s)
  const rightMenuTriggerRef = useRef<HTMLDivElement>(null);
  const rightMenuRef = useRef<HTMLDivElement>(null);

  // Effect(s)
  useEffect(() => {
    const proxySensor = new ProxySensor({
      domElement: rightMenuTriggerRef.current,
      onProgress: (distance) => {
        const tx = lineEq0to100(
          translationInterval.from,
          translationInterval.to,
          distanceThreshold.max,
          distanceThreshold.min,
          distance
        );

        if (tx >= 0 && tx <= 100) {
          gsap.to(rightMenuRef.current, {
            duration: 0,
            transform: `translate(${100 - tx}%, -50%)`,
          });
        }

      }
    });

    // Clean up
    return () => {
      proxySensor.destroy();
    }
  }, [])

  // Render
  return (
    <>
      <StyledRightMenuTrigger ref={rightMenuTriggerRef} />
      <StyledMenuIcon>
        {MenuSVG}
      </StyledMenuIcon>

      <StyledRightMenu
        ref={rightMenuRef}
      >

      </StyledRightMenu>
    </>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default Menu;

/**
 * End of file src/components/Menu/Menu.tsx
 */
