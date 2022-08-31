const storage = chrome.storage.sync;

const initialState = {
  swiping: false,
  swipingInterval: null,
};

const initializeStorage = () =>
    storage.set( initialState );

const save = ( key, value ) => {
  return new Promise( ( resolve, reject ) => {
    storage.set( { [key]: value }, () => {
      if ( chrome.runtime.lastError ) {
        return reject( chrome.runtime.lastError );
      }
      return resolve( value );
    } );
  } );
};

const get = ( key ) => {
  return new Promise( ( resolve, reject ) => {
    storage.get( [key], ( item ) => {
      if ( chrome.runtime.lastError ) {
        return reject( chrome.runtime.lastError );
      }
      return resolve( item[key] );
    } );
  } );
};

export {
  initializeStorage,
  save,
  get,
};