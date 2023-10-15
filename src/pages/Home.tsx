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
import {StyledParagraph} from "./LastFMHandlerPage";

import {AppContext, commonTheme, noUserSelection} from "../App";
import Article, {T_ArticleArg} from "../components/Article";

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

  paddingTop: '10vh',

  fontFamily: "Fraktion Mono, sans-serif",

  position: 'relative',
}));


const StyledH2Title = styled.h2(props => ({
  fontSize: '2.5rem',
  fontFamily: "Mondwest, sans-serif !important",
  textAlign: 'center',

  alignSelf: 'flex-start',

  "&:before": {
    content: '"$ "',
  }
}));

const StyledHomeParagraph = styled(StyledParagraph)(props => ({
  fontSize: '1.5rem',
  marginTop: '2rem',

  padding: '2rem',
  fontFamily: "Fraktion Mono, sans-serif !important",
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
const languages: T_ArticleArg[] = [
  {
    name: 'JS / TS',
    status: 'using',
  } as T_ArticleArg,
  {
    name: 'Python',
    status: 'using',
  } as T_ArticleArg,
  {
    name: 'Rust',
    status: 'learning',
  } as T_ArticleArg,
  {
    name: 'Shell',
    status: 'using',
  } as T_ArticleArg,
  {
    name: 'SQL',
    status: 'using',
  } as T_ArticleArg,
  {
    name: 'PHP',
    status: 'using',
  } as T_ArticleArg,
  {
    name: 'C++',
    status: 'using',
  } as T_ArticleArg,
  {
    name: 'C',
    status: 'learning',
  } as T_ArticleArg,
  {
    name: 'Java',
    status: 'learning',
  }
] as T_ArticleArg[];

const frameworksTools: T_ArticleArg[] = [
  {
    name: 'React',
    status: 'using',
  } as T_ArticleArg,
  {
    name: 'Vue',
    status: 'learning',
  } as T_ArticleArg,
  {
    name: 'SCSS',
    status: 'using',
  } as T_ArticleArg,
  {
    name: 'Next',
    status: 'toLearn',
  } as T_ArticleArg,
  {
    name: 'Laravel',
    status: 'using',
  },
  {
    name: 'Symfony',
    status: 'using',
  },
  {
    name: 'Docker',
    status: 'learning',
  },
  {
    name: 'Git',
    status: 'using',
  },
  {
    name: 'Jupyter',
    status: 'using',
  }
] as T_ArticleArg[];
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

       {/*@ts-ignore */}
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
          <h3
            style={{
              fontSize: "3vmax"
            }}
          >
            Full Stack Developer <br/>
            Programmer
          </h3>
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
        <StyledH2Title>whoami</StyledH2Title>

        <StyledHomeParagraph
          style={{
            alignSelf: 'flex-start',
          }}
        >
          I&apos;m a french student currently in Bayonne, France.

          <br/>
          <br/>
          <span>- means I&apos;m using it and I&apos;m comfortable with it</span>
          <br/>
          <span>~ means I&apos;m learning it</span>
          <br/>
          <span>+ means I&apos;m planning to learn it</span>
        </StyledHomeParagraph>

        <Article title={'Languages'} args={languages} />
        <Article title={'Frameworks / Tools'} args={frameworksTools} />
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
