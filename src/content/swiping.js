import { SELECTORS }          from '../core/constants';
import { addMessageListener } from '../core/messaging';
import { get, save }          from '../core/storage';
import { node }               from '../util/dom';

function createInterval( timeout ) {
  return setInterval( () => {
    const likeButton = node( SELECTORS.LIKE_BUTTON );
    if ( likeButton.exists() ) {
      likeButton.click();
    } else {
      console.warn( 'Like button not found!' );
    }
  }, timeout );
}

addMessageListener( 'swipe', async ( { swiping, swipingTimeout } ) => {
  const swipingInterval = await get( 'swipingInterval' );
  if ( swipingInterval ) {
    clearInterval( swipingInterval );
  }
  await save( 'swipingInterval', swiping ? createInterval( swipingTimeout ) : null );
} );

addEventListener( 'beforeunload', async () => {
  await save( 'swiping', false );
} );
