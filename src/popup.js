import { SELECTORS }                          from './core/constants';
import { sendMessage }                        from './core/messaging';
import { get, save }                          from './core/storage';
import { getCurrentTab }                      from './core/tabs';
import { updateSwipingButtonState, findNode } from './util/dom';

const swipeClickButtonHandler = async () => {
  const swiping = !( await get( 'swiping' ) );
  await save( 'swiping', swiping );
  updateSwipingButtonState( swiping );
  await sendMessage( 'swipe', { swiping } );
};

const checkOpenedOnTinderPage = async () => {
  const { url } = await getCurrentTab();
  findNode( SELECTORS.POPUP_BLOCK_LAYER )
      .toggleShow( !url.startsWith( 'https://tinder.com' ) );
};

( async function() {
  await checkOpenedOnTinderPage();
  const swiping = await get( 'swiping' );
  updateSwipingButtonState( swiping );
  findNode( SELECTORS.POPUP_PLAY_SWIPES ).on( 'click', swipeClickButtonHandler );
} )();