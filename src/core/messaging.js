const listeners = {};

chrome.runtime.onMessage.addListener( ( message, sender, sendResponse ) => {
  if ( listeners.hasOwnProperty( message.type ) ) {
    listeners[message.type].forEach( l => l( message ) );
  }
} );

export const sendMessage = ( type, message ) => {
  chrome.tabs.query( { active: true, currentWindow: true }, function( tabs ) {
    chrome.tabs.sendMessage( tabs[0].id, { type, ...message } );
  } );
};

export const addMessageListener = ( type, callback ) => {
  if ( !listeners.hasOwnProperty( type ) ) {
    listeners[type] = [];
  }
  listeners[type].push( callback );
};