/**
 * @file src/components/ProjectCard.tsx
 * @description ProjectCard component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import styled from 'styled-components';
import MyButton from "./MyButton";
import {T_Tag} from "../pages/ProjectsPage";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
// Style variables
const StyledProjectCard = styled.div`
  height: auto;
  width: 100%;

  aspect-ratio: 3/4;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  border-radius: 1rem;
  padding: 1rem 2rem;

  border: 1px solid #eeeeee50;
  

  &:hover {
    img {
      scale: 1.1;
    }
  }
  
  box-shadow:
    rgb(103, 159, 197) 0 1px 3px 0,
    rgb(103, 159, 197) 0 0 0 1px;
  
  h1 {
    font-size: 2rem;
  }
`;

const StyledTagContainer = styled.div`
  height: auto;
  width: 100%;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: .5rem;
`;

const StyledImageContainer = styled.div`
  height: 30%;
  width: 100%;
  
  overflow: hidden;
  
  img {
    object-fit: cover;
    
    transition: scale .25s ease-in-out;
  }
`;

const StyledTag = styled.div<{$bgColor: string, $fontColor: string}>(props => ({
  color: props.$fontColor,
  background: props.$bgColor,

  fontSize: "1.25rem",
  fontFamily: "Mondwest, sans-serif",

  padding: ".25rem .75rem",

  borderRadius: '2rem'
}));

const StyledButton = styled(MyButton)(props => ({
  padding: "1rem",
  borderRadius: ".5rem",
  backgroundColor: "rgb(103, 159, 197)",
  color: "#080a13"
}));
// Type(s)
type T_ProjectProps = {
  title: string;
  description: string;
  link: string;
  tags: T_Tag[];
};

type T_ProjectCard = (props: T_ProjectProps) => JSX.Element;
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * ProjectCard component
 * @return
 * @constructor
 **/
const ProjectCard: T_ProjectCard = (props) => {
  // State(s)

  // Variable(s)
  const {
    title,
    description,
    link,
    tags
  } = props;

  // Ref(s)

  // Method(s)

  // Effect(s)

  // Render
  return (
    <StyledProjectCard>
      <h1>{title}</h1>
      <StyledTagContainer>
        {
          tags.map((tag, index) => {
            return (
              <StyledTag
                key={index}

                $fontColor={tag.color}
                $bgColor={tag.backgroundColor}
              >
                {tag.name}
              </StyledTag>
            )
          })
        }
      </StyledTagContainer>

      <StyledImageContainer>
        <img src="/imgs/react-pic.jpg" alt="TestImgr"/>
      </StyledImageContainer>

      <p>{description}</p>

      <StyledButton
        href={link}
        linkStyle={false}

      >
        See more
      </StyledButton>
    </StyledProjectCard>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default ProjectCard;

/**
 * End of file src/components/src/components/ProjectCard.tsx
 */
