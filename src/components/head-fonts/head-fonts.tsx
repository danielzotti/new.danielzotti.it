import { config } from '../../config';

export const HeadFonts = () => (
  <>
    {config.fontUrls.map((url) => (
      <link key={url} href={url} rel="stylesheet" />
    ))}
  </>
);
