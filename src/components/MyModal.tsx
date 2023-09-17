/**
 * @file src/components/MyModal.tsx
 * @description MyModal component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import styled from 'styled-components';
import {ReactNode, useState} from "react";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
const StyledBackground = styled.div<{$blurred?: boolean, $bgColor?: string}>`
  height: 100vh;
  width: 100vw;
  
  position: fixed;
  top: 0;
  left: 0;
  
  // if $blurred, apply multiple filters
  background-color: ${props => props.$blurred ? (props.$bgColor || "#eeeeee25") : "transparent"};
  backdrop-filter: ${props => props.$blurred ? "blur(16px)" : "none"};
  -webkit-backdrop-filter: ${props => props.$blurred ? "blur(16px)" : "none"}; // // Compatible with Safari
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  
  z-index: 99999;
`;

const StyledTitle = styled.h1`
  font-size: 5rem;
  font-family: "Mondwest", sans-serif;
  justify-self: center;
`;

const StyledOkButton = styled.button`
  height: 3rem;
  width: 6rem;
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  
  border-radius: 1rem;
  outline: white solid 2px;
  
  font-size: 1.5rem;
  
  padding: 1rem;
  
  &:hover {
    outline: #1f6feb solid 2px;
  }
`;

const StyledMyModal = styled.div`
  height: auto;
  width: auto;
  
  padding: 2rem;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  gap: 3rem;
  
  outline: #1f6feb solid 2px;
  border-radius: 2rem;
  
  text-align: justify;
  
`;

// Type(s)
type T_MyModalBackground = "blurry" | "transparent" | {
  color: string;
}

type T_MyModalType = "ok" | "cancel" | "ok-cancel" | "yes-no" | "custom"

type T_MyModalProps = {
  title: string;
  children: ReactNode;
  type?: T_MyModalType;

  background?: T_MyModalBackground;
}

// type T_MyModal = (props: T_MyModalProps) => JSX.Element;
// Other(s)
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * MyModal component
 * @return
 * @constructor
 **/
const MyModal = (props: T_MyModalProps) => {
  // Vars
  const {
    title,
    type = "ok",
    background = "blurry"
  } = props;

  // State(s)
  const [show, setShow] = useState<boolean>(true);

  // Ref(s)

  // Method(s)
  const closeModal = () => {
    setShow(false);
  }

  const renderButtons = () => {
    switch (type) {
      case "ok":
        return (
          <StyledOkButton
            onClick={closeModal}
          >
            Ok
          </StyledOkButton>
        )
      case "cancel":
        return (
          <StyledOkButton>Cancel</StyledOkButton>
        )
      case "ok-cancel":
        return (
          <>
            <StyledOkButton>Ok</StyledOkButton>
            <StyledOkButton>Cancel</StyledOkButton>
          </>
        )
      case "yes-no":
        return (
          <>
            <StyledOkButton>Yes</StyledOkButton>
            <StyledOkButton>No</StyledOkButton>
          </>
        )
    }
  }

  // Effect(s)

  // Render
  return (
    show &&
      <StyledBackground
        $blurred={props.background === "blurry"}
      >
        <StyledMyModal>
          <StyledTitle>{title}</StyledTitle>

          {
            props.children
          }

          {renderButtons()}

        </StyledMyModal>
      </StyledBackground>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default MyModal;

/**
 * End of file src/components/src/components/MyModal.tsx
 */
