/**
 * @file src/components/ArrowLink.tsx
 * @description ArrowLink component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {CSSProperties, useLayoutEffect, useRef, useState} from "react";

import {gsap} from "gsap";
import styled from 'styled-components';
import {capitalize} from "../assets/utils";

// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
const StyledArrowLink = styled.a(props => ({
  height: "3rem",
  width: "auto",

  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "1.5rem",

  padding: "0 1.5rem",

  borderRadius: "3rem",

  color: props.theme.background,
  backgroundColor: props.theme.color,

  fontSize: "1.5rem",

  overflow: "hidden",
}));

const StyledArrowContainer = styled.div`
  height: 1.5rem;
  width: 1.5rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  position: relative;
`;

// Types
type T_ArrowLinkProps = {
  title: string;
  href: string;

  capitalize?: boolean;
  onHoverScale?: number;

  style?: CSSProperties;
}

type T_ArrowLink = (props: T_ArrowLinkProps) => JSX.Element;

// Normal
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * ArrowLink component
 * @return
 * @constructor
 **/
const ArrowLink: T_ArrowLink = (props) => {
  // State(s)
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Ref(s)
  const spanRef = useRef<HTMLSpanElement>(null);
  const arrow1Ref = useRef<SVGSVGElement>(null);
  const arrow2Ref = useRef<SVGSVGElement>(null);
  const animRef = useRef<GSAPTimeline>(
    gsap.timeline({
      defaults: {
        duration: .5,
        ease: "power2.inOut",
      },
      onStart: () => {
        setIsAnimating(true);
      },
      onComplete: () => {
        setIsAnimating(false);
      }
    })
  );

  // Variable(s)
  const stylingVariables = {
    fontSize: props.style?.fontSize || "1.5rem",
    gap: props.style?.gap || "1.5rem",
    padding: props.style?.padding || "0 1.5rem",

    height: props.style?.height || "3rem",

    onHoverScale: props.onHoverScale ?? 1.125,
  }

  const finalStyle: CSSProperties = {
    fontSize: stylingVariables.fontSize,
    gap: stylingVariables.gap ?? stylingVariables.fontSize,
    padding: stylingVariables.padding ?? stylingVariables.fontSize,

    height: stylingVariables.height ?? stylingVariables.fontSize,
  }

  // Method(s)
  const handleMouseEnter = () => {
    if (isAnimating) return;

    animRef.current
      .fromTo(arrow1Ref.current, {
        x: "0",
        y: "0",
        opacity: 1,
      }, {
        x: finalStyle.fontSize,
        y: `-${finalStyle.fontSize}`,
        opacity: 0,
      })
      .fromTo(arrow2Ref.current, {
        x: `-${finalStyle.fontSize}`,
        y: `${finalStyle.fontSize}`,
        opacity: 0,
      }, {
        x: "0",
        y: "0",
        opacity: 1,
      }, "<")
      .fromTo(spanRef.current, {
        scale: 1,
      }, {
        scale: stylingVariables.onHoverScale,
      }, '<')

  }

  const handleMouseLeave = () => {
    if (isAnimating) return;

    animRef.current
      .fromTo(arrow1Ref.current, {
        x: finalStyle.fontSize,
        y: `-${finalStyle.fontSize}`,
        opacity: 0,
      }, {
        x: "0",
        y: "0",
        opacity: 1,
      })
      .fromTo(arrow2Ref.current, {
        x: "0",
        y: "0",
        opacity: 1,
      }, {
        x: `-${finalStyle.fontSize}`,
        y: `${finalStyle.fontSize}`,
        opacity: 0,
      }, "<")
      .fromTo(spanRef.current, {
        scale: stylingVariables.onHoverScale,
      }, {
        scale: 1,
      }, '<')
  }

  // Effect(s)
  useLayoutEffect(() => {
    gsap.set(arrow1Ref.current, {
      height: finalStyle.fontSize,
      width: finalStyle.fontSize,

      position: "absolute",
    });

    gsap.set(arrow2Ref.current, {
      height: finalStyle.fontSize,
      width: finalStyle.fontSize,

      position: "absolute",
    });


  }, []);

  // Render
  return (
    <StyledArrowLink
      href={props.href}
      // link open in new tab with no referrer
      target="_blank"
      rel="noreferrer noopener"

      style={props.style}

      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        ref={spanRef}
      >
        {
          props.capitalize === undefined || props.capitalize
            ? capitalize(props.title)
            : props.title
        }
      </span>

      <StyledArrowContainer style={{
        height: finalStyle.height,
      }}>
        <svg ref={arrow1Ref} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.5253 5.49475L10.5206 7.49475L15.0782 7.50541L5.47473 17.0896L6.88752 18.5052L16.5173 8.89479L16.5065 13.5088L18.5065 13.5134L18.5253 5.51345L10.5253 5.49475Z"
            fill="currentColor"/>
        </svg>
        <svg ref={arrow2Ref} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.5253 5.49475L10.5206 7.49475L15.0782 7.50541L5.47473 17.0896L6.88752 18.5052L16.5173 8.89479L16.5065 13.5088L18.5065 13.5134L18.5253 5.51345L10.5253 5.49475Z"
            fill="currentColor"/>
        </svg>

      </StyledArrowContainer>
    </StyledArrowLink>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default ArrowLink;

/**
 * End of file src/components/src/components/ArrowLink.tsx
 */
