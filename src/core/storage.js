import { SECOND_MS } from './interval';

const storage = chrome.storage.sync;
const initialState = {
  swiping: false,
  swipingTimeout: SECOND_MS,
};

function initializeStorage() {
  storage.set( initialState );
}

function save( key, value ) {
  return new Promise( ( resolve, reject ) => {
    storage.set( { [key]: value }, () => {
      if ( chrome.runtime.lastError ) {
        return reject( chrome.runtime.lastError );
      }
      return resolve( value );
    } );
  } );
}

function get( key, defaultValue = null ) {
  return new Promise( ( resolve, reject ) => {
    storage.get( [key], ( item ) => {
      if ( chrome.runtime.lastError ) {
        return reject( chrome.runtime.lastError );
      }
      return resolve( item[key] );
    } );
  } );
}

export {
  initializeStorage,
  save,
  get,
};