import styled from 'styled-components';
import { HiXMark } from 'react-icons/hi2';
import { cloneElement } from 'react';

import { createPortal } from 'react-dom';
import { useState, createContext, useContext } from 'react';
import { useOutsideClick } from '../hooks/useOutsideClick';

//import { ClickAwayListener } from "@mui/material"; alternative solution

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

// 1. create context api
const ModalContext = createContext();

// 2. create parent component
function Modal({ children }) {
  // multiple windows inside the modal, control which one is open
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

// 3. create child component. here is the Button but we need to pass in onClick handler by using react cloneElement

function Open({ children, windowName }) {
  const { open } = useContext(ModalContext);
  // children is Button with onClick handler in App.js
  // to add the opens state to the children by using React cloneElement fn
  // create a new version of children by passing props onClick
  return cloneElement(children, { onClick: () => open(windowName) });
}

// create child component which is the window contains this portal with JSX
// add global event listener to detect click outside the modal to close the modal
function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  const ref = useOutsideClick(close); // pass in close handler

  if (name !== openName) return null;

  // onCloseModal which is the prop. The one might be optional in CreateCabinForm
  return createPortal(
    <Overlay>
      {/*<ClickAwayListener onClickAway={close}> */}
        <StyledModal ref={ref}>
          <Button onClick={close}>
          <HiXMark />
          </Button>
          <div>{cloneElement(children, { onCloseModal: close })}</div>
        </StyledModal>
      {/*</ClickAwayListener>*/}
    </Overlay>,
    document.body
    // document.querySelector()
  );
}

// 4. add child components as properties to parent component
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
