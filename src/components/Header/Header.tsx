/**
 * @file src/components/Header/Header.tsx
 * @description Header component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {
  MouseEvent,

  useContext, useEffect,
  useLayoutEffect,
  useRef, useState
} from "react";
import styled from "styled-components";

import { gsap} from "gsap";

import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";

import {
  AppContext,

  blurryBackground,
  commonTheme
} from "../../App";

import {verifyIsInBounds} from "../../assets/utils";

import styles from './Header.module.scss'

import MyButton from "../MyButton";
// END IMPORTS ==========================================================================================   END IMPORTS

gsap.registerPlugin(ScrambleTextPlugin);

// VARIABLES ================================================================================================ VARIABLES
const StyledHeader = styled.div(props => ({
  color: props.theme.blueFontColor,
  fontSize: props.theme['header-font-size'],
  fontFamily: props.theme.fontFamilyNeueBit,
  fontWeight: 700,

  position: 'absolute',
  top: `${props.theme.sidePadding}`,

  padding: `0 ${props.theme.sidePadding}`,
  paddingBottom: props.theme.sidePadding,

  height: props.theme['header-height'],
  width: `calc(100% - ${props.theme.sidePadding} * 2)`,

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',

  borderRadius: '1rem',

  backgroundColor: props.theme['blurryBackground'],
  ...blurryBackground,
}));

const StyledHeaderTop = styled.div(props => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  height: props.theme['header-height'],
  width: '100%',

  position: 'relative',
}));

const StyledHeaderMenuIcon = styled.div(props => ({
  height: '1.5rem',
  width: '1.5rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  fill: props.theme.blueFontColor,

  position: 'absolute',
  top: '50%',
  left: '50%',

  transform: 'translate(-50%, -50%)',
}));


const StyledHeaderRight = styled.div(props => ({
  height: props.theme['header-height'],

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',

  fontFamily: props.theme.fontFamilyFraktionMono,
  fontSize: '1rem',
}));

const StyledHeaderContent = styled.div(props => ({
  height: '100%',
  width: '100%',

  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'center',
  gap: '.5rem',


  backgroundColor: 'hotpink',
}));

const StyledHeaderItem = styled.div(props => ({
  height: '40%',
  width: '40%',

  minWidth: '200px',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  borderRadius: '1rem',
  border: `1px solid ${props.theme.blueFontColor}`,

}));

// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * Header component
 * @return {JSX.Element}
 * @constructor
 **/
