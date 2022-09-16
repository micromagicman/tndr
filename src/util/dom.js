function node( selector ) {
  const node = document.querySelector( selector );

  const _setIfExistsAndReturn = ( key, val ) => {
    if ( val ) {
      node[key] = val;
    }
    return node[key];
  };

  const _getAttribute = ( key ) =>
      node.getAttribute( key );

  const _setAttribute = ( key, value ) => {
    if ( 'boolean' === typeof value && !value ) {
      node.removeAttribute( key );
    } else {
      node.setAttribute( key, value );
    }
  };

  const style = ( css ) =>
      Object.keys( css )
            .forEach( k => node.style[k] = css[k] );

  const hide = () =>
      style( { display: 'none' } );

  const show = () =>
      style( { display: '' } );

  const toggleShow = ( isShow ) =>
      isShow ? show() : hide();

  const on = ( eventType, callback ) =>
      node.addEventListener( eventType, callback );

  const click = () =>
      node.click();

  const exists = () =>
      !!node;

  const value = _setIfExistsAndReturn.bind( null, 'value' );
  const text = _setIfExistsAndReturn.bind( null, 'innerText' );
  const min = _getAttribute.bind( null, 'min' );
  const max = _getAttribute.bind( null, 'max' );
  const disable = _setAttribute.bind( null, 'disabled' );

  return {
    click,
    style,
    hide,
    show,
    on,
    toggleShow,
    disable,
    value,
    text,
    min,
    max,
    exists,
  };
}

export { node };
