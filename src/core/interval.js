const MILLIS_TOP_THRESHOLD = 40,
    SECOND_MS = 1000,
    MINUTE_MS = 60 * SECOND_MS,
    MILLIS_RANGE_STEP = 25,
    MIN_RANGE_VALUE = 1,
    MAX_RANGE_VALUE = 99;

function getMillisecondsFromIntervalRange( value ) {
  if ( value < MIN_RANGE_VALUE ) {
    value = MIN_RANGE_VALUE;
  }
  if ( value > MAX_RANGE_VALUE ) {
    value = MAX_RANGE_VALUE;
  }
  return value <= MILLIS_TOP_THRESHOLD
      ? value * MILLIS_RANGE_STEP
      : ( value - MILLIS_TOP_THRESHOLD + 1 ) * SECOND_MS;
}

function getRangeValueFromMilliseconds( millis ) {
  if ( millis < SECOND_MS ) {
    return Math.round( millis / MILLIS_RANGE_STEP );
  }
  if ( millis < MINUTE_MS ) {
    return MILLIS_TOP_THRESHOLD + Math.round( ( millis - SECOND_MS ) / SECOND_MS );
  }
  return MAX_RANGE_VALUE;
}

function getHumanReadableIntervalLabel( intervalMillis ) {
  if ( intervalMillis < SECOND_MS ) {
    return `${ intervalMillis } ms`;
  }
  if ( intervalMillis < MINUTE_MS ) {
    return `${ Math.round( intervalMillis / SECOND_MS ) } s`;
  }
  return `${ Math.round( intervalMillis / MINUTE_MS ) } min`;
}

function intervalRatio( value, min, max ) {
  return ( value - min ) * 100 / ( max - min );
}

export {
  SECOND_MS,

  getRangeValueFromMilliseconds,
  getMillisecondsFromIntervalRange,
  getHumanReadableIntervalLabel,
  intervalRatio,
};