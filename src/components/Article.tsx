/**
 * @file src/components/Article.tsx
 * @description Article component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import styled from 'styled-components';
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
const StyledArticle = styled.article<{
  $outlineColor?: string,
}>(props => ({
  width: '90%',

  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '3rem',
  flexWrap: 'wrap',

  padding: '2rem 1rem',
  margin: '1rem 0',
  borderRadius: '1rem',


  outline: `1px solid ${props.$outlineColor || props.theme.accent}`,

  // if element is less than 300px
}));

export const StyledArticleTitle = styled.h3<{
  $maxWidth?: string,
}>(props => ({
  width: `min(${props.$maxWidth || 'max-content'}, 100%)`,

  fontSize: '2.25rem',
  fontFamily: "Mondwest, sans-serif !important",
  padding: '0 1rem',
  alignSelf: 'flex-start',
  justifySelf: 'flex-start',

  "&:before": {
    content: '"> "',
  }
}));

const StyledArticleArgsContainer = styled.ul(props => ({
  width: 'max-content',
  height: '100%',

  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
  gridTemplateRows: 'repeat(3, minmax(0,1fr))',
  gap: '1rem',

  alignSelf: 'flex-end',
  justifySelf: 'flex-end',
}));

const StyledArticleArgs = styled.p<{
  $beforeSymbol: string,
}>(props => ({
  fontSize: '1.5rem',
  fontFamily: "Fraktion Mono, sans-serif !important",
  padding: '0 1rem',
  textAlign: 'left',

  "&:before": {
    content: `"${props.$beforeSymbol} "`,
  }
}));

// Type(s)
export type T_ArticleArg = {
  name: string;
  status: 'using' | 'learning' | 'toLearn';
}

export type T_ArticleProps = {
  title: string;
  args: T_ArticleArg[];

  titleMaxWidth?: string;
}

type T_Article = (props: T_ArticleProps) => JSX.Element;
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * Article component
 * @return
 * @constructor
 **/
const Article: T_Article = (props: T_ArticleProps) => {
  // Variables
  const { title, args } = props;

  // Render
  return (
    <StyledArticle>
      <StyledArticleTitle
        $maxWidth={props.titleMaxWidth}
      >{title}</StyledArticleTitle>

      <StyledArticleArgsContainer>
        {
          args.map((arg, index) => (
            <StyledArticleArgs
              key={index}
              $beforeSymbol={
              arg.status === 'using'
                ? '-'
                : arg.status === 'learning'
                  ? '~'
                  : '+'}
            >
              {arg.name}
            </StyledArticleArgs>
          ))
        }

      </StyledArticleArgsContainer>

    </StyledArticle>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default Article;

/**
 * End of file src/components/src/components/Article.tsx
 */
