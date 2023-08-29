/**
 * @file src/components/TechStack/TechStack.tsx
 * @description TechStack component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {ReactElement, useEffect, useLayoutEffect, useRef, useState} from "react";

import styled from 'styled-components';
import {gsap} from "gsap";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
// Styled components
const StyledTechContainer = styled.div<{$isLines: boolean}>`
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
    overflow-x: scroll;
    
    // Scrollbar invisible
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const StyledTechCardContainer = styled.div`
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

const StyledTechName = styled.h2(props => ({
  color: props.theme.color,

  WebkitTextStrokeWidth: '.1rem',

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
  theme?: string;
}

type T_TechStack = (props: T_TechStackProps) => ReactElement;

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
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * TechStack component
 * @return
 * @constructor
 **/
const TechStack: T_TechStack = (props) => {
  // State(s)
  const [selectedTech, setSelectedTech] = useState<number>(0);
  const [cardTilt, setCardTilt] = useState<number>(Math.random() * 20 - 10);

  // Ref(s)
  const techNamesRefArray = useRef<HTMLHeadingElement[]>([]);
  const lastSelectedTechRef = useRef<number>(-1);

  // Grid case
  const techNamesContainerRef = useRef<HTMLDivElement>(null);
  const techCardContainerRef = useRef<HTMLDivElement>(null);
  const techCardRef = useRef<HTMLDivElement>(null);

  // Lines case
  const linesRefArray = useRef<HTMLDivElement[]>([]);


  const colorOffsetRef = useRef<number>(Math.floor(Math.random() * colors.length));

  // Method(s)
  const handleTechNameClick = (index: number) => {
    if (index === selectedTech && props.isLines) return;

    lastSelectedTechRef.current = selectedTech;
    setSelectedTech(index);

    if (!props.isLines) {
      setCardTilt(Math.random() * 20 - 10);
    }
  };

  const handleMouseEnter = () => {

  }

  // Effect(s)
  useLayoutEffect(() => {
    if (!props.isLines) {
      techNamesRefArray.current.forEach((techName, index) => {
        const colorIndex = (index + colorOffsetRef.current) % colors.length;

        gsap.set(techName, {
          // @ts-ignore
          color: index === selectedTech ? colors[colorIndex].backgroundColor : 'transparent',
          // @ts-ignore
          WebkitTextStrokeColor: index === selectedTech ? 'transparent' : colors[colorIndex].backgroundColor,
        });
      });
    } else {
      linesRefArray.current.forEach((line, index) => {
        const colorIndex = (index + colorOffsetRef.current) % colors.length;

        gsap.set(line, {
          // @ts-ignore
          backgroundColor: colors[colorIndex].backgroundColor,
          // @ts-ignore
          color: colors[colorIndex].color,
        });
      });
    }
  }, [props.isLines]);

  useEffect(() => {
    if (!props.isLines) {
      gsap.set(techCardRef.current, {
        rotate: cardTilt,
      });
    }
  }, [cardTilt]);

  useEffect(() => {
    setSelectedTech(0);

    if (!props.isLines) {
      gsap.set(techCardContainerRef.current, {
        height: techNamesContainerRef.current?.getBoundingClientRect().height,
      });
    }
  }, [props.isLines]);

  useEffect(() => {
    if (!props.isLines) {
      const colorIndex = (selectedTech + colorOffsetRef.current) % colors.length;

      // @ts-ignore
      gsap.to(techNamesRefArray.current[selectedTech], {
        // @ts-ignore
        color: colors[colorIndex].backgroundColor,
        WebkitTextStrokeColor: 'transparent',

        // If the screen is less than 600px wide, the x is 0, y is 2rem
        x: window.innerWidth < 600 ? '0' : '2rem',
        y: window.innerWidth < 600 ? '-2rem' : '0',

        duration: lineHeightAnimationDuration,
      });

      gsap.to(techCardRef.current, {
        // @ts-ignore
        border: `.5rem solid ${colors[colorIndex].backgroundColor}`,
      });

      techNamesRefArray.current.forEach((techName, index) => {
        if (index !== selectedTech) {
          gsap.to(techName, {
            color: 'transparent',
            // @ts-ignore
            WebkitTextStrokeColor: colors[(index + colorOffsetRef.current) % colors.length].backgroundColor,

            x: '0',
            y: '0',

            duration: lineHeightAnimationDuration,
          });
        }
      });
    } else {
      const animTl = gsap.timeline({
        defaults: {
          duration: lineHeightAnimationDuration,
          ease: "power2.inOut"
        }
      });

      animTl
        // @ts-ignore
        .to(techNamesRefArray.current[selectedTech], {
          opacity: 0,

          onStart: () => {
            if (lastSelectedTechRef.current !== -1) {
              gsap
                // @ts-ignore
                .to(techNamesRefArray.current[lastSelectedTechRef.current], {
                  opacity: 0,

                  onComplete: () => {

                    // @ts-ignore
                    gsap.set(linesRefArray.current[lastSelectedTechRef.current], {
                      flexDirection: 'row',
                      justifyContent: 'space-between',

                      onComplete: () => {
                        gsap
                          // @ts-ignore
                          .fromTo(techNamesRefArray.current[lastSelectedTechRef.current], {
                            x: '100%',
                            opacity: 0,
                            delay: lineHeightAnimationDuration,
                          }, {
                            x: '0',
                            opacity: 1,
                          })
                      }
                    })
                  }
                });


            }
          }
        })
        // @ts-ignore
        .to(linesRefArray.current[selectedTech], {
          flexDirection: 'column',
          justifyContent: 'flex-start',
          duration: 0,
        })
        // @ts-ignore
        .fromTo(techNamesRefArray.current[selectedTech], {
          y: '-100%',
        }, {
          y: '0',
          opacity: 1,
        }, '<')



    }
  }, [selectedTech]);

  useEffect(() => {
    if (
      !props.isLines
      && props.theme
      && props.theme === 'light'
    ) {
      techNamesRefArray.current.forEach((techName, index) => {
        gsap.set(techName, {
          // @ts-ignore
          color: colors[(index + colorOffsetRef.current) % colors.length].backgroundColor,
          WebkitTextStrokeColor: 'transparent',
        })
      });
    }

    if (
      props.isLines
      && props.theme
    ) {
      const outline = props.theme === 'light'
        // @ts-ignore
        ? `.1rem solid ${colors[(selectedTech + colorOffsetRef.current) % colors.length].color}`
        : '0';

      linesRefArray.current.forEach((line, index) => {
        gsap.to(line, {
          outline: outline,

          duration: lineHeightAnimationDuration,
          ease: "power2.inOut"
        })
      });
    }
  }, [props.theme, props.isLines]);

  // Render
  return (
    <StyledTechContainer
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
                  return (
                    <div key={index}>
                      <StyledTechName
                        ref={ref => techNamesRefArray.current[index] = ref as HTMLHeadingElement}
                        onClick={() => handleTechNameClick(index)}
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
                <h2>
                  {
                    // @ts-ignore
                    technologies[selectedTech].name
                  }
                </h2>
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
                return (
                  <StyledLine
                    key={index}
                    $selected={index === selectedTech}

                    ref={ref => linesRefArray.current[index] = ref as HTMLDivElement}
                    onClick={() => handleTechNameClick(index)}
                  >
                    <h2
                      ref={ref => techNamesRefArray.current[index] = ref as HTMLHeadingElement}
                    >
                      {technology.name}
                    </h2>
                  </StyledLine>
                )
              })

            }
          </>
        )
      }
    </StyledTechContainer>
  )
}

// END COMPONENT =======================================================================================  END COMPONENT

export default TechStack;

/**
 * End of file src/components/src/components/TechStack/TechStack.tsx
 */
