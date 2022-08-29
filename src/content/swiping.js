import { SELECTORS }          from '../core/constants';
import { addMessageListener } from '../core/messaging';
import { get, save }          from '../core/storage';
import { findNode }           from '../util/dom';

addMessageListener( 'swipe', ( { swiping } ) => {
  get( 'swipingInterval' )
      .then( ( { swipingInterval } ) => {
        console.log( swipingInterval, swiping );
        if ( swipingInterval ) {
          clearInterval( swipingInterval );
        }
        if ( swiping ) {
          return setInterval( () => {
            findNode( SELECTORS.LIKE_BUTTON ).click();
          }, 1000 );
        }
        return null;
      } )
      .then( ( swipingInterval ) => save( 'swipingInterval', swipingInterval ) );
} );