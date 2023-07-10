/**
 * @file src/components/Header/Header.tsx
 * @description Header component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";

import styled from "styled-components";
import {gsap} from "gsap";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";

import {AppContext, blurryBackground, noUserSelection,} from "../../App";

import MyButton from "../MyButton";
// END IMPORTS ==========================================================================================   END IMPORTS

gsap.registerPlugin(ScrambleTextPlugin);

// VARIABLES ================================================================================================ VARIABLES
// Styles
const StyledHeader = styled.div(props => ({
  position: 'fixed',
  top: props.theme.sidePadding,

  height: props.theme.headerHeight,
  width: `calc(100% - ${props.theme.sidePadding} * 2)`,

  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',

  padding: `0 ${props.theme.sidePadding}`,

  borderRadius: '1rem',

  color: props.theme.blueFontColor,
  fontSize: props.theme['header-font-size'],
  fontFamily: props.theme.fontFamilyNeueBit,
  fontWeight: 700,

  backgroundColor: props.theme['blurryBackground'],

  zIndex: 300,

  ...noUserSelection,
  ...blurryBackground,
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

const StyledHeaderTime = styled.p(props => ({
  fontFamily: props.theme.fontFamilyFraktionMono,
  fontSize: '1rem',
}));

const StyledHeaderThemeBtn = styled(MyButton)`
  height: 2rem;
  width: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.5rem;
`

// Consts
const moonsArray = ["🌕", "🌖", "🌗", "🌘", "🌑", "🌒", "🌓", "🌔"];
const darkIndex = moonsArray.indexOf("🌑");
const lightIndex = moonsArray.indexOf("🌕");

// Types
type T_Header = ForwardRefExoticComponent<RefAttributes<HTMLDivElement>>;

type T_changeEmoji = (theme?: 'light' | 'dark') => void;
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT

/**
 * Header component
 * @return {JSX.Element}
 * @constructor
 **/
const Header: T_Header = forwardRef((_, ref) => {
  // Context(s)
  const {theme, toggleTheme, cursorRef} = useContext(AppContext);

  // State(s)
  const [emojiHovered, setEmojiHovered] = useState(false);
  // Ref(s)
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timeRef = useRef<HTMLHeadingElement>(null);
  const themeBtnRef = useRef<HTMLButtonElement>(null);

  const timeIntervalRef = useRef<NodeJS.Timer>();
  const emojiChangeIntervalRef = useRef<NodeJS.Timer>();

  // Variable(s)
  // Method(s)
  const changeEmoji: T_changeEmoji = (themeToGo) => {
    if (!themeBtnRef.current) return;

    const target = themeToGo === 'light' ? darkIndex : lightIndex;
    const current = moonsArray.indexOf(themeBtnRef.current?.innerHTML || "🌑");
    const next = (current + 1) % moonsArray.length;

    if (!themeToGo) {
      themeBtnRef.current.innerHTML = moonsArray[next];
      return;
    }

    if (current === target) {
      clearInterval(emojiChangeIntervalRef.current);
      return;
    }

    themeBtnRef.current.innerHTML = moonsArray[next];
  }

  const placeEmoji = () => {
    return theme === 'light' ? moonsArray[darkIndex] : moonsArray[lightIndex];
  }

  const handleThemeButtonClick = (e: any) => {
    const target = e.currentTarget;

    target.blur();
    toggleTheme();
  }

  const handleButtonMouseEnter = () => {
    cursorRef.current?.onCursorEnter(null, true);
    setEmojiHovered(true)
  }

  const handleButtonMouseLeave = () => {
    cursorRef.current?.onCursorLeave(null, true);
    setEmojiHovered(false)
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
      timeRef.current.innerHTML = new Date().toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }

    // Each second, update the time
    if (timeIntervalRef) {
      timeIntervalRef.current = setInterval(() => {
        // French time format like 18h30:14
        if (timeRef.current) {
          timeRef.current.innerHTML = new Date().toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
        }
      }, 1000);
    }

    // Clean up
    return () => {
      clearInterval(timeIntervalRef.current);
    }
  }, []);

  useEffect(() => {
    if (emojiHovered) {
      emojiChangeIntervalRef.current = setInterval(() => {
        changeEmoji();
      }, 100);
    } else {
      if (emojiChangeIntervalRef.current === undefined) return;

      clearInterval(emojiChangeIntervalRef.current);
      emojiChangeIntervalRef.current = undefined;

      emojiChangeIntervalRef.current = setInterval(() => {
        changeEmoji(theme);
      }, 100);
    }
  }, [emojiHovered])

  // Render
  return (
    <StyledHeader
      ref={ref}
    >
      <h1
        ref={titleRef}
      ></h1>
      <StyledHeaderRight
      >
        <StyledHeaderTime
          ref={timeRef}
        >
        </StyledHeaderTime>
        <StyledHeaderThemeBtn
          ref={themeBtnRef}

          onClick={handleThemeButtonClick}
          onMouseEnter={handleButtonMouseEnter}
          onMouseLeave={handleButtonMouseLeave}
        >
          {placeEmoji()}
        </StyledHeaderThemeBtn>
      </StyledHeaderRight>
    </StyledHeader>
  )
})
// END COMPONENT =======================================================================================  END COMPONENT

Header.displayName = 'Header';

export default Header;

/**
 * End of file src/components/Header/Header.tsx
 */
