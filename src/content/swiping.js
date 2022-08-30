import { SELECTORS }          from '../core/constants';
import { addMessageListener } from '../core/messaging';
import { get, save }          from '../core/storage';
import { findNode }           from '../util/dom';

const createInterval = () =>
    setInterval( () => {
      findNode( SELECTORS.LIKE_BUTTON ).click();
    }, 1000 );

addMessageListener( 'swipe', async ( { swiping } ) => {
  const swipingInterval = await get( 'swipingInterval' );
  if ( swipingInterval ) {
    clearInterval( swipingInterval );
  }
  await save( 'swipingInterval', swiping ? createInterval() : null );
} );
