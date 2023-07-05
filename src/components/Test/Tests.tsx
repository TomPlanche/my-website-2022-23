/**
 * @file src/components/Test/Tests.tsx
 * @description Tests component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import styled from 'styled-components';

import {
  commonTheme
} from "../../App";

import TechStack, {T_TechStackChild} from "../TechStack/TechStack";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
// Styled components
const StyledTests = styled.div(props => ({
  height: props.theme.firstPageHeight,
  width: '100%',
}));

// Others
const TechStackChildren = [
  {
    title: 'React',
    subtitles: ['Front-end', 'Back-end'],
    description: 'React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.',
    image: '/imgs/react.png',
  } as T_TechStackChild,
  {
    title: 'TypeScript',
    subtitles: ['Front-end', 'Back-end'],
    description: 'TypeScript is an open-source language which builds on JavaScript, one of the world’s most used tools, by adding static type definitions.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1280px-Typescript_logo_2020.svg.png',
  } as T_TechStackChild,
  {
    title: 'Styled Components',
    subtitles: ['Front-end'],
    description: 'Styled Components is a CSS-in-JS library that enables developers to write each component with their own styles.',
    image: 'https://styled-components.com/logo.png',
  } as T_TechStackChild,
];
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * Tests component
 * @return
 * @constructor
 **/
const Tests = () => {
  // State(s)

  // Ref(s)

  // Method(s)

  // Effect(s)

  // Render
  return (
    <StyledTests>
      <TechStack children={TechStackChildren} />
    </StyledTests>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default Tests;

/**
 * End of file src/components/src/components/Test/Tests.tsx
 */
