/**
 * @file Main component for the application.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {Context, createContext, ReactElement, RefObject, useRef, useState} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled, {ThemeProvider} from "styled-components";

import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Musictracker from "./components/Musictracker/Musictracker";
import LastFM_handler from "./assets/LastFM_Handler/LasfFM_handler";
import CustomCursor, {T_OnEnterLeave} from "./components/CustomCursor/CustomCursor";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLES
// Interfaces
interface ITheme {
  background: string;
  blurryBackground: string;
  color: string;
}

export interface IAppContext {
  theme: 'light' | 'dark';
  LastFM_HandlerInstance: LastFM_handler;
  toggleTheme: () => void;
}

// Types
type T_CursorRef = RefObject<{
  onCursorEnter: T_OnEnterLeave,
  onCursorLeave: T_OnEnterLeave,
}>

// Objects
const themeValues = {
  // Values
  blurryBackgroundAlpha: 25,
  blurryBackgroundBlur: '12px',

  headerHeight: '5rem',

  mainPadding: '2rem',

  // Colors
  dark: '#060811',
  light: '#e8e4d9',
}

const blackTheme: ITheme = {
  background: themeValues.dark,
  blurryBackground: `${themeValues.light}${themeValues.blurryBackgroundAlpha}`,
  color: themeValues.light,
}

const whiteTheme: ITheme = {
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

  minHeight: `calc(100svh - ${themeValues.headerHeight} - (${themeValues.mainPadding} * 2))`,
  sidePadding: themeValues.mainPadding,

  // Sizes
  'header-font-size': '2rem',
  'header-height': themeValues.headerHeight,

  mainBorderRadius: '8px',

  boxShadowSize: '.5rem',

  // Colors
  accent: '#1f6feb',
  blueFontColor: '#679fc5',
  linkColor: "#58a6ff",
  gold: '#D0D066',
  goldDimmed: '#D0D06650',

}

const AppDivStyled = styled.div(props => ({
  height: '100svh',

  background: props.theme.background,
  color: props.theme.color,

  padding: `0 ${props.theme.sidePadding}`,
  paddingTop: `calc(${props.theme['header-height']} + ${props.theme.sidePadding})`,

  '*:focus': {
    outline: `2px solid ${props.theme['accent']}`,
  }
}));

export const AppContext: Context<IAppContext> = createContext<IAppContext>({
  theme: 'dark',
  LastFM_HandlerInstance: LastFM_handler.getInstance('Tom_planche')

} as IAppContext);
// END VARIABLES ======================================================================================= END VARIABLES


// COMPONENT ================================================================================================ COMPONENT
/**
 * @type {React.FC}
 * @returns {React.ReactElement}
 * @constructor
 */
const App = (): ReactElement => {
  // State(s)
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

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

  return (
    <BrowserRouter>
      <AppContext.Provider value={{
        theme: theme,
        toggleTheme: toggleTheme,
        LastFM_HandlerInstance: LastFM_handler.getInstance()
      }}>
        <ThemeProvider theme={
          theme === 'dark' ? {...blackTheme, ...commonTheme}  : {...whiteTheme, ...commonTheme}
        }>
          <AppDivStyled>
            <CustomCursor ref={cursorRef} />

            <Header />
            <Routes>
                <Route index element={<Home />} />
                <Route path="/what-i-listen-to" element={
                  <Musictracker />
                } />

                <Route path="*" element={<h1>Route: '{location.pathname}' not found</h1>} />
              </Routes>
          </AppDivStyled>
        </ThemeProvider>
      </AppContext.Provider>
    </BrowserRouter>
  );
}
// END COMPONENT ======================================================================================== END COMPONENT
export default App;


/**
 * End of file App.tsx
 */
