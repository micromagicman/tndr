const initialState = {
  swiping: false,
};

let currentState = initialState;

export const setState = ( newStateProvider ) => {
  return currentState = Object.assign( currentState, newStateProvider( currentState ) );
};

export const getState = () => currentState;

export const toggleSwiping = () => {
  return setState( ( state ) => ( {
    swiping: !state.swiping,
  } ) );
};