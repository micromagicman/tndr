import { SELECTORS, ICONS } from '../core/constants';

export const findNode = ( selector ) => document.querySelector( selector );

export const updateSwipingButtonState = ( swiping ) => {
  const image = swiping ? ICONS.STOP_SWIPES : ICONS.START_SWIPES;
  findNode( SELECTORS.POPUP_PLAY_SWIPES ).style.backgroundImage = `url(../images/${image})`;
};
