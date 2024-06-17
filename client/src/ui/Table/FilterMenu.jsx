import {
  createContext,
  memo,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { LuSlidersHorizontal } from 'react-icons/lu';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { createPortal } from 'react-dom';
import Button from '../Button';
import ToolButton from '../ToolButton';
import Toolbar from '../Toolbar';

// const StyledToggle = styled.button`
//   background: none;
//   border: none;
//   padding: 0.4rem;
//   border-radius: var(--border-radius-md);
//   transform: translateX(0.8rem);
//   transition: all 0.3s;

//   &:hover {
//     background-color: var(--color-grey-100);
//   }

//   & svg {
//     width: 2.4rem;
//     height: 2.4rem;
//     color: var(--color-grey-700);
//   }
// `;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${props => props.$position.x}px;
  top: ${props => props.$position.y}px;
`;

const FilterMenuContext = createContext();

function FilterMenu({ children }) {
  const [position, setPosition] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);
  const open = setIsOpen;

  return (
    <FilterMenuContext.Provider
      value={{ isOpen, close, open, position, setPosition }}>
      {children}
    </FilterMenuContext.Provider>
  );
}

// Menu card
const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

function Toggle() {
  const { isOpen, close, open, setPosition } = useContext(FilterMenuContext);

  function handleClick(e) {
    const rect = e.target.closest('button').getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    isOpen === false ? open(true) : close();
  }

  return (
    <Toolbar.Button
      $variation="primary"
      $size="medium"
      $active={isOpen}
      onClick={handleClick}>
      <LuSlidersHorizontal />
    </Toolbar.Button>
  );
}

function List({ children }) {
  const { isOpen, position, close } = useContext(FilterMenuContext);
  console.log(`Position: `, position);
  const ref = useOutsideClick(close);

  if (!isOpen) return null;

  return createPortal(
    <StyledList $position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

FilterMenu.Menu = Menu;
FilterMenu.Toggle = Toggle;
FilterMenu.List = List;
// FilterMenu.Button = Button;

export default FilterMenu;
