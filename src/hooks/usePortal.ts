import { useEffect, useRef } from 'react';

function prependOrApendElement(
  containerElement: HTMLDivElement | HTMLBodyElement | Element,
  newChild: HTMLElement,
  prepend: boolean,
) {
  if (containerElement) {
    if (prepend) {
      return containerElement.insertBefore(newChild, containerElement.firstChild);
    }
    return containerElement.appendChild(newChild);
  } else {
    throw new Error('Container element is not defined');
  }
}

export function usePortal(
  parentElement: HTMLDivElement | HTMLBodyElement | Element,
  prepend: boolean = false
) {
  const rootElemRef = useRef(document.createElement('div'));

  useEffect(function setupElement() {
    // Add the detached element to the parent
    prependOrApendElement(
      parentElement,
      rootElemRef.current,
      prepend
    );
    // This function is run on unmount
    return function removeElement() {
      rootElemRef.current.remove();
    };
  }, [parentElement, prepend]);

  return rootElemRef.current;
}
