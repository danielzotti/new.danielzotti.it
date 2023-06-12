export const SvgFilters = () => {
  // Thanks to Zoltan Fegyver for figuring out pixelation and producing the awesome pixelation map.
  return <>
    <svg style={{ visibility: 'hidden', width: 0, height: 0, margin: 0, padding: 0, display: 'block' }}>
      <filter id='pixelate' x='0' y='0'>
        <feFlood x='4' y='4' height='2' width='2' />
        <feComposite width='5' height='5' />
        <feTile result='a' />
        <feComposite in='SourceGraphic' in2='a' operator='in' />
        <feMorphology operator='dilate' radius='2' />
      </filter>
    </svg>
  </>;
};
