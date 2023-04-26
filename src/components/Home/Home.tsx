/**
 * @file src/components/Home/Home.tsx
 * @description Home component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {
  useContext,
} from "react";

import styled from 'styled-components'

import {
  AppContext,
} from '../../App';

import MyButton from "../MyButton";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLES
const StyledHome = styled.div(props => ({
  'background': props.theme.background,

  'color': props.theme.color,

  'minHeight': props.theme.minHeight,

  'padding': props.theme.sidePadding,

}));
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * Home component
 * @return {JSX.Element}
 * @constructor
 **/
const Home = () => {
  // Context
  const { toggleTheme } = useContext(AppContext);

  // Render
  return (
    <StyledHome>
      <h1>Home</h1>

    </StyledHome>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default Home;

/**
 * End of file src/components/Home/Home.tsx
 */
