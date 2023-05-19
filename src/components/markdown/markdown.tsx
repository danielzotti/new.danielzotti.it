import MarkdownToJsx from 'markdown-to-jsx';
import Link from 'next/link';

interface MarkdownLinkProps {
  title: string;
  href: string;
  children: any;
}

export const MarkdownLink = ({ title, href, children }: MarkdownLinkProps) => {
  return <Link title={title} href={href} target='_blank'>{children}</Link>;
};

interface MarkdownProps {
  children: string;
  className: string;
}

export const Markdown = ({ children, className }: MarkdownProps) => {
  return <MarkdownToJsx className={className} options={{
    overrides: {
      a: {
        component: MarkdownLink,
      }
    }
  }}>
    {children}
  </MarkdownToJsx>;
};
