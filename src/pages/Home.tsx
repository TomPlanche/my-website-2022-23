/**
 * @file src/components/Home/Home.tsx
 * @description Home component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {createContext, useContext, useEffect, useRef, useState} from "react";

import {gsap} from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

import styled from 'styled-components'

import Header from "../components/Header";
import MyUglyFace, {MyUglyFaceImg} from "../components/MyUglyFace";
import IsPlayingDisplay from "../components/IsPlayingDisplay";

import {AppContext, commonTheme, noUserSelection} from "../App";

// END IMPORTS ==========================================================================================   END IMPORTS

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

// VARIABLES ================================================================================================ VARIABLES
// Styles
const StyledHome = styled.div(props => ({
  minHeight: props.theme.firstPageHeight,
  width: "100%",

  padding: `${props.theme.sidePadding}`,

  background: props.theme.background,

  color: props.theme.color,

  fontFamily: "Migra, sans-serif !important",
  fontWeight: 700,

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  'h3': {
    fontSize: '4rem',
  },

  ...noUserSelection,
}));

const StyledHomeLanding = styled.div<{$mobile: boolean}>(props => ({
  height: `${commonTheme.firstPageHeight}`,
  width: '100%',

  display: 'flex',
  flexDirection: props.$mobile ? 'column-reverse' : 'row',
  alignItems: 'center',
  justifyContent: 'center',

  position: 'relative',
}));

const StyledHomeHalf = styled.div<{$mobile: boolean}>(props => ({
  height: props.$mobile ? 'auto' : '100%',
  width: props.$mobile ? '100%' : 'auto',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  fontFamily: "Mondwest, sans-serif !important",

  padding: '3rem',

  'h2, h3': {
    textAlign: props.$mobile ? 'center' : 'left',
  }
}));


const StyledSection = styled.section(props => ({
  height: `${commonTheme.firstPageHeight}`,
  width: '100%',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',

  paddingTop: '15vh',

  fontFamily: "Fraktion Mono, sans-serif",

  position: 'relative',
}));

// Types
type T_homeContext = {
  isPlayingLoadingAnimation: boolean,
}


// Context
export const HomeContext = createContext<T_homeContext>({
  isPlayingLoadingAnimation: true,
} as T_homeContext);

// Other

type T_Technology = {
  name: string;
  bio: string;

  imgs: string[];
}

const technologies: T_Technology[] = [
  {
    name: "React",
    bio: "I learned and used React for this website. " +
      "I used it with TypeScript and styled-components.",

    imgs: []
  },

  {
    name: "TypeScript",
    bio: "I learned and used TypeScript for this website.",

    imgs: []
  },

  {
    name: "Python",
    bio: "I learned and used since 2017. Web scraping, data analysis, I love this language.",

    imgs: []
  },

  {
    name: "PHP",
    bio: "I learned PHP at school and mastered it during my internship at the end of my second year of BUT.",

    imgs: []
  },

  {
    "name": "DBs",
    "bio": "I learned and used MySQL, MongoDB, PostgreSQL and SQLite.",

    imgs: []
  },

  {
    name: "Others",
    bio: "I also learned and used other languages and frameworks, such as Java, C, C++, Angular, Symphony " +
      ", Laravel and more.",

    imgs: []
  }
];

// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * Home component
 * @return {JSX.Element}
 * @constructor
 **/
