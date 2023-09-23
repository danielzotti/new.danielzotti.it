'use client';

import MarkdownToJsx from 'markdown-to-jsx';
import Link from 'next/link';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 as codeStyle } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface MarkdownLinkProps {
  title: string;
  href: string;
  children: any;
}

export const MarkdownLink = ({ title, href, children }: MarkdownLinkProps) => {
  return <Link title={title} href={href} target='_blank'>{children}</Link>;
};

export const Code = ({ className, children }) => {
  const language = className?.replace('lang-', '') || 'none';

  if (language === 'none') {
    return <code>{children}</code>;
  }

  return (
    <SyntaxHighlighter language={language === 'html' ? 'htmlbars' : language} style={codeStyle}>
      {children}
    </SyntaxHighlighter>
  );
};

interface MarkdownProps {
  children: string;
  className: string;
}

export const Markdown = ({ children, className }: MarkdownProps) => {
  return <MarkdownToJsx className={className} options={{
    overrides: {
      a: {
        component: MarkdownLink
      },
      code: {
        component: Code
      }
    }
  }}>
    {children}
  </MarkdownToJsx>;
};
