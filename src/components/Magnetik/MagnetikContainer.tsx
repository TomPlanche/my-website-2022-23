/**
 * @file src/components/Magnetik/Magnetik.tsx
 * @description Magnetik component. Magnetik is a component that allows you to create a magnetic field around a
 * component. When the mouse is over the component, it is attracted to the mouse cursor.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {CSSProperties, ForwardedRef, forwardRef, HTMLAttributes, ReactElement, useLayoutEffect, useRef} from "react";

import styled from 'styled-components';
import {gsap} from "gsap";
import {limitNumberInBounds} from "../../assets/utils";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
// Styled components
const StyledMagnetikContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledChildContainer = styled.div`
  //pointer-events: none;
`;

// Types
type T_MagnetikContainerProps = {
  children?: ReactElement,
  style?: CSSProperties,

  fieldSize?: number,
  fieldForce?: number,
  centered?: boolean,
  recentred?: boolean,


  block?: boolean,

  debug?: boolean
} & HTMLAttributes<HTMLDivElement>;

type DOMRefs = HTMLElement | SVGSVGElement;
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * Magnetik component
 * @return
 * @constructor
 **/
const MagnetikContainer = forwardRef(function MagnetikContainer(
  props: T_MagnetikContainerProps,
  passedRef: ForwardedRef<DOMRefs>
): ReactElement {
  // State(s)

  // Ref(s)
  // DOM ref(s)
  const mainContainerRef = useRef<HTMLElement>(null);
  // Other ref(s)

  // Variable(s)
  const fieldSize = props.fieldSize ?? 2;
  const fieldForce = limitNumberInBounds(props.fieldForce ?? .5);

  // Method(s)
  const handleMagnetikContainerMouseMove = (e: MouseEvent) => {
    if (
      !mainContainerRef.current
      || props.block
    ) return;


    const {clientX, clientY} = e;
    const mainContainerRect = mainContainerRef.current.getBoundingClientRect();
    // @ts-ignore
    // (TS2339: Property 'current' does not exist on type '((instance: HTMLElement | null) => void) | MutableRefObject<HTMLElement | null>'.
    const passedRect = passedRef.current.getBoundingClientRect();

    const mainContainerInfos = {
      top: mainContainerRect.top,
      left: mainContainerRect.left,
      width: mainContainerRect.width,
      height: mainContainerRect.height,
    }

    const passedInfos = {
      top: passedRect.top,
      left: passedRect.left,
      width: passedRect.width,
      height: passedRect.height,
    }

    const centerX = mainContainerInfos.left + mainContainerInfos.width / 2;
    const centerY = mainContainerInfos.top + mainContainerInfos.height / 2;

    const sideRatioX = Math.floor((clientX - centerX) / (mainContainerInfos.width / 2) * 100) / 100;
    const sideRatioY = Math.floor((clientY - centerY) / (mainContainerInfos.height / 2) * 100) / 100;

    const translateX = props.centered ?
      mainContainerInfos.width / 2 * sideRatioX * fieldForce :
      (passedInfos.width - mainContainerInfos.width) / -2 * sideRatioX * fieldForce;

    const translateY = props.centered ?
      mainContainerInfos.height / 2 * sideRatioY * fieldForce :
      (passedInfos.height - mainContainerInfos.height) / -2 * sideRatioY * fieldForce;

    // @ts-ignore
    // (TS2339: Property 'current' does not exist on type '((instance: HTMLElement | null) => void) | MutableRefObject<HTMLElement | null>'.
    gsap.to(passedRef.current, {
      duration: 0.3,
      x: translateX,
      y: translateY,
      ease: 'power2.out',
    });
  }

  const handleMagnetikContainerMouseLeave = () => {
    if (
      !mainContainerRef.current
      || props.block
    ) return;

    // @ts-ignore
    // (TS2339: Property 'current' does not exist on type '((instance: HTMLElement | null) => void) | MutableRefObject<HTMLElement | null>'.
    gsap.to(passedRef.current, {
      duration: 0.3,
      x: 0,
      y: 0,
      ease: 'power2.out',
    });
  }
  // Effect(s)
  useLayoutEffect(() => {
    if (!mainContainerRef.current) return;

    // Get the child container size
    // @ts-ignore
    // (TS2339: Property 'current' does not exist on type '((instance: HTMLElement | null) => void) | MutableRefObject<HTMLElement | null>'.
    const {width, height} = passedRef.current.getBoundingClientRect();

    const options = props.debug ? {
      border: '4px dotted red',
    } : {}

    const heightTransform = props.recentred
      ? `${(height - (height * fieldSize)) / 2}px`
      : 'none';

    const widthTransform = props.recentred
      ? `${(width - (width * fieldSize)) / -2}px`
      : 'none';

    const transform = props.recentred
      ? `translate(${widthTransform}, ${heightTransform})`
      : 'none';

    console.log(`[MagnetikContainer] transform = ${transform}`);
    // Apply the field size
    gsap.set(mainContainerRef.current, {
      width: width * fieldSize,
      height: height * fieldSize,

      transform: transform,

      ...options
    });
  })

  // Render
  return (
    // @ts-ignore
    <StyledMagnetikContainer
      style={props.style}
      ref={mainContainerRef}

      onMouseMove={handleMagnetikContainerMouseMove}
      onMouseLeave={handleMagnetikContainerMouseLeave}
    >
      <StyledChildContainer
        // @ts-ignore
        ref={passedRef}
      >
        {props.children}
      </StyledChildContainer>
    </StyledMagnetikContainer>
  )
});
// END COMPONENT =======================================================================================  END COMPONENT

export default MagnetikContainer;

/**
 * End of file src/components/src/components/Magnetik/Magnetik.tsx
 */