const Home = () => {
  // Context(s)
  const {theme, cursorRef, support} = useContext(AppContext)

  // State(s)
  const [
    isPlayingLoadingAnimation,
    setIsPlayingLoadingAnimation
  ] = useState<boolean>(true);

  // Ref(s)
  const headerRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const homeLandingRef = useRef<HTMLDivElement>(null);
  const leftHalfRef = useRef<HTMLDivElement>(null);
  const rightHalfRef = useRef<HTMLDivElement>(null);
  const myUglyFaceRef = useRef<HTMLDivElement>(null);
  const firstSectionRef = useRef<HTMLSelectElement>(null);

  // Method(s)

  // Effect(s)
  useEffect(() => {
    // Loading animation
    const loadingAnimation = gsap.timeline({
      onStart: () => {
        setIsPlayingLoadingAnimation(true);
      }
    });

    if (support === "desktop") {

      console.log("desktop");
      
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
      .set(firstSectionRef.current, {
        opacity: 0,
        height: 0,
        display: 'none',
      })
      .to(myUglyFaceRef.current, {
        opacity: 1,
        scale: 1,
        duration: .5,
        ease: 'power2.out',
      })
      .to(leftHalfRef.current, {
        width: "100%",
        duration: .75,
        ease: 'power3.out',
      })
      .to(rightHalfRef.current, {
        width: '100%',
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
      .to(firstSectionRef.current, {
        opacity: 1,
        minHeight: commonTheme.firstPageHeight,
        height: 'auto',
        display: 'flex',
      })

      const scrollTriggerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: homeRef.current,
          start: 'top top',
          end: "35%",
          scrub: 1,
          markers: true,
        }
      });

      scrollTriggerTimeline
        .to(leftHalfRef.current, {
          paddingTop: '35vh',
          duration: .25,
          ease: 'power2.out',
        });

    } else {
      console.log("mobile");
    }

  }, []);

  // Render
  // @ts-ignore
  return (
    <StyledHome
      ref={homeRef}
    >
      {!isPlayingLoadingAnimation && <IsPlayingDisplay songIfNotPlaying={false}/>}

      <Header key="header" ref={headerRef}/>

      {/* @ts-ignore */}
      {/*<MyModal*/}
      {/*  title="Warning ⚠️"*/}
      {/*  type="ok"*/}
      {/*  background={"blurry"}*/}
      {/*>*/}
      {/*  <StyledParagraph style={{marginTop: 0}}>*/}
      {/*    This website is under construction 🚧. <br/>*/}
      {/*    Please come back later ? <br/>*/}

      {/*    I&apos;ll suggest you to go to my &nbsp;*/}

      {/*    <MyButton*/}
      {/*      href={"https://github.com/TomPlanche/"}*/}
      {/*      customCursor={{*/}
      {/*        cursorRef: cursorRef,*/}

      {/*        onEnterOptions: {*/}
      {/*          options: {*/}
      {/*            svg: 'https://github.githubassets.com/images/mona-loading-dark.gif',*/}
      {/*            backgroundColor: 'transparent',*/}
      {/*            opacity: {current: 1},*/}
      {/*          },*/}
      {/*          addBaseStyles: true,*/}
      {/*        },*/}
      {/*        onLeaveOptions: {*/}
      {/*          options: {*/}
      {/*            svg: false*/}
      {/*          },*/}
      {/*          addBaseStyles: true,*/}
      {/*        }*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      GitHub*/}
      {/*    </MyButton>*/}
      {/*  </StyledParagraph>*/}
      {/*</MyModal>*/}

      <StyledHomeLanding
        ref={homeLandingRef}

        $mobile={support === 'mobile-tablet'}
      >
        <StyledHomeHalf
          style={{
            alignItems: support === 'desktop' ? 'flex-start' : 'center',
          }}
          $mobile={support === 'mobile-tablet'}
          ref={leftHalfRef}
        >
          <h2
            style={{
              fontSize: "5vmax"
            }}
          >Tom Planche</h2>
          <h3>Full Stack Developer</h3>
        </StyledHomeHalf>
        <StyledHomeHalf
          style={{
            width: '40%',
          }}
          $mobile={support === 'mobile-tablet'}
          ref={rightHalfRef}
        >
          <HomeContext.Provider value={{
            isPlayingLoadingAnimation: isPlayingLoadingAnimation,
          }}>
            {
              support === 'desktop'
                ? <MyUglyFace ref={myUglyFaceRef}/>
                : <MyUglyFaceImg
                    src="/imgs/imageCV.png"
                    alt="My ugly face"
                  />
            }
          </HomeContext.Provider>
        </StyledHomeHalf>
      </StyledHomeLanding>

      <StyledSection
        ref={firstSectionRef}
      >


      </StyledSection>

      {/*{*/}
      {/*  !isPlayingLoadingAnimation && <Footer/>*/}
      {/*}*/}
    </StyledHome>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default Home;

/**
 * End of file src/components/Home/Home.tsx
 */
