import path from 'path';

const baseUrl = 'https://www.danielzotti.it';

export const config = {
  baseUrl,
  title: 'Daniel Zotti | Creative Web developer',
  pageTitle: (title: string) => `${title} | Daniel Zotti`,
  blogPageTitle: (title: string = 'Blog') => `${title} | Daniel Zotti's blog`,
  openSourcePageTitle: (title: string = 'Open Source') => `${title} | Daniel Zotti's open source project`,
  description:
    'Daniel Zotti is a creative computer engineer, professor and a web developer with more than 10 years of experience in creating tailor made software.',
  twitterId: '@daniel_zotti',
  websiteImage: {
    url: `${baseUrl}/static/images/brand/danielzotti.it-banner.png`,
    width: 1200,
    height: 627,
    alt: 'Daniel Zotti\'s website'
  },
  themeColor: '#1976d2',
  manifest: '/manifest.json',
  faviconUrl: '/static/icons/favicon.png',
  faviconAppleUrl: '/static/icons/favicon-apple.png',
  googleAnalyticsToken: 'G-432SY69LDS',
  cookieAccept: 'danielzotti_cookie_accept',
  cookieDate: 'danielzotti_cookie_date',
  themes: ['light', 'dark', 'os default'],
  themeLocalStorageName: 'danielzotti_theme',
  colors: {
    black: '#0f0f0f',
    blue: '#2daae1',
    gray: '#d0d0d0',
    white: '#ffffff'
  },
  urls: {
    home: '/',
    blog: '/blog',
    openSource: '/open-source',
    projects: '/projects',
    me: '/me',
    cookiePolicy: '/cookie-policy'
  },
  github: {
    user: 'danielzotti',
    token: process.env.GITHUB_ACCESS_TOKEN,
    selectedRepos: [
      'new.danielzotti.it',
      'me.danielzotti.it',
      'chrome-notepad',
      'danielzotti-telegram-bot',
      'ng-filemanager',
      'ng-textarea-autoresize',
      'spacecar'
    ]
  },
  apis: {
    baseUrl: `${baseUrl}/api`
  },
  assetsUrl: {
    cv: {
      italian: '/cv/Daniel Zotti Curriculum Italiano.pdf?v=1',
      english: '/cv/Daniel Zotti Curriculum English.pdf?v=1'
    }
  },
  imageUrls: {
    icons: '/static/images/icons',
    brand: '/static/images/brand',
    videoprofile: '/static/videoprofile'
  },
  folders: {
    articles: path.join(process.cwd(), 'src/contents/articles'),
    projects: path.join(process.cwd(), 'src/app/projects'),
    contents: path.join(process.cwd(), 'src/contents')
  },
  social: {
    facebook: {
      name: 'daniel.dada.zotti',
      url: 'https://www.facebook.com/daniel.dada.zotti'
    },
    github: {
      name: 'danielzotti',
      url: 'https://github.com/danielzotti'
    },
    gitlab: {
      name: 'danielzotti',
      url: 'https://gitlab.com/danielzotti'
    },
    instagram: {
      name: '@daniel_zotti_dev',
      url: 'https://www.instagram.com/daniel_zotti_dev'
    },
    linkedin: {
      name: 'danielzotti',
      url: 'https://www.linkedin.com/in/danielzotti/'
    },
    twitter: {
      name: '@daniel_zotti',
      url: 'https://twitter.com/daniel_zotti'
    },
    youtube: {
      name: 'danielzotti',
      url: 'https://www.youtube.com/c/danielzotti'
    }
  },
  fontUrls: [
    'https://fonts.googleapis.com/css?family=Exo:100,200,300,400,500,600,700,800,900&display=swap',
    'https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700|Roboto:100,300,400,500,700,900&display=swap'
    // 'https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&display=swap',
    // 'https://fonts.googleapis.com/icon?family=Material+Icons',
    // 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,400,1,200'
  ]
};
