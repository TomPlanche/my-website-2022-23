/**
 * @file src/components/TwoOptionsSelector/TwoOptionsSelector.tsx
 * @description TwoOptionsSelector component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";

import styled, {useTheme} from 'styled-components';
import {gsap} from "gsap";

import {AppContext, I_Theme, noUserSelection} from "../App";
import {stripCssVar} from "../assets/utils";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
// Styled Components
const StyledTwoOptionsSelector = styled.div(props => (({
  padding: ".25rem",

  position: "relative",
  isolation: "isolate",

  borderRadius: "2rem",
  border: `2px solid ${props.theme.color}`,

  overflow: 'hidden',

  ...noUserSelection
})));


const StyledOptionChild = styled.div(props => (({
  height: "100%",
  width: "100%",

  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",

  borderRadius: "2rem",

  color: props.theme.color,
  whiteSpace: "nowrap",
})));

const StyledRelativeContainer = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;

  position: relative;

  padding: .5rem .75rem;
`;

const StyledBackground = styled.div(props => (({
  height: "100%",
  width: "55%",

  position: "absolute",
  top: "0",
  left: "0",

  borderRadius: "2rem",
  backgroundColor: props.theme.color,

  transformOrigin: 'left',

  zIndex: -1,
})));

// Types
type T_TwoOptionsSelectorProps = {
  options: string[] | ReactNode[],

  style?: CSSProperties,
  choice?: number,
  stateAndSetter?: [number, (choice: number) => void],
  theme?: I_Theme,
} & HTMLAttributes<HTMLDivElement>

type T_TwoOptionsSelector = (props: T_TwoOptionsSelectorProps) => JSX.Element;
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * TwoOptionsSelector component
 * @return
 * @constructor
 **/
const TwoOptionsSelector: T_TwoOptionsSelector = (props) => {
  // Context
  const {cursorRef} = useContext(AppContext);

  // State(s)
  const [choice, setChoice] = useState<number>(props.choice ?? 0);
  const [firstRender, setFirstRender] = useState<boolean>(true);

  // Ref(s)
  const selectorRef = useRef<HTMLDivElement>(null);
  const optionsArrayRef = useRef<HTMLDivElement[]>([]);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const relativeContainerRef = useRef<HTMLDivElement>(null);

  const optionsWidthsRef = useRef<number[]>([]);

  // Variable(s)
  const theme = useTheme() as I_Theme;

  // Method(s)
  const handleClick = (choice: number) => {
    setChoice(choice);

    if (props.stateAndSetter) {
      props.stateAndSetter[1](choice);
    }
  }

  const handleMouseEnter = () => {
    cursorRef.current?.onCursorEnter(null, true);
  }

  const handleMouseLeave = () => {
    cursorRef.current?.onCursorLeave(null, true);
  }

  // Effect(s)
  useLayoutEffect(() => {
    if (
      !selectorRef.current
      || !relativeContainerRef.current
    ) return;

    // @ts-ignore
    gsap.set(optionsArrayRef.current[choice], {
      color: theme.background,
    })

    // Gap between each option
    const gap = stripCssVar(window.getComputedStyle(relativeContainerRef.current).gap);
    // Padding of the selector
    const sidePadding = stripCssVar(window.getComputedStyle(selectorRef.current).paddingLeft) * 2;

    const selectorRefWidth = selectorRef.current.getBoundingClientRect().width;

    // Find the percentage of the width of each option
    optionsWidthsRef.current = optionsArrayRef.current.map((option) => {
      if (!selectorRef.current) return 50;

      return (option.getBoundingClientRect().width + gap + sidePadding) / selectorRefWidth;
    });


    gsap.set(backgroundRef.current, {
      // @ts-ignore
      width: `${optionsWidthsRef.current[choice] * 100}%`,
    });

  });

  useEffect(() => {
    if (
      choice < 0
      || choice >= 3
    ) {
      console.error(`ERROR in 'choice' state.`);
      return;
    }

    if (firstRender) {
      setFirstRender(false);
      return;
    }

    const animTl = gsap.timeline({
      defaults: {
        duration: 0.3,
        ease: "power2.inOut"
      }
    })

    animTl
      .to(backgroundRef.current, {
        width: '100%',
        onComplete: () => {
          gsap.set(backgroundRef.current,
            choice === 0 ? {
              left: '0',
              right: 'unset'
            } : {
              right: '0',
              left: 'unset'
            }
          )
        }
      })
      // @ts-ignore
      .to(optionsArrayRef.current[choice], {
        color: theme.background,
      }, '<')
      .to(backgroundRef.current, {
        // @ts-ignore
        width: optionsWidthsRef.current[choice] * 100 + '%',
      })
      // @ts-ignore
      .to(optionsArrayRef.current[choice === 0 ? 1 : 0], {
        color: theme.color,
      }, '<');

  }, [choice]);

  useEffect(() => {
    if (firstRender) return;

    const animTl = gsap.timeline({
      defaults: {
        duration: 0.3,
        ease: "power2.inOut"
      }
    });

    animTl
      .to(backgroundRef.current, {
        backgroundColor: theme.color,
      })
      // @ts-ignore
      .to(optionsArrayRef.current[choice], {
        color: theme.background,
      }, '<')
      // @ts-ignore
      .to(optionsArrayRef.current[choice === 0 ? 1 : 0], {
        color: theme.color,
      }, '<')
  }, [theme]);

  // Render
  return (
    <StyledTwoOptionsSelector
      ref={selectorRef}

      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <StyledRelativeContainer
        ref={relativeContainerRef}
      >
        {
          Array.from(props.options).map((option, index) => {
            return (
              <StyledOptionChild
                key={index}
                ref={(ref) => optionsArrayRef.current[index] = ref as HTMLDivElement}

                onClick={() => handleClick(index)}
              >
                {option}
              </StyledOptionChild>
            )
          })
        }
        <StyledBackground ref={backgroundRef}/>
      </StyledRelativeContainer>
    </StyledTwoOptionsSelector>
  )
};
// END COMPONENT =======================================================================================  END COMPONENT


export default TwoOptionsSelector;

/**
 * End of file src/components/src/components/TwoOptionsSelector/TwoOptionsSelector.tsx
 */
