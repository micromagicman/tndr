import { SELECTORS }   from './core/constants';
import { sendMessage } from './core/messaging';
import { get, save }   from './core/storage';
import { findNode }    from './util/dom';

const playSwipesButton = findNode( SELECTORS.POPUP_PLAY_SWIPES );

const swipeClickButtonHandler = () => {
  get( 'swiping' )
      .then( ( { swiping } ) => {
        return save( 'swiping', !swiping );
      } )
      .then( ( swiping ) => {
        sendMessage( 'swipe', { swiping } );
      } );
};

playSwipesButton.addEventListener( 'click', swipeClickButtonHandler );