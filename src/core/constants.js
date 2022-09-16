const TINDER_URL = 'https://tinder.com';

const SELECTORS = {
  POPUP_PLAY_SWIPES: '#play-swipes',
  POPUP_BLOCK_LAYER: '#tndr-block-layer',
  POPUP_SWIPE_INTERVAL_RANGE: '#swiping-interval',
  POPUP_SWIPE_INTERVAL_VALUE: '#swiping-interval-value',

  LIKE_BUTTON: `[class="button Lts($ls-s) Z(0) CenterAlign Mx(a) Cur(p) Tt(u) Bdrs(50%) P(0) Fw($semibold) focus-button-style Bxsh($bxsh-btn) Expand Trstf(e) Trsdu($normal) Wc($transform) Pe(a) Scale(1.1):h Scale(.9):a Bgi($g-ds-background-like):a"]`,
};

const ICONS = {
  START_SWIPES: 'play.svg',
  STOP_SWIPES: 'pause.svg',
};

export {
  TINDER_URL,
  SELECTORS,
  ICONS,
};