const Header = () => {
  // Context(s)
  const { toggleTheme } = useContext(AppContext);

  // State(s)
  const [isHovered, setIsHovered] = useState<boolean>(true);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);

  // Ref(s)
  const headerRef = useRef<HTMLDivElement>(null);
  const svgToggleThemeRef = useRef<SVGSVGElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
  const timeRef = useRef<HTMLHeadingElement>(null);
  const headerRightRef = useRef<HTMLDivElement>(null);

  let timeIntervalRef = useRef<number>(0);

  // Method(s)
  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    // If the mouse is in the bounds of the HeaderRight
    if (verifyIsInBounds({x: e.clientX, y: e.clientY}, headerRightRef.current?.getBoundingClientRect() as DOMRect)) {
      return;
    }

    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  // Effect(s)
  useLayoutEffect(() => {
    // Infinite gsap animation - random duration, speed, reverse, repeat, revealDelay
    gsap.timeline({repeat: -1, repeatDelay: 3})
      .to(titleRef.current, {
        duration: () => Math.random() * 2 + 2,
        scrambleText: {
          text: "<TomPlanche \\>",
          chars: "@&][{}()#%?!",
          // speed: Math.random() * 0.5 + 0.25,
          revealDelay: Math.random() * 0.5 + 0.1,
          // ease: "power3.inOut",
        },
      })

    if (timeRef.current) {
      timeRef.current.innerHTML = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit'});
    }

	  // Each second, update the time
	  if (timeIntervalRef) {
      timeIntervalRef.current = setInterval(() => {
			// French time format like 18h30:14
      if (timeRef.current) {
			  timeRef.current.innerHTML = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit'});
      }
	  }, 1000);
    }

    // Clean up
    return () => {
      clearInterval(timeIntervalRef.current);
    }
  }, []);


  useEffect(() => {
    gsap.to(headerRef.current, {
      duration: 0.5,
      height: isHovered ? `50svh` : commonTheme['header-height'],
      ease: `elastic.in(${isHovered ? 1 : .8}, 1)`,

      onStart: () => {
        !isHovered && setIsMenuOpen(false);
      },

      onComplete: () => {
        isHovered && setIsMenuOpen(true);
      }
    });
  }, [isHovered]);

  // Render
  return (
    <StyledHeader
      ref={headerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <StyledHeaderTop>
        <h1
          ref={titleRef}
        ></h1>
        <StyledHeaderRight
          ref={headerRightRef}
        >
          <h3
            className={styles.time}
            ref={timeRef}
          >
          </h3>
          <MyButton
            className={styles.toggleThemeButton}
            onClick={toggleTheme}
          >
            <svg
              ref={svgToggleThemeRef}
              width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M11 0H13V4.06189C12.6724 4.02104 12.3387 4 12 4C11.6613 4 11.3276 4.02104 11 4.06189V0ZM7.0943 5.68018L4.22173 2.80761L2.80752 4.22183L5.6801 7.09441C6.09071 6.56618 6.56608 6.0908 7.0943 5.68018ZM4.06189 11H0V13H4.06189C4.02104 12.6724 4 12.3387 4 12C4 11.6613 4.02104 11.3276 4.06189 11ZM5.6801 16.9056L2.80751 19.7782L4.22173 21.1924L7.0943 18.3198C6.56608 17.9092 6.09071 17.4338 5.6801 16.9056ZM11 19.9381V24H13V19.9381C12.6724 19.979 12.3387 20 12 20C11.6613 20 11.3276 19.979 11 19.9381ZM16.9056 18.3199L19.7781 21.1924L21.1923 19.7782L18.3198 16.9057C17.9092 17.4339 17.4338 17.9093 16.9056 18.3199ZM19.9381 13H24V11H19.9381C19.979 11.3276 20 11.6613 20 12C20 12.3387 19.979 12.6724 19.9381 13ZM18.3198 7.0943L21.1923 4.22183L19.7781 2.80762L16.9056 5.6801C17.4338 6.09071 17.9092 6.56608 18.3198 7.0943Z" fill="currentColor" />
            </svg>
          </MyButton>
        </StyledHeaderRight>

        <StyledHeaderMenuIcon>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z" fill="currentColor" /><path d="M2 12.0322C2 11.4799 2.44772 11.0322 3 11.0322H21C21.5523 11.0322 22 11.4799 22 12.0322C22 12.5845 21.5523 13.0322 21 13.0322H3C2.44772 13.0322 2 12.5845 2 12.0322Z" fill="currentColor" /><path d="M3 17.0645C2.44772 17.0645 2 17.5122 2 18.0645C2 18.6167 2.44772 19.0645 3 19.0645H21C21.5523 19.0645 22 18.6167 22 18.0645C22 17.5122 21.5523 17.0645 21 17.0645H3Z" fill="currentColor" /></svg>
        </StyledHeaderMenuIcon>
      </StyledHeaderTop>

      {
        isMenuOpen &&
        <StyledHeaderContent>
          <StyledHeaderItem>
            OEOEOE
          </StyledHeaderItem>

          <StyledHeaderItem>
            OEOEOE
          </StyledHeaderItem>

          <StyledHeaderItem>
            OEOEOE
          </StyledHeaderItem>

          <StyledHeaderItem>
            OEOEOE
          </StyledHeaderItem>
        </StyledHeaderContent>

      }
    </StyledHeader>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default Header;

/**
 * End of file src/components/Header/Header.tsx
 */
