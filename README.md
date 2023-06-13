# My personal website <3

This is the new 2023 version built with [Next 13](https://nextjs.org/) (with the new App Router feature)
and [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

![Website preview](https://raw.githubusercontent.com/danielzotti/new.danielzotti.it/master/public/static/images/brand/danielzotti-website-preview.png)

## DISCLAIMER

The website itself (the NextJs code) is really basic, and I haven't spent too much time on that. I write code better
than that, I swear! 😇

I also use this website for testing and trying new technologies (which can be found in the next chapter).

***Please don't try to hack my website ❤️***

## The technologies I've used:

- NextJs 13.3 (with `app` folder)
- Docker
- GitLab CI
- SSR
- PWA
- PWA offline (in beta, due to `app` folder bug)
- SSG (in beta, due to `app` folder bug)

# TL;DR

- Local development (**without docker**) with "classic" NextJS CLI
    - `npm run dev` aka `next dev`
- Local development: one every change to code, it refreshes
    - `npm run docker:start:local`

## Steps to create & run the project

- `nvm use`: it uses the version written in `.nvmrc` file (v18)
- `npx create-next-app@latest`
- `npm install` (see `package.jon` for dependencies)
- `npm run dev`
- Open [http://localhost:3001](http://localhost:3001)

## Roadmap

- [x] Home page
    - [x] Introduction
    - [x] Social links
    - [x] CV download
- [x] Sections
    - [x] Blog
    - [x] Projects
    - [x] Selected open source repo from GitHub
- [x] Font Awesome Icons
- [x] PWA (workaround)
- [x] 404 page (workaround using `pages` folder since `app` folder doesn't support it yet)
- [x] Cookie manager
- [x] Google Analytics
- [x] CSS variables instead of SCSS
- [x] Theme dark/light
- [x] Syntax Highlight for code
- [x] Sort articles by date ASC
- [ ] Transparent navbar on top in Home Page
- [ ] Improve Open source section with preview
- [ ] Filter articles by category
- [ ] Offline status
- [ ] New UI graphic

## Thanks to

### Dependencies

- [gray-matter](https://github.com/jonschlinkert/gray-matter): read metadata from a Markdown file
- [markdown-to-jsx](https://www.npmjs.com/package/markdown-to-jsx): convert Markdown to HTML
- [octokit](https://github.com/octokit): SDK for GitHub API
- [FontAwesome](https://fontawesome.com/): Icon fonts
- [qrcode-svg](https://github.com/papnkukn/qrcode-svg): QR Code generator
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter): Code Syntax Highlighter

### Blog articles

- [Analytics with Next.js 13](https://dev.to/sdorra/analytics-with-nextjs-13-1hhi)
- [How to setup Google Tag Manager in a Next 13 App Router website](https://dev.to/valse/how-to-setup-google-tag-manager-in-a-next-13-app-router-website-248p)
- [Using :root in CSS modules](https://github.com/vercel/next.js/discussions/17089)
