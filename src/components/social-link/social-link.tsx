import Link from 'next/link';
import React from 'react';

export interface SocialLinkProps {
  label: string;
  url: string;
  target: '_blank' | '_self';
}

export const SocialLink = ({
  url,
  target,
  label,
}: SocialLinkProps): JSX.Element => {
  return (
    <Link href={url} target={target}>
      <div>{label}</div>
    </Link>
  );
};
