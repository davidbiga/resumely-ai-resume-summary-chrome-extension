import { useEffect, useState } from 'react';
export const useMutationObserver = (
  selector: string,
  enabled: boolean,
  options = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  }
) => {
  const [mutationsState, setMutationsState] = useState<MutationRecord[]>([]);
  const [observerState, setObserversState] = useState<MutationObserver | null>(null);


  useEffect(() => {
    if (enabled) {
      const element = document.querySelector(selector);
      if (element) {
        const observer = new MutationObserver((
          mutations: MutationRecord[], observer: MutationObserver
        ) => {
          setMutationsState(mutations);
          setObserversState(observer);
        });
        observer.observe(element, options);
        return () => observer.disconnect();
      } else {
        throw new Error('Element is not defined');
      }
    }
  }, [options, enabled, selector]);

  return [mutationsState, observerState];
};
