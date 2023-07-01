/**
 * @file src/components/Home/Home.tsx
 * @description Home component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {RefObject, useEffect, useLayoutEffect, useRef, useState} from "react";

import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";

import styled from 'styled-components'

import Header from "../Header/Header";
import MyUglyFace from "../MyUglyFace/MyUglyFace";
import IsPlayingDisplay from "../IsPlayingDisplay/IsPlayingDisplay";

import {noUserSelection, commonTheme} from "../../App";
import {calcCssVar} from "../../assets/utils";

// END IMPORTS ==========================================================================================   END IMPORTS

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

// VARIABLES ================================================================================================ VARIABLES
// Styles
const StyledHome = styled.div(props => ({
  height: props.theme.firstPageHeight,

  'background': props.theme.background,

  'color': props.theme.color,

  fontFamily: "Migra, sans-serif !important",
  fontWeight: 700,

  'display': 'flex',
  'flexDirection': 'column',
  'alignItems': 'center',
  'justifyContent': 'center',

  'h2': {
    fontSize: '6rem',
  },

  'h3': {
    fontSize: '4rem',
  },

  ...noUserSelection,
}));

const StyledHomeLanding = styled.div(props => ({
  height: `${commonTheme.firstPageHeight}`,
  width: '100%',

  display: 'flex',
  flexDirection: "row",
  alignItems: 'center',
  justifyContent: 'center',

}));

const StyledHomeHalf = styled.div(props => ({
  height: '100%',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  fontFamily: "Mondwest, sans-serif !important",

  'h2, h3': {
    textAlign: 'left',
  }
}));

// Types
export type T_toPassRef = RefObject<HTMLDivElement>;
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * Home component
 * @return {JSX.Element}
 * @constructor
 **/
const Home = () => {
  // Context(s)

  // State(s)
  const [isPlayingLoadingAnimation, setIsPlayingLoadingAnimation] = useState<boolean>(true);

  // Ref(s)
  const headerRef: T_toPassRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const homeLandingRef = useRef<HTMLDivElement>(null);
  const leftHalfRef = useRef<HTMLDivElement>(null);
  const rightHalfRef = useRef<HTMLDivElement>(null);
  const myUglyFaceRef: T_toPassRef = useRef<HTMLDivElement>(null);

  // Method(s)


  // Effect(s)
  useLayoutEffect(() => {
    // Loading animation
    const loadingAnimation = gsap.timeline({
      onStart: () => {
        setIsPlayingLoadingAnimation(true);
      }
    });
    loadingAnimation
      .set(leftHalfRef.current, {
        opacity: 0,
        width: '0%',
      })
      .set(rightHalfRef.current, {
        width: '100%',
      })
      .set(headerRef.current, {
        opacity: 0,
        y: '-100%',
      })
      .set(myUglyFaceRef.current, {
        opacity: 0,
        scale: 0,
      })
      .to(myUglyFaceRef.current, {
        opacity: 1,
        scale: 1,
        duration: .5,
        ease: 'power2.out',
      })
      .to(leftHalfRef.current, {
        width: '55%',
        duration: .75,
        ease: 'power3.out',
      })
      .to(rightHalfRef.current, {
        width: '45%',
        duration: .5,
        ease: 'power.out',
      }, '<')
      .to(leftHalfRef.current, {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => {
          setIsPlayingLoadingAnimation(false);
        }
      })
      .to(headerRef.current, {
        opacity: 1,
        y: '0%',
        duration: 1,
        ease: 'power2.out',
      }, '<')
  }, []);

  // Render
  return (
    <StyledHome
      ref={homeRef}
    >
      {!isPlayingLoadingAnimation && <IsPlayingDisplay/>}

      <Header key="header" ref={headerRef} />

      <StyledHomeLanding
        ref={homeLandingRef}
      >
        <StyledHomeHalf
          style={{
            width: '60%',
          }}
          ref={leftHalfRef}
        >
          <h2>Tom Planche</h2>
          <h3>Full Stack Developer</h3>
        </StyledHomeHalf>
        <StyledHomeHalf
          style={{
            width: '40%',
          }}
          ref={rightHalfRef}
        >
          <MyUglyFace ref={myUglyFaceRef} />
        </StyledHomeHalf >
      </StyledHomeLanding>
    </StyledHome>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default Home;

/**
 * End of file src/components/Home/Home.tsx
 */
