/**
 * @file src/pages/ProjectPageLayout.tsx
 * @description ProjectPageLayout component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import styled from 'styled-components';
import {AppContext} from "../App";
import {CSSProperties, useContext, useRef} from "react";
import MagnetikContainer from "../components/Magnetik/MagnetikContainer";
import MyButton from "../components/MyButton";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
// Style variables
const StyledProjectPageLayout = styled.div`
  min-height: 100vh;
  width: 100vw;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  padding: 2rem;
`;

const StyledTitle = styled.h1`
  font-size: 5rem;
  font-family: "Mondwest", sans-serif;
  justify-self: center;
  
  color: #679fc5;
`;

const StyledBottomLink = styled.div<{$left: boolean}>`
  font-size: 2rem;
  font-family: "Mondwest", sans-serif;
  
  position: absolute;
  
  bottom: 2rem;
  left: ${props => props.$left ? '2rem' : 'auto'};
  right: ${props => props.$left ? 'auto' : '2rem'};
`;

// Type(s)
type T_ProjectPageLayoutProps = {
  title: string;
  children: JSX.Element | JSX.Element[];
  style?: CSSProperties;

  leftTitle?: string;
  leftLink?: string;
  rightTitle?: string;
  rightLink?: string;
}

type T_ProjectPageLayout = (props: T_ProjectPageLayoutProps) => JSX.Element;
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * ProjectPageLayout component
 * @return
 * @constructor
 **/
const ProjectPageLayout: T_ProjectPageLayout = (props) => {
  // Context(s)
  const {
    cursorRef,
    support
  } = useContext(AppContext);

  // State(s)

  // Ref(s)
  const magnetikContainersLeftRef = useRef<HTMLDivElement>(null);
  const magnetikContainersRightRef = useRef<HTMLDivElement>(null);

  // Method(s)

  // Effect(s)

  // Render
  return (
    <StyledProjectPageLayout
      style={props.style}
    >
      <StyledTitle>
        {props.title}
      </StyledTitle>

      {
        props.children
      }

      <StyledBottomLink
        $left={true}
      >
        <MagnetikContainer
          ref={magnetikContainersLeftRef}

          fieldSize={support === "mobile-tablet" ? 1 : 2}

          style={{
            left: 0,
            bottom: 0
          }}

          recentred={{
            verticalUp: true,
            horizontalLeft: true,
          }}
        >
          <MyButton
            href={props.leftLink ?? "https://tomplanche.fr"}
            customCursor={{
              cursorRef: cursorRef,

              onEnterOptions: {
                options: {
                  img: '/imgs/monMii(moustache)Tete.png',
                  backgroundColor: 'transparent',
                  opacity: {current: 1},
                },
                addBaseStyles: true,
              },
              onLeaveOptions: {
                options: {
                  svg: false
                },
                addBaseStyles: true,
              }
            }}
          >
            {props.leftTitle ?? "Back to website"}
          </MyButton>
        </MagnetikContainer>
      </StyledBottomLink>
      <StyledBottomLink
        $left={false}
      >
        <MagnetikContainer
          ref={magnetikContainersRightRef}
          fieldSize={support === "mobile-tablet" ? 1 : 2}
          recentred={{
            verticalUp: true,
            horizontalLeft: false,
          }}
        >
          <MyButton
            href={props.rightLink ?? "https://github.com/TomPlanche/LastFM_handler"}
            linkStyle={false}
            customCursor={{
              cursorRef: cursorRef,

              onEnterOptions: {
                options: {
                  svg: 'https://github.githubassets.com/images/mona-loading-dark.gif',
                  backgroundColor: 'transparent',
                  opacity: {current: 1},
                },
                addBaseStyles: true,
              },
              onLeaveOptions: {
                options: {
                  svg: false
                },
                addBaseStyles: true,
              }
            }}
          >
            {props.rightTitle ?? "GitHub"}
          </MyButton>
        </MagnetikContainer>
      </StyledBottomLink>
    </StyledProjectPageLayout>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default ProjectPageLayout;

/**
 * End of file src/components/src/pages/ProjectPageLayout.tsx
 */
