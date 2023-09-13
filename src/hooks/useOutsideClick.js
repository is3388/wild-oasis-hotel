import { useEffect, useRef } from 'react';

// listener only listen on capturing phase (bubble down the DOM tree) not bubbling phase (bubble up the DOM tree)
export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      // ref.current is the modal and e.target (event) is outside of the modal
      if (ref.current && !ref.current.contains(e.target)) handler();
    }
    document.addEventListener('click', handleClick, listenCapturing); // adding true to prevent bubbling up the tree where the modal places in root (document.body)
    // not letting Add cabin/Add table to show the form
    // the event will be handled in capturing phase not bubbling phase - only bubbling down the DOM tree
    // remove the event listener when the component is unmounted
    return () =>
      document.removeEventListener('click', handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
}
