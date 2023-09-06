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
import MyUglyFace from "../components/MyUglyFace";
import IsPlayingDisplay from "../components/IsPlayingDisplay";

import {AppContext, commonTheme, noUserSelection} from "../App";
import TechStack from "../components/TechStack";

// END IMPORTS ==========================================================================================   END IMPORTS

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

// VARIABLES ================================================================================================ VARIABLES
// Styles
const StyledHome = styled.div(props => ({
  minHeight: props.theme.firstPageHeight,
  width: "100%",

  padding: `0 ${props.theme.sidePadding} ${props.theme.sidePadding} ${props.theme.sidePadding}`,

  background: props.theme.background,

  color: props.theme.color,

  fontFamily: "Migra, sans-serif !important",
  fontWeight: 700,

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  gap: props.theme.sidePadding,

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

  position: 'relative',
}));

const StyledHomeHalf = styled.div(props => ({
  height: '100%',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  fontFamily: "Mondwest, sans-serif !important",

  padding: '3rem',

  'h2, h3': {
    textAlign: 'left',
  }
}));


const StyledSection = styled.section(props => ({
  height: '100vh',
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
export enum E_Subtitles {
  FrontEnd = 'Front-end',
  FrontEndBackground = '#415a77',
  FrontEndColor = '#ffffff',

  BackEnd = 'Back-end',
  BackEndBackground = '#a3c4bc',
  BackEndColor = '#222222',

  GeneralCoding = 'General Coding',
  GeneralCodingBackground = '#778da9',
  GeneralCodingColor = '#eee',

  DataAnalysis = 'Data Analysis',
  DataAnalysisBackground = '#1b263b',
  DataAnalysisColor = '#eee',
}

// TechStack options
const optionsArray = [
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M20 4H4C3.44771 4 3 4.44772 3 5V19C3 19.5523 3.44772 20 4 20H20C20.5523 20 21 19.5523 21 19V5C21 4.44771 20.5523 4 20 4ZM4 2C2.34315 2 1 3.34315 1 5V19C1 20.6569 2.34315 22 4 22H20C21.6569 22 23 20.6569 23 19V5C23 3.34315 21.6569 2 20 2H4ZM6 7H8V9H6V7ZM11 7C10.4477 7 10 7.44772 10 8C10 8.55228 10.4477 9 11 9H17C17.5523 9 18 8.55228 18 8C18 7.44772 17.5523 7 17 7H11ZM8 11H6V13H8V11ZM10 12C10 11.4477 10.4477 11 11 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H11C10.4477 13 10 12.5523 10 12ZM8 15H6V17H8V15ZM10 16C10 15.4477 10.4477 15 11 15H17C17.5523 15 18 15.4477 18 16C18 16.5523 17.5523 17 17 17H11C10.4477 17 10 16.5523 10 16Z" fill="currentColor" /></svg>,
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z" fill="currentColor" /><path d="M11 13C11 14.1046 10.1046 15 9 15C7.89543 15 7 14.1046 7 13C7 11.8954 7.89543 11 9 11C10.1046 11 11 11.8954 11 13Z" fill="currentColor" /><path d="M15 15C16.1046 15 17 14.1046 17 13C17 11.8954 16.1046 11 15 11C13.8954 11 13 11.8954 13 13C13 14.1046 13.8954 15 15 15Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M3 4C3 2.34315 4.34315 1 6 1H18C19.6569 1 21 2.34315 21 4V20C21 21.6569 19.6569 23 18 23H6C4.34315 23 3 21.6569 3 20V4ZM6 3H18C18.5523 3 19 3.44772 19 4V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V4C5 3.44772 5.44772 3 6 3Z" fill="currentColor" /></svg>
];

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
  const {theme} = useContext(AppContext)

  // State(s)
  const [
    isPlayingLoadingAnimation,
    setIsPlayingLoadingAnimation
  ] = useState<boolean>(true);
  const [twoOptionsChoice, setTwoOptionsChoice] = useState<number>(0);

  // Ref(s)
  const headerRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const homeLandingRef = useRef<HTMLDivElement>(null);
  const leftHalfRef = useRef<HTMLDivElement>(null);
  const rightHalfRef = useRef<HTMLDivElement>(null);
  const myUglyFaceRef = useRef<HTMLDivElement>(null);
  const firstSectionRef = useRef<HTMLSelectElement>(null);
  const techStackSelectorRef = useRef<HTMLDivElement>(null);

  // Method(s)
  const handleChoice = () => {
    console.log(`handleChoice()`);
  }

  // Effect(s)
  useEffect(() => {
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
      .to(firstSectionRef.current, {
        opacity: 1,
        minHeight: commonTheme.firstPageHeight,
        height: 'auto',
        display: 'flex',
      })

  }, []);

  // Render
  return (
    <StyledHome
      ref={homeRef}
    >
      {!isPlayingLoadingAnimation && <IsPlayingDisplay songIfNotPlaying={false}/>}

      <Header key="header" ref={headerRef}/>

      <StyledHomeLanding
        ref={homeLandingRef}
      >
        <StyledHomeHalf
          style={{
            alignItems: 'flex-start',
          }}
          ref={leftHalfRef}
        >
          <h2
            style={{
              fontSize: "6rem"
            }}
          >Tom Planche</h2>
          <h3>Full Stack Developer</h3>
        </StyledHomeHalf>
        <StyledHomeHalf
          style={{
            width: '40%',
          }}
          ref={rightHalfRef}
        >
          <HomeContext.Provider value={{
            isPlayingLoadingAnimation: isPlayingLoadingAnimation,
          }}>
            <MyUglyFace ref={myUglyFaceRef}/>
          </HomeContext.Provider>
        </StyledHomeHalf>
      </StyledHomeLanding>

      <StyledSection
        ref={firstSectionRef}
      >

        <TechStack
          technologies={technologies}
          isLines={true}

          theme={theme}
        />

        {/*<h2*/}
        {/*  style={{*/}
        {/*    marginBottom: '2rem',*/}
        {/*  }}*/}
        {/*>*/}
        {/*  {twoOptionsChoice === 0 ? "Tech Stack" : "Projects"}*/}
        {/*</h2>*/}

        {/*{*/}
        {/*  !isPlayingLoadingAnimation && (*/}
        {/*    twoOptionsChoice === 0 ?*/}
        {/*      <>*/}
        {/*        <TechStack technologies={technologies}/>*/}

        {/*        <ArrowLink title={"My CV"} href={'/files/CV_FIN_2023.pdf'} style={{*/}
        {/*          marginTop: '2rem',*/}
        {/*          gap: '1rem',*/}
        {/*        }}/>*/}
        {/*      </>*/}
        {/*      :*/}
        {/*      <>*/}
        {/*        <p>*/}
        {/*          <MyButton href={'/my-music-player'}>*/}
        {/*            Little component*/}
        {/*          </MyButton> for displaying what I&apos;m listening live.*/}
        {/*        </p>*/}
        {/*      </>*/}
        {/*  )*/}
        {/*}*/}

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
