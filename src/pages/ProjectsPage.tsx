/**
 * @file src/pages/ProjectsPage.tsx
 * @description ProjectsPage component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import styled from 'styled-components';
import ProjectPageLayout from "./ProjectPageLayout";
import {StyledParagraph} from "./LastFMHandlerPage";
import ProjectCard from "../components/ProjectCard";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
// Style variables
const StyledProjectsPage = styled.div`
    // CSS
`;

const StyledProjectsGrid = styled.div`
  height: 100%;
  width: 100%;
  
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20vmax, 1fr));
  
  gap: 2rem;
`;

const StyledProjectCard = styled.div`
  height: auto;
  width: 100%;
  
  aspect-ratio: 3/4;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  
  border: 1px solid #eeeeee50;
`;

// Type(s)
export type T_Tag = {
  name: string;
  color: string;
  backgroundColor: string;
};

type T_Project = {
  title: string;
  description: string;
  link: string;
  tags: T_Tag[];
};

// Other(s)
const frontEndTag: T_Tag = {
  name: 'Front-end',
  color: '#1e1e1e',
  backgroundColor: '#f47067'
};

const backEndTag: T_Tag = {
  name: 'Back-end',
  color: '#1e1e1e',
  backgroundColor: '#dcbdfb'
};

const APITag: T_Tag = {
  name: 'API',
  color: '#1e1e1e',
  backgroundColor: '#e8ba35'
};

const projects: T_Project[] = [
  {
    title: 'Custom Cursor',
    description: 'Custom cursor for my portfolio website.',
    link: '/projects/custom-cursor',
    tags: [
      frontEndTag
    ]
  },
  {
    title: 'LastFM Middleware',
    description: 'Middleware to get my LastFM data.',
    link: '/projects/lastfm-middleware',
    tags: [
      backEndTag,
      APITag
    ]
  },
  {
    title: 'Is Playing Display',
    description: 'Display of the song I\'m currently listening to.',
    link: '/projects/is-playing-display',
    tags: [
      frontEndTag,
      APITag
    ]
  },
  {
    title: 'This website',
    description: 'Made with React, TypeScript and styled-components.',
    link: '/',
    tags: [
      frontEndTag
    ]
  }
];
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * ProjectsPage component
 * @return
 * @constructor
 **/
const ProjectsPage = () => {
  // State(s)

  // Ref(s)

  // Method(s)

  // Effect(s)

  // Render
  return (
    <ProjectPageLayout
      title={"My projects"}
      style={{
        gap: '2rem'
      }}
      header={true}
    >

      <StyledParagraph>
        Those are the projects I worked on during my free time.
      </StyledParagraph>

      <StyledProjectsGrid>
        {
          projects.map((project, index) => {
            return (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                link={project.link}
                tags={project.tags}
              />
            )
          })
        }
      </StyledProjectsGrid>

    </ProjectPageLayout>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default ProjectsPage;

/**
 * End of file src/components/src/pages/ProjectsPage.tsx
 */
