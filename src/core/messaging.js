import { getCurrentTab } from './tabs';

const listeners = {};

chrome.runtime.onMessage.addListener( ( message, sender, sendResponse ) => {
  if ( listeners.hasOwnProperty( message.type ) ) {
    listeners[message.type].forEach( l => l( message ) );
  }
} );

async function sendMessage ( type, message ) {
  const { id } = await getCurrentTab();
  chrome.tabs.sendMessage( id, { type, ...message } );
}

async function addMessageListener( type, callback ) {
  if ( !listeners.hasOwnProperty( type ) ) {
    listeners[type] = [];
  }
  listeners[type].push( callback );
}

export {
  sendMessage,
  addMessageListener,
};