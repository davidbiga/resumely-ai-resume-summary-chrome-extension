import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { App } from './App';


export const clearStorageEntries = () => {
  window.localStorage.removeItem('resume-experience');
  window.localStorage.removeItem('ai-summary');
}

export const setStorageEntry = (key: string, resume: object) => {
  window.localStorage.setItem(
    key,
    JSON.stringify({
      resume
    })
  );
}

export const getStorageEntry = (key: string) => {
  const entry = window.localStorage.getItem(key);

  if (entry) {
    return JSON.parse(entry);
  }

  return null;
};

chrome.tabs.query({ active: true, currentWindow: true }, () => {
  const popup = document.getElementById('popup');
  if (popup) {
    const root = ReactDOM.createRoot(popup);
    root.render(<App />);
  }
});
