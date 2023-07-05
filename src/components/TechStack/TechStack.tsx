/**
 * @file src/components/TechStack/TechStack.tsx
 * @description TechStack component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {ReactElement, useEffect, useRef, useState} from "react";

import styled from 'styled-components';
import {gsap} from "gsap";
import {E_Subtitles} from "../Home/Home";
import {blurryBackground} from "../../App";
import useDebounce from "../../hooks/use-debounce";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
// Styled components
const StyledTechStack = styled.div`
  height: auto;
  width: 100%;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  position: relative;
`;

const StyledTechStackLine = styled.div`
  height: 10vmin;
  width: 100%;
  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  
  padding: 2rem;
  
  border: 1px solid ${props => props.theme.color};
  
  font-size: 2rem;
  
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.color};
    color: ${props => props.theme.background};
  }
`;

const StyledTechName = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const StyledSpanChip = styled.span<{
  backgroundColor?: string,
  color?: string,
}>`
  font-size: 1rem;
  
  padding: .5rem .75rem .25rem .75rem; 
  margin-left: 1rem;
  
  border-radius: 99px;
  background-color: ${(props) => props.backgroundColor};
  color: ${props => props.color};
  
  font-family: "Radikal", sans-serif;
`;

const StyledImagesContainer = styled.div((props) => ({
  height: "100%",
  width: "auto",

  position: "absolute",
  top: "50%",
  right: "0",
  transform: "translateY(-50%)",

  aspectRatio: "1/1",
  overflow: "hidden",

  pointerEvents: "none",

  borderRadius: "3rem",

  ...blurryBackground,
}));

const StyledImage = styled.img`
  height: 100%;
  width: 100%;
  
  position: absolute;
  top: 0;
  left: 0;
  
  object-fit: fill;
  
  pointer-events: none;
`;

// Types
export type T_TechStackChild = {
  title: string,
  subtitles?: string[],
  description: string,
  image: string,
}

type T_TechStackProps = {
  children: T_TechStackChild[],
}

type T_getSubtitleInfo = (subtitle: string) => string;

type T_TechStack = (props: T_TechStackProps) => ReactElement;
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * TechStack component
 * @return
 * @constructor
 **/
const TechStack: T_TechStack = (props) => {
  // State(s)
  const [currentTech, setCurrentTech] = useDebounce(-1, 250);
  const [isHovered, setIsHovered] = useState<boolean>(false)

  // Ref(s)
  // HTML
  const containersRef = useRef<HTMLDivElement[]>([])
  const imagesContainerRef = useRef<HTMLDivElement>(null)
  const currentImageRef = useRef<HTMLImageElement>(null)
  const lastImageRef = useRef<HTMLImageElement>(null)

  // Other
  const lastTechRef = useRef<number>(-1)

  // Method(s)
  const handleContainerMouseEnter = () => {
    setIsHovered(true)
  }

  const handleContainerMouseLeave = () => {
    setIsHovered(false)

    lastTechRef.current = -1;
  }

  const handleLineMouseEnter = (index: number) => {
    console.log(`[TechStack] handleLineMouseEnter(${index})`);
    setCurrentTech(index)
  }

  const getSubtitleBackgroundColor: T_getSubtitleInfo = (subtitle) => {
    switch (subtitle) {
      case E_Subtitles.FrontEnd:
        return E_Subtitles.FrontEndBackground
      case E_Subtitles.BackEnd:
        return E_Subtitles.BackEndBackground
      case E_Subtitles.GeneralCoding:
        return E_Subtitles.GeneralCodingBackground
      case E_Subtitles.DataAnalysis:
        return E_Subtitles.DataAnalysisBackground

      default:
        return E_Subtitles.FrontEndBackground
    }
  }

  const getSubtitleColor: T_getSubtitleInfo = (subtitle) => {
    switch (subtitle) {
      case E_Subtitles.FrontEnd:
        return E_Subtitles.FrontEndColor
      case E_Subtitles.BackEnd:
        return E_Subtitles.BackEndColor
      case E_Subtitles.GeneralCoding:
        return E_Subtitles.GeneralCodingColor
      case E_Subtitles.DataAnalysis:
        return E_Subtitles.DataAnalysisColor

      default:
        return E_Subtitles.FrontEndColor
    }
  }
  // Effect(s)
  useEffect(() => {
    if (!imagesContainerRef.current) return;

    if (isHovered) {
      gsap
        .fromTo(imagesContainerRef.current, {
          opacity: 0,
        }, {
          opacity: 1,
          duration: 0.3,
        })
    } else {
      gsap
        .fromTo(imagesContainerRef.current, {
          opacity: 1,
        }, {
          opacity: 0,
          duration: 0.3,
        })

      lastTechRef.current = -1;
    }
  }, [isHovered])

  useEffect(() => {
    if (currentTech < 0) {
      lastTechRef.current = -1;
      return;
    }

    if (lastTechRef.current < 0 && currentTech > 0) {
      lastTechRef.current = currentTech;
      return;
    }


    if (isHovered) {
      const techTimeline = gsap.timeline({
        defaults: {
          duration: 0.3,
          ease: 'power2.inOut',
        },
        onComplete: () => {
          lastTechRef.current = currentTech;
        }
      })

      if (lastTechRef.current < currentTech) {
        // Going down
        techTimeline
          .fromTo(currentImageRef.current, {
            y: '100%',
          }, {
            y: '0%',
          })
          .fromTo(lastImageRef.current, {
            y: '0%',
          }, {
            y: '-100%',
          }, '<')
      } else {
        // Going up
        techTimeline
          .fromTo(currentImageRef.current, {
            y: '-100%',
          }, {
            y: '0%',
          })
          .fromTo(lastImageRef.current, {
            y: '0%',
          }, {
            y: '100%',
          }, '<')
      }
    }
  }, [currentTech])

  // Render
  return (
    <StyledTechStack
      onMouseEnter={handleContainerMouseEnter}
      onMouseLeave={handleContainerMouseLeave}
    >
      {
        props.children.map((child, index) => (

          <StyledTechStackLine
            key={index}
            ref={el => containersRef.current[index] = el as HTMLDivElement}
            style={{
              borderBottom: index !== props.children.length - 1 ? 'none' : '1px solid white',
            }}
            onMouseEnter={() => handleLineMouseEnter(index)}
          >
            <StyledTechName>
              {child.title}
              {
                child.subtitles && child.subtitles.map((subtitle, index) => (
                  <StyledSpanChip
                    key={index}
                    backgroundColor={getSubtitleBackgroundColor(subtitle)}
                    color={getSubtitleColor(subtitle)}
                  >
                    {subtitle}
                  </StyledSpanChip>
                ))
              }
            </StyledTechName>
          </StyledTechStackLine>
        ))
      }
      {
        isHovered && (
          <StyledImagesContainer
            ref={imagesContainerRef}
          >
            <StyledImage
              src={props.children[currentTech].image}
              alt={props.children[currentTech].title}

              ref={currentImageRef}
            />

            {
              lastTechRef.current >= 0 && (
                <StyledImage
                  src={props.children[lastTechRef.current].image}
                  alt={props.children[lastTechRef.current].title}
                  ref={lastImageRef}
                />
              )
            }
          </StyledImagesContainer>
        )
      }
    </StyledTechStack>
  )
}

// END COMPONENT =======================================================================================  END COMPONENT

export default TechStack;

/**
 * End of file src/components/src/components/TechStack/TechStack.tsx
 */
