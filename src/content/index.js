import { SELECTORS }          from '../core/constants';
import { addMessageListener } from '../core/messaging';
import { findNode }           from '../util/dom';

let interval = null;

addMessageListener( 'swipe', function( message ) {

  console.log( message );
  if ( interval ) {
    clearInterval( interval );
  }

  if ( message.swiping ) {
    interval = setInterval( () => {
      const button = findNode( SELECTORS.LIKE_BUTTON );
      button.click();
    }, 1000 );
  }
} );