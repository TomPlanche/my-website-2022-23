/**
 * @file src/components/Test/Tests.tsx
 * @description Tests component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {useEffect, useRef, useState} from "react";

import styled from 'styled-components';
import {gsap} from "gsap";

import Header from "../../components/Header/Header";
import TwoOptionsSelector from "../../components/TwoOptionsSelector";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
// Styled components
const StyledTests = styled.div(props => ({
  minHeight: "100vh",
  width: '100vw',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',

  padding: props.theme.sidePadding,
  paddingTop: props.theme.minTopPadding,
}));

const StyledContainer = styled.div<{$isLines: boolean}>`
  height: auto;
  width: 100%;
  
  display: flex;
  flex-direction: ${props => props.$isLines ? 'column' : 'row'};
  align-items: center;
  justify-content: flex-start;
  gap: ${props => props.$isLines ? '.5rem' : '0'};
  padding: ${props => props.$isLines ? '2rem 0' : '0'};
  
  // if the screen is less than 600px wide, the flex-direction is column
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const StyledTechNames = styled.div`
  height: auto;
  width: 40%;  
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  
  padding: 2rem 0;
  
  @media (max-width: 600px) {
    height: 20%;
    width: 100%;
    
    flex-direction: row;
  }
`;

const StyledTechCardContainer = styled.div`
  height: 100%;
  width: 60%;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 600px) {
    height: 80%;
    width: 100%;
  }
`;

const StyledTechCard = styled.div`
  height: 70%;
  width: 45%;
  
  border-radius: 1rem;
  
  border: .5rem solid ${props => props.theme.color};
`;

const StyledTechName = styled.h2<{$selected?: boolean}>(props => ({
  color: props.$selected ? props.theme.color : 'transparent',

  "-webkit-text-stroke-width": props.$selected ? '0px' : '1px',
  "-webkit-text-stroke-color": props.$selected ? 'transparent' : 'white',

  // animations
  transition: 'all .5s ease-in-out',

  fontSize: '4rem',
}));


const StyledLine = styled.div<{$selected?: boolean}>`
  min-height: ${props => props.$selected ? '20rem' : '6rem'};
  width: 100%;
  
  display: flex;
  // flex-direction: ${props => props.$selected ? 'column' : 'row'};;
  // justify-content: ${props => props.$selected ? 'flex-start' : 'space-between'};
  align-items: center;
  
  padding: ${props => props.$selected ? '2rem' : '0 2rem'};
  
  border-radius: 1rem;
  
  font-size: 1.5rem;
  font-family: "Editorial New", sans-serif;
  
  transition: all .5s ease-in-out;
  
`;

// Normal
const optionsArray = [
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M20 4H4C3.44771 4 3 4.44772 3 5V19C3 19.5523 3.44772 20 4 20H20C20.5523 20 21 19.5523 21 19V5C21 4.44771 20.5523 4 20 4ZM4 2C2.34315 2 1 3.34315 1 5V19C1 20.6569 2.34315 22 4 22H20C21.6569 22 23 20.6569 23 19V5C23 3.34315 21.6569 2 20 2H4ZM6 7H8V9H6V7ZM11 7C10.4477 7 10 7.44772 10 8C10 8.55228 10.4477 9 11 9H17C17.5523 9 18 8.55228 18 8C18 7.44772 17.5523 7 17 7H11ZM8 11H6V13H8V11ZM10 12C10 11.4477 10.4477 11 11 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H11C10.4477 13 10 12.5523 10 12ZM8 15H6V17H8V15ZM10 16C10 15.4477 10.4477 15 11 15H17C17.5523 15 18 15.4477 18 16C18 16.5523 17.5523 17 17 17H11C10.4477 17 10 16.5523 10 16Z" fill="currentColor" /></svg>,
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z" fill="currentColor" /><path d="M11 13C11 14.1046 10.1046 15 9 15C7.89543 15 7 14.1046 7 13C7 11.8954 7.89543 11 9 11C10.1046 11 11 11.8954 11 13Z" fill="currentColor" /><path d="M15 15C16.1046 15 17 14.1046 17 13C17 11.8954 16.1046 11 15 11C13.8954 11 13 11.8954 13 13C13 14.1046 13.8954 15 15 15Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M3 4C3 2.34315 4.34315 1 6 1H18C19.6569 1 21 2.34315 21 4V20C21 21.6569 19.6569 23 18 23H6C4.34315 23 3 21.6569 3 20V4ZM6 3H18C18.5523 3 19 3.44772 19 4V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V4C5 3.44772 5.44772 3 6 3Z" fill="currentColor" /></svg>
];

const colors: T_Color[] = [
  {
    color: "rgb(34, 37, 41)",
    backgroundColor: "rgb(103, 145, 165)",
  },
  {
    color: "rgb(34, 37, 41)",
    backgroundColor: "rgb(238, 128, 120)",
  },
  {
    color: "rgb(34, 37, 41)",
    backgroundColor: "rgb(229, 213, 236)",
  },
  {
    color: "rgb(34, 37, 41)",
    backgroundColor: "rgb(247, 214, 135)",
  },
  {
    color: "rgb(34, 37, 41)",
    backgroundColor: "rgb(182, 225, 239)",
  },
  {
    color: "rgb(34, 37, 41)",
    backgroundColor: "#C6AFB1",
  },
  {
    color: "rgb(34, 37, 41)",
    backgroundColor: "#68C3D4",
  },
];

const lineHeightAnimationDuration = .5;
// Type(s)
type T_Color = {
  color: string;
  backgroundColor: string;
}


type T_Technology = {
  name: string;
  bio: string;

  imgs: string[];
}

type T_TechStackProps = {
  technologies: T_Technology[];
  isLines?: boolean;
}

type T_TechStack = (props: T_TechStackProps) => JSX.Element;

export type T_Options = typeof optionsArray[number];

// Others
const technologies: T_Technology[] = [
  {
    name: "React",
    bio: "I learned and used React for this website. " +
      "I used it with TypeScript and styled-components.",

    imgs: []
  },

  {
    name: "TypeScript",
    bio: "I learned and used TypeScript for this website.",

    imgs: []
  },

  {
    name: "Python",
    bio: "I learned and used since 2017. Web scraping, data analysis, I love this language.",

    imgs: []
  },

  {
    name: "PHP",
    bio: "I learned PHP at school and mastered it during my internship at the end of my second year of BUT.",

    imgs: []
  },

  {
    "name": "DBs",
    "bio": "I learned and used MySQL, MongoDB, PostgreSQL and SQLite.",

    imgs: []
  },

  {
    name: "Others",
    bio: "I also learned and used other languages and frameworks, such as Java, C, C++, Angular, Symphony " +
      ", Laravel and more.",

    imgs: []
  }
];
// END VARIABLES =======================================================================================  END VARIABLES

// COMPONENENTS  ==========================================================================================   COMPONENT
const TechStack: T_TechStack = (props) => {
  // State(s)
  const [selectedTech, setSelectedTech] = useState<number>(0);
  const [cardTilt, setCardTilt] = useState<number>(Math.random() * 20 - 10);

  // Ref(s)
  const techNamesRefArray = useRef<HTMLHeadingElement[]>([]);

  // Grid case
  const techNamesContainerRef = useRef<HTMLDivElement>(null);
  const techCardContainerRef = useRef<HTMLDivElement>(null);
  const techCardRef = useRef<HTMLDivElement>(null);

  // Lines case
  const linesRefArray = useRef<HTMLDivElement[]>([]);
  const previousSelectedTech = useRef<number>(0);

  // Variable(s)
  const colorOffset = Math.floor(Math.random() * colors.length);

  // Method(s)
  const handleTechNameClick = (index: number) => {
    previousSelectedTech.current = selectedTech;

    index === selectedTech ? setSelectedTech(-1) : setSelectedTech(index);

    if (!props.isLines) {
      setCardTilt(Math.random() * 20 - 10);
    }
  };

  // Effect(s)
  useEffect(() => {
    if (!props.isLines) {
      gsap.set(techCardContainerRef.current, {
        height: techNamesContainerRef.current?.getBoundingClientRect().height,
      });

      gsap.set(techCardRef.current, {
        rotate: cardTilt,
      });
    }
  }, [props.isLines, cardTilt]);

  useEffect(() => {
    if (props.isLines) {
      gsap.fromTo(techNamesRefArray.current[selectedTech], {
        opacity: 0,
        duration: lineHeightAnimationDuration,

        y: '-100%',

        onComplete: () => {
          gsap.to(linesRefArray.current[selectedTech], {
            flexDirection: 'column',
            justifyContent: 'flex-start',
          });

          gsap.to(linesRefArray.current[previousSelectedTech.current], {
            flexDirection: 'row',
            justifyContent: 'space-between',
          });
        }
      }, {
        opacity: 1,
        y: '0%',

        duration: lineHeightAnimationDuration,
        delay: lineHeightAnimationDuration,
        ease: 'power2.out',
      });
    }
  }, [selectedTech]);

  // Render
  return (
    <StyledContainer
      $isLines={props.isLines ?? false}
    >
      {
        !props.isLines && (
          <>
            <StyledTechNames
              ref={techNamesContainerRef}
            >
              {
                technologies.map((technology, index) => {
                  const textColor = colors[(colorOffset + index) % colors.length].backgroundColor;

                  return (
                    <div key={index}>
                      <StyledTechName
                        ref={ref => techNamesRefArray.current[index] = ref as HTMLHeadingElement}
                        onClick={() => handleTechNameClick(index)}
                        $selected={index === selectedTech}

                        style={
                          props.isLines ? {
                            color: textColor,
                          } : {
                            WebkitTextStrokeColor: textColor,
                          }
                        }
                      >
                        {technology.name}
                      </StyledTechName>
                    </div>
                  )
                })



              }
            </StyledTechNames>
            <StyledTechCardContainer
              ref={techCardContainerRef}
            >
              <StyledTechCard
                ref={techCardRef}
              >
                <h2>{technologies[selectedTech].name}</h2>
              </StyledTechCard>
            </StyledTechCardContainer>
          </>
        )
      }
      {
        props.isLines && (
          <>
            {
              technologies.map((technology, index) => {
                const lineColor: T_Color = colors[(colorOffset + index) % colors.length];

                return (
                  <StyledLine
                    key={index}
                    style={{
                      backgroundColor: lineColor.backgroundColor,
                      color: lineColor.color,
                    }}
                    $selected={index === selectedTech}

                    ref={ref => linesRefArray.current[index] = ref as HTMLDivElement}
                    onClick={() => handleTechNameClick(index)}
                  >
                    <h2
                      ref={ref => techNamesRefArray.current[index] = ref as HTMLHeadingElement}
                    >{technology.name}</h2>
                  </StyledLine>
                )
              })

            }
          </>
        )
      }
    </StyledContainer>
  )
}

/**
 * Tests component
 * @return
 * @constructor
 **/
const Tests = () => {
  // State(s)
  const [options, setOptions] = useState<number>(0);

  // Ref(s)

  // Method(s)

  // Effect(s)

  // Render
  return (
    <StyledTests>
      <Header />

      <TwoOptionsSelector
        options={optionsArray}
        stateAndSetter={[options, setOptions]} />

      <TechStack
        technologies={technologies}
        isLines={options === 1}
      />
    </StyledTests>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default Tests;

/**
 * End of file src/components/src/components/Test/Tests.tsx
 */
