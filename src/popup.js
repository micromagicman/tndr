import { SELECTORS }                          from './core/constants';
import { sendMessage }                        from './core/messaging';
import { get, save }                          from './core/storage';
import { updateSwipingButtonState, findNode } from './util/dom';

const swipeClickButtonHandler = async () => {
  const swiping = !( await get( 'swiping' ) );
  await save( 'swiping', swiping );
  updateSwipingButtonState( swiping );
  sendMessage( 'swipe', { swiping } );
};

( async () => {
  const { swiping } = await get( 'swiping' );
  updateSwipingButtonState( swiping );
  findNode( SELECTORS.POPUP_PLAY_SWIPES )
      .addEventListener( 'click', swipeClickButtonHandler );
} )();