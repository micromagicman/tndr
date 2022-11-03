import '../style/popup.less';
import { SELECTORS, ICONS }   from './core/constants';
import {
  intervalRatio,
  getMillisecondsFromIntervalRange,
  getHumanReadableIntervalLabel,
  getRangeValueFromMilliseconds,
}                             from './core/interval';
import { sendMessage }        from './core/messaging';
import { get, save }          from './core/storage';
import { isCurrentTabTinder } from './core/tinder-utils';
import { node }               from './util/dom';

const domManager = {

  swiping( swiping ) {
    const image = swiping ? ICONS.STOP_SWIPES : ICONS.START_SWIPES;
    this.swipeIntervalRange.disable( swiping );
    this.likeButton.style( { backgroundImage: `url(/icons/${ image })` } );
  },

  hideWidgets( hide ) {
    this.blockPopupLayer.toggleShow( !hide );
  },

  bindEventListeners() {
    this.likeButton.on( 'click', swipeClickButtonHandler );
    this.swipeIntervalRange.on( 'input', onSwipeIntervalUpdate );
  },

  init( { currentTabTinder, swiping, swipingTimeout, rangeValue } ) {
    console.log({ currentTabTinder, swiping, swipingTimeout, rangeValue });
    this.likeButton = node( SELECTORS.POPUP_PLAY_SWIPES );
    this.swipeIntervalRange = node( SELECTORS.POPUP_SWIPE_INTERVAL_RANGE );
    this.swipeIntervalValue = node( SELECTORS.POPUP_SWIPE_INTERVAL_VALUE );
    this.blockPopupLayer = node( SELECTORS.POPUP_BLOCK_LAYER );
    this.swipeIntervalRange.value( rangeValue );
    this.bindEventListeners();
    this.hideWidgets( !currentTabTinder );
    this.swiping( swiping );
    this.updateSwipeIntervalState(
        intervalRatio( ...this.rangeState() ),
        getHumanReadableIntervalLabel( swipingTimeout ),
    );
  },

  rangeState() {
    return [
      this.swipeIntervalRange.value(),
      this.swipeIntervalRange.min(),
      this.swipeIntervalRange.max(),
    ];
  },

  updateSwipeIntervalState( ratio, intervalText ) {
    this.swipeIntervalRange.style( { backgroundSize: `${ ratio }% 100%` } );
    this.swipeIntervalValue.text( intervalText );
  },
};

const swipeClickButtonHandler = async () => {
  const swiping = !( await get( 'swiping' ) ),
      swipingTimeout = await get( 'swipingTimeout' );
  domManager.swiping( swiping );
  await save( 'swiping', swiping );
  await sendMessage( 'swipe', { swiping, swipingTimeout } );
};

const onSwipeIntervalUpdate = async () => {
  const [value, min, max] = domManager.rangeState();
  const intervalMs = getMillisecondsFromIntervalRange( value );
  await save( 'swipingTimeout', intervalMs );
  domManager.updateSwipeIntervalState(
      intervalRatio( value, min, max ),
      getHumanReadableIntervalLabel( intervalMs ),
  );
};

window.addEventListener( 'load', async () => {
  const swipingTimeout = await get( 'swipingTimeout' );
  domManager.init( {
    currentTabTinder: await isCurrentTabTinder(),
    swiping: await get( 'swiping' ),
    rangeValue: getRangeValueFromMilliseconds( swipingTimeout ),
    swipingTimeout,
  } );
} );