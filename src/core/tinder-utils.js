import { TINDER_URL }    from './constants';
import { getCurrentTab } from './tabs';

async function isCurrentTabTinder() {
  const { url } = await getCurrentTab();
  return !url.startsWith( TINDER_URL );
}

export { isCurrentTabTinder };