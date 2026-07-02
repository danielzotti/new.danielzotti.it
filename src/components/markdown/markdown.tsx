"use client";

import MarkdownToJsx from "markdown-to-jsx";
import SyntaxHighlighter from "react-syntax-highlighter";
import codeStyle from "react-syntax-highlighter/dist/esm/styles/hljs/vs2015";

interface MarkdownLinkProps {
  title?: string;
  href?: string;
  children: any;
}

export const MarkdownLink = ({ title, href, children }: MarkdownLinkProps) => {
  if (!href) {
    return <>{children}</>;
  }

  return (
    <a href={href} rel="noreferrer" target="_blank" title={title}>
      {children}
    </a>
  );
};

export const Code = ({ className, children }) => {
  const language = className?.replace("lang-", "") || "none";

  if (language === "none") {
    return <code>{children}</code>;
  }

  return (
    <SyntaxHighlighter
      language={language === "html" ? "htmlbars" : language}
      style={codeStyle}
    >
      {children}
    </SyntaxHighlighter>
  );
};

interface MarkdownProps {
  children: string;
  className: string;
}

export const Markdown = ({ children, className }: MarkdownProps) => {
  return (
    <MarkdownToJsx
      className={className}
      options={{
        overrides: {
          a: {
            component: MarkdownLink,
          },
          code: {
            component: Code,
          },
        },
      }}
    >
      {children}
    </MarkdownToJsx>
  );
};
