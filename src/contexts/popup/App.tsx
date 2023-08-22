import React, { useEffect } from "react";
import { Popup } from '../../components/Popup/Popup';

export function App() {
  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
  }, []);

  return (
    <Popup />
  );
}
