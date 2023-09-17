/**
 * @file Main component for the application.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {Context, createContext, FC, ReactElement, RefObject, useEffect, useRef, useState} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import styled, {ThemeProvider} from "styled-components";

import Home from "./pages/Home";
import LastFM_handler from "./assets/LastFM_Handler/LasfFM_handler";
import CustomCursor, {T_OnEnterLeave} from "./components/CustomCursor";
import {calcCssVar, stripCssVar} from "./assets/utils";
import Tests from "./pages/Test/Tests";
import CustomCursorPage from "./pages/CustomCursorPage";
import LastFMHandlerPage from "./pages/LastFMHandlerPage";
import IsPlayingDisplayPage from "./pages/IsPlayingDisplayPage";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLES
// Interfaces
export interface I_Theme {
  background: string;
  blurryBackground: string;
  color: string;
}

export interface I_AppContext {
  theme: 'light' | 'dark';
  LastFM_HandlerInstance: LastFM_handler;
  cursorRef: T_CursorRef;
  toggleTheme: () => void;
  support: T_Support;
}

// Types
type T_CursorRef = RefObject<{
  onCursorEnter: T_OnEnterLeave,
  onCursorLeave: T_OnEnterLeave,
}>

type T_Support = 'desktop' | 'mobile-tablet';
// Objects
export const themeValues = {
  // Values
  blurryBackgroundAlpha: 25,
  blurryBackgroundBlur: '12px',

  headerHeight: '8vmin',

  mainPadding: '2vmax',

  // Colors
  dark: '#080a13',
  light: '#e8e4d9',
}

const blackTheme: I_Theme = {
  background: themeValues.dark,
  blurryBackground: `${themeValues.light}${themeValues.blurryBackgroundAlpha}`,
  color: themeValues.light,
}

const whiteTheme: I_Theme = {
  background: themeValues.light,
  blurryBackground: `${themeValues.dark}90`,
  color: themeValues.dark,
}

export const blurryBackground = {
  backdropFilter: `blur(${themeValues.blurryBackgroundBlur})`,
  '-webkit-backdrop-filter': `blur(${themeValues.blurryBackgroundBlur})`,
}

export const noUserSelection = {
  '-webkit-user-select': 'none',
  '-moz-user-select': 'none',
  '-ms-user-select': 'none',
  'user-select': 'none',
}

// Dynamic values

export const commonTheme = {
  'header-background': '#22272e',

  fontFamilyNeueBit: 'Neue Bit, sans-serif',
  fontFamilyFraktionMono: 'Fraktion Mono, sans-serif',


  minHeight: `calc(100vh - ${themeValues.headerHeight} - (${themeValues.mainPadding} * 2))`,
  sidePadding: themeValues.mainPadding,
  minTopPadding: calcCssVar(themeValues.headerHeight, variableWithoutUnit => variableWithoutUnit + stripCssVar(themeValues.mainPadding) * 2),

  // Sizes
  'header-font-size': '2rem',
  headerHeight: themeValues.headerHeight,

  mainBorderRadius: '8px',
  firstPageHeight: `calc(100vh - ${themeValues.mainPadding})`,

  boxShadowSize: '.5rem',

  // Colors
  accent: '#1f6feb',
  blueFontColor: '#679fc5',
  linkColor: "#58a6ff",
  gold: '#D0D066',
  goldDimmed: '#D0D06650',

}

const AppDivStyled = styled.div(props => ({
  // height: '100vh',
  width: '100vw',

  background: props.theme.background,
  color: props.theme.color,

  '*:focus': {
    outline: `2px solid ${props.theme['accent']}`,
  }
}));

export const AppContext: Context<I_AppContext> = createContext<I_AppContext>({
  theme: 'dark',
  LastFM_HandlerInstance: LastFM_handler.getInstance('Tom_planche')
} as I_AppContext);
// END VARIABLES ======================================================================================= END VARIABLES


// COMPONENT ================================================================================================ COMPONENT
/**
 * @type {React.FC}
 * @returns {React.ReactElement}
 * @constructor
 */
const App: FC = (): ReactElement => {
  // State(s)
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [platform, setPlatform] = useState<T_Support>('desktop');

  // Ref(s)
  const cursorRef: T_CursorRef = useRef(null);

  // Method(s)
  /**
   * Toggle the theme between light and dark and return the new theme.
   *
   * @returns {string} The new theme.
   */
  const toggleTheme = (): string => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(newTheme);

    return newTheme;
  }

  useEffect(() => {
    // TITLE
    let finalTitle = "Tom Planche's website - "

    const changeTitle = () => {
      document.title = finalTitle

      // Shift the title
      finalTitle = finalTitle.substring(1) + finalTitle.substring(0, 1)

      if (finalTitle[0] === ' ') {
        finalTitle = finalTitle.substring(1) + finalTitle.substring(0, 1)
      }
    }

    const titleInterval = setInterval(changeTitle, 250);

    // PLATFORM
    const userAgent = navigator.userAgent.toLowerCase();

    if (/mobile|tablet/i.test(userAgent)) {
      setPlatform('mobile-tablet');
    } else {
      setPlatform('desktop');
    }

    return () => {
      clearInterval(titleInterval);
    }
  }, []);

  return (
    <AppContext.Provider value={{
      theme: theme,
      toggleTheme: toggleTheme,
      cursorRef: cursorRef,
      LastFM_HandlerInstance: LastFM_handler.getInstance(),
      support: platform,
    }}>
      <ThemeProvider theme={
        theme === 'dark' ? {...blackTheme, ...commonTheme} : {...whiteTheme, ...commonTheme}
      }>
        <AppDivStyled>
          {
            platform === 'desktop' && <CustomCursor ref={cursorRef} theme={theme} />
          }
          <BrowserRouter>

            <Routes>
              <Route index element={<Home />}/>

              <Route path={'/my-music-player'} element={<IsPlayingDisplayPage />}/>
              <Route path={'/my-custom-cursor'} element={<CustomCursorPage />}/>
              <Route path={'/lastFM-middleware'} element={<LastFMHandlerPage />}/>

              <Route path={'/tests'} element={<Tests/>}/>

              <Route path="*" element={<h1>Route: &apos{location.pathname}&apos not found</h1>}/>
            </Routes>
          </BrowserRouter>
        </AppDivStyled>
      </ThemeProvider>
    </AppContext.Provider>
  );
}
// END COMPONENT ======================================================================================== END COMPONENT
export default App;


/**
 * End of file App.tsx
 */
