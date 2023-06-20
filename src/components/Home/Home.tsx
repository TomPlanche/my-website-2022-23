/**
 * @file src/components/Home/Home.tsx
 * @description Home component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
// import {
//   useContext,
// } from "react";

import { gsap } from "gsap";
import SplitText from "gsap/SplitText";

import styled from 'styled-components'

// import {
//   AppContext,
// } from '../../App';

// import Menu from "../Menu/Menu";
import {RefObject, useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import IsPlayingDisplay from "../IsPlayingDisplay/IsPlayingDisplay";
import {AppContext, noUserSelection} from "../../App";
import {Link} from "react-router-dom";
import Header from "../Header/Header";
// END IMPORTS ==========================================================================================   END IMPORTS

gsap.registerPlugin(SplitText);

// VARIABLES ================================================================================================ VARIABLES
const StyledHome = styled.div(props => ({
  height: '100%',

  'background': props.theme.background,

  'padding': `${props.theme.sidePadding} 0`,

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
  height: '100%',
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

const MyUglyFace = styled.img`
  height: 25rem;
  width: auto;
  
  border-radius: 5rem;
`
type T_headerRef = RefObject<HTMLDivElement>;
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * Home component
 * @return {JSX.Element}
 * @constructor
 **/
const Home = () => {
  // Context(s)
  const {LastFM_HandlerInstance} = useContext(AppContext);

  // State(s)
  const [isPlayingLoadingAnimation, setIsPlayingLoadingAnimation] = useState<boolean>(true);
  const [reverseMyUglyFace, setReverseMyUglyFace] = useState<boolean>(false);
  const [myUglyFaceIsAnimating, setMyUglyFaceIsAnimating] = useState<boolean>(false);

  // Ref(s)
  const headerRef: T_headerRef = useRef(null);
  const homeLandingRef = useRef(null);
  const leftHalfRef = useRef(null);
  const rightHalfRef = useRef(null);
  const myUglyFaceRef = useRef(null);

  // Method(s)
  const handleMyUglyFaceMouseEnter = () => {
    setReverseMyUglyFace(true);
  }

  const handleMyUglyFaceMouseLeave = () => {
    setReverseMyUglyFace(false);
  }

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

  useEffect(() => {
    if (myUglyFaceIsAnimating) {
      setTimeout(() => {
        setReverseMyUglyFace(reverseMyUglyFace);
      }, 1000)
      return;
    }

    gsap.to(myUglyFaceRef.current, {
      rotateY: reverseMyUglyFace ? 180 : 0,
      duration: .5,
      ease: 'power2.out',
      onStart: () => {
        setMyUglyFaceIsAnimating(true);
      },
      onComplete: () => {
        setMyUglyFaceIsAnimating(false);
      }
    })

  }, [reverseMyUglyFace])
  // Render
  return (
    <StyledHome>
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
          <MyUglyFace
            src="/imgs/imageCV.png"
            alt="My ugly face"
            ref={myUglyFaceRef}

            onMouseEnter={handleMyUglyFaceMouseEnter}
            onMouseLeave={handleMyUglyFaceMouseLeave}
          />
        </StyledHomeHalf>
      </StyledHomeLanding>

    </StyledHome>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default Home;

/**
 * End of file src/components/Home/Home.tsx
 */
