/**
 * @file src/components/Menu.tsx
 * @description Menu component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {forwardRef, ForwardRefExoticComponent, RefAttributes, useEffect, useRef, useState} from "react";

import styled from 'styled-components';
import {gsap} from "gsap";

// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
const StyledMenu = styled.div`
  height: 100%;
  width: auto;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: .5rem;
  
  padding: 1.25rem 1rem;
  border-radius: 2rem;
  
  position: relative;
`;

const StyledMenuItemContainer = styled.div`
  height: 100%;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: .5rem;
`;

const StyledMenuItem = styled.div`
  height: 1.25rem;
  
  padding: 1.125rem 1rem;
  border-radius: 2rem;
  
  font-size: 1.25rem;
  font-family: "Fraktion Mono", sans-serif;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: .5rem;
  
  &:hover {
    outline: #eeeeee50 solid 2px;
  }
`;

const StyledMenuTitle = styled.h1`
  font-size: 1.5rem;
  font-family: "Fraktion Mono", sans-serif;
  
  border-radius: 1rem;
  padding: .75rem 1rem;
  outline: 1px solid #eeeeee50;
`;

// Type(s)
export type T_MenuItemProps = {
  title: string;
  href: string;
  isActive: boolean

  onClick?: () => void;
}

type T_MenuProps = {
  items: T_MenuItemProps[];
}

type T_Menu = (props: T_MenuProps) => JSX.Element;

type T_MenuItem = ForwardRefExoticComponent<T_MenuItemProps & RefAttributes<unknown>>;
// Other(s)
const radioSVG = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor" /></svg>
);

const radioCheckedSVG = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" fill="currentColor" /></svg>
);
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
const MenuItem: T_MenuItem = forwardRef((props, ref) => {
  // State(s)

  // Ref(s)

  // Method(s)
  const renderCheck = () => {
    return props.isActive ? radioCheckedSVG : radioSVG;
  }

  // Effect(s)

  // Render

  // Render
  return (
    <StyledMenuItem
      // @ts-ignore
      ref={ref}

      onClick={props.onClick}
    >
      <span>{renderCheck()}</span>
      <h1>{props.title}</h1>
    </StyledMenuItem>
  )
})

MenuItem.displayName = "MenuItem";

/**
 * Menu component
 * @return
 * @constructor
 **/
const Menu: T_Menu = (props) => {
  // State(s)
  const [isMinimized, setIsMinimized] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [firstRender, setFirstRender] = useState<boolean>(true);

  // Ref(s)
  const menuRef = useRef<HTMLDivElement>(null);
  const menuTitleRef = useRef<HTMLHeadingElement>(null);
  const menuItemContainerRef = useRef<HTMLDivElement>(null);
  const menuItemsArrayRef = useRef<HTMLDivElement[]>([]);

  // Method(s)
  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  }

  const handleMouseEnter = () => {
    setIsMinimized(false);
  }

  const handleMouseLeave = () => {
    setIsMinimized(true);
  }

  // Effect(s)
  useEffect(() => {

    setFirstRender(false)
  }, []);

  useEffect(() => {
    if (
      !menuRef.current
      || firstRender
    ) return;

    const animTl = gsap.timeline({
      defaults: {
        duration: .5,
        ease: "power2.inOut",
      }
    });

    if (isMinimized) {
      animTl
        .to(menuItemContainerRef.current, {
          width: 0
        })

    } else {
      animTl
        .fromTo(menuItemContainerRef.current,
          {
            width: 0,
            duration: 0
          }, {
            width: "30vw"
          })
        .fromTo(menuItemsArrayRef.current, {
          opacity: 0,
          y: "100%"
        }, {
          opacity: 1,
          y: "0%",
          stagger: .1
        })
    }
  }, [isMinimized]);

  // Render
  return (
    <StyledMenu
      ref={menuRef}

      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <StyledMenuTitle
        ref={menuTitleRef}
      >
        Menu
      </StyledMenuTitle>

      <StyledMenuItemContainer
        ref={menuItemContainerRef}
      >
        {
          props.items
          && !isMinimized
          && props.items.map((item, index) => {
            return (
              <MenuItem
                key={index}
                ref={ref => menuItemsArrayRef.current[index] = ref as HTMLDivElement}

                onClick={() => handleItemClick(index)}

                title={item.title}
                href={item.href}
                isActive={index === activeIndex}
              />
            )
          })
        }
      </StyledMenuItemContainer>
    </StyledMenu>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default Menu;

/**
 * End of file src/components/src/components/Menu.tsx
 */
