import { initializeStorage } from './core/storage';

chrome.runtime.onInstalled.addListener( () => {
  initializeStorage();
} );