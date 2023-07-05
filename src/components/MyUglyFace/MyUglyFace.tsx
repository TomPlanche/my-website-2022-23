/**
 * @file src/components/MyUglyFace/MyUglyFace.tsx
 * @description MyUglyFace component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes, useContext, useEffect, useLayoutEffect, useRef, useState,
} from "react";

import styled from "styled-components";
import { gsap } from "gsap";

import {AppContext} from "../../App";
import {HomeContext} from "../Home/Home";

// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLES
const StyledMyUglyFaceContainer = styled.div`
  height: 25rem;
  border-radius: 5rem;
  
  position: relative;
`;


const MyUglyFaceImg = styled.img`
  height: 100%;
  width: auto;
  
  border-radius: 5rem;
`;

type T_MyUglyFace = ForwardRefExoticComponent<RefAttributes<HTMLDivElement>>;
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * MyUglyFace component
 * @return {JSX.Element}
 * @constructor
 **/
const MyUglyFace: T_MyUglyFace = forwardRef((_, passedRef) => {
  // Context(s)
  const { theme, toggleTheme, cursorRef } = useContext(AppContext);
  const { isPlayingLoadingAnimation } = useContext(HomeContext)

  // State(s)
  const [isAnimating, setIsAnimating] = useState(false);

  // Ref(s)
  const myUglyFaceRef = useRef<HTMLImageElement>(null);

  const myUglyFaceRect = useRef({} as DOMRect);

  // Methods
  const handleMouseEnter = () => {
    if (
      isPlayingLoadingAnimation
      || isAnimating
    ) return;

    if(!cursorRef.current) return;

    cursorRef.current.onCursorEnter(null, true);
  }


  const handleMouseLeave = () => {
    if (!cursorRef.current) return;

    cursorRef.current.onCursorLeave(null, true);

    if (
      isAnimating
      || isPlayingLoadingAnimation
    ) return;

    gsap
      .to(myUglyFaceRef.current, {
        onStart: () => setIsAnimating(true),

        duration: 1,
        ease: 'Power3.easeOut',

        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,

        onComplete: () => setIsAnimating(false),
      })
  }

  const handleMouseMove = (e: any) => {
    if(
      !cursorRef.current
      || !myUglyFaceRef.current
      || isAnimating
      || isPlayingLoadingAnimation
    ) return;

    const { clientX, clientY } = e;
    const { top, left, width, height } = myUglyFaceRect.current;

    const turns = {
      x: -(-(clientX - left) + width / 2) / (width / 2),
      y: (height / 2 - (clientY - top)) / (height / 2),
    }

    const distance = Math.sqrt(Math.pow(turns.x, 2) + Math.pow(turns.y, 2));

    myUglyFaceRef.current.style.transform = `rotate3d(${turns.y}, ${turns.x}, 0, ${20 * distance}deg)`;
  }

  const handleResize = () => {
    if(!myUglyFaceRef.current) return;

    myUglyFaceRect.current = myUglyFaceRef.current.getBoundingClientRect();
  }

  // Effects
  useLayoutEffect(() => {
    if(!myUglyFaceRef.current) return;

    myUglyFaceRect.current = myUglyFaceRef.current.getBoundingClientRect();
  })

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])
  // Render
  return (
    <StyledMyUglyFaceContainer
      ref={passedRef}

      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <MyUglyFaceImg
        src="/imgs/imageCV.png"
        alt="My ugly face"
        ref={myUglyFaceRef}
      />
    </StyledMyUglyFaceContainer>
  )
})
// END COMPONENT =======================================================================================  END COMPONENT

export default MyUglyFace;

/**
 * End of file src/components/MyUglyFace/MyUglyFace.tsx
 */
