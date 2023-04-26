/**
 * @file Main component for the application.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {Context, createContext, ReactElement, useState} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled, {ThemeProvider} from "styled-components";

import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLES
interface ITheme {
  background: string;
  blurryBackground: string;
  color: string;
}

const themeValues = {
  // Values
  blurryBackgroundAlpha: 25,
  blurryBackgroundBlur: '12px',

  headerHeight: '5rem',

  // Colors
  black: '#02040a',
  white: '#e8e4d9',
}

const blackTheme: ITheme = {
  background: themeValues.black,
  blurryBackground: `${themeValues.white}${themeValues.blurryBackgroundAlpha}`,
  color: themeValues.white,
}

const whiteTheme: ITheme = {
  background: themeValues.white,
  blurryBackground: `${themeValues.black}${themeValues.blurryBackgroundAlpha}`,
  color: themeValues.black,
}

export const blurryBackground = {
  backdropFilter: `blur(${themeValues.blurryBackgroundBlur})`,
  '-webkit-backdrop-filter': `blur(${themeValues.blurryBackgroundBlur})`,
}

// Dynamic values

export const commonTheme = {
  'header-background': '#22272e',
  'header-height': themeValues.headerHeight,
  'header-font-size': '2rem',

  fontFamilyNeueBit: 'Neue Bit, sans-serif',
  fontFamilyFraktionMono: 'Fraktion Mono, sans-serif',

  'linkColor': "#58a6ff",
  'blueFontColor': '#679fc5',
  // min-height: 100svh - header-height value
  'minHeight': `calc(100svh - ${themeValues.headerHeight})`,

  'sidePadding': '2rem',
}

const AppDivStyled = styled.div(props => ({
  background: props.theme.background,
  color: props.theme.color,
  padding: `0 ${props.theme.sidePadding}`,

  paddingTop: `calc(${props.theme['header-height']} + ${props.theme.sidePadding})`,
}));

export interface IAppContext {
  theme: 'light' | 'dark';
  toggleTheme?: () => void;
}

export const AppContext: Context<IAppContext> = createContext<IAppContext>({
  theme: 'dark',
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
      }}>
        <ThemeProvider theme={
          theme === 'dark' ? {...blackTheme, ...commonTheme}  : {...whiteTheme, ...commonTheme}
        }>
          <AppDivStyled>
            <Header />
            <Routes>
                <Route index element={<Home />} />
                <Route path="/username" element={
                  <h1>Username</h1>
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
