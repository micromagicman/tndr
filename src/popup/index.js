import { SELECTORS }     from '../core/constants';
import { sendMessage }   from '../core/messaging';
import { toggleSwiping } from '../core/state';
import { findNode }      from '../util/dom';

const playSwipesButton = findNode( SELECTORS.POPUP_PLAY_SWIPES );

const swipeClickButtonHandler = () => {
  const { swiping } = toggleSwiping();
  sendMessage( 'swipe', { swiping } );
};

playSwipesButton.addEventListener( 'click', swipeClickButtonHandler );