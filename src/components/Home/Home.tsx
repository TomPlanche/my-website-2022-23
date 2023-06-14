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
import {useContext, useEffect} from "react";
import IsPlayingDisplay from "../IsPlayingDisplay/IsPlayingDisplay";
import {AppContext} from "../../App";
import {Link} from "react-router-dom";
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

  'h1': {
    fontSize: '5rem',
  },

  'h2': {
    fontSize: '3rem',
  },
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
}));

const MyUglyFace = styled.img`
  height: auto;
  width: 60%;
  
  border-radius: 5rem;
`

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
  // const { toggleTheme } = useContext(AppContext);

  // Ref(s)

  // Method(s)

  // Effect(s)
  useEffect(() => {
    // IsPlayingDisplay


    // Loading animation
    const loadingAnimation = gsap.timeline();
  }, []);

  // Render
  return (
    <StyledHome>
      {/*<Menu />*/}
      <IsPlayingDisplay />

      <StyledHomeLanding>
        <StyledHomeHalf
          style={{
            width: '60%',
          }}
        >
          <h1>Tom Planche</h1>
          <h2>Full Stack Developer</h2>

          <Link to={'/what-i-listen-to'}> Test Rediraction </Link>
        </StyledHomeHalf>
        <StyledHomeHalf
          style={{
            width: '40%',
          }}
        >
          <MyUglyFace
            src="/imgs/imageCV.png"
            alt="My ugly face"
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
