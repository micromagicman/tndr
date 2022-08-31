import { SELECTORS, ICONS } from '../core/constants';

const findNode = ( selector ) => {
  const node = document.querySelector( selector );
  const style = ( css ) =>
      Object.keys( css )
            .forEach( k => node.style[k] = css[k] );
  const hide = () => style( { display: 'none' } );
  const show = () => style( { display: '' } );
  const toggleShow = ( isShow ) => isShow ? show() : hide();
  const on = ( eventType, callback ) => node.addEventListener( eventType, callback );
  const click = () => node.click();
  return { click, style, hide, show, on, toggleShow };
};

const updateSwipingButtonState = ( swiping ) => {
  const image = swiping ? ICONS.STOP_SWIPES : ICONS.START_SWIPES;
  findNode( SELECTORS.POPUP_PLAY_SWIPES )
      .style( { backgroundImage: `url(../images/${ image })` } );
};

export {
  findNode,
  updateSwipingButtonState,
};
