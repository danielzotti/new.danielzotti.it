export type GitHubSelectedRepo = {
  slug: string;
  name: string;
  humanName?: string;
};

export const githubSelectedRepos: GitHubSelectedRepo[] = [
  {
    slug: "new-danielzotti-it",
    name: "new.danielzotti.it",
    humanName: "www.danielzotti.it",
  },
  {
    slug: "fake-3d-website",
    name: "fake-3d-website-next",
    humanName: "Fake 3D Website",
  },
  {
    slug: "slide-roulette",
    name: "slide-roulette",
    humanName: "Slide Roulette",
  },
  {
    slug: "me-danielzotti-it",
    name: "me.danielzotti.it",
    humanName: "My (old) Personal Website",
  },
  {
    slug: "chrome-notepad",
    name: "chrome-notepad",
    humanName: "Chrome Notepad",
  },
  {
    slug: "danielzotti-telegram-bot",
    name: "danielzotti-telegram-bot",
    humanName: "Daniel Zotti Telegram Bot",
  },
  {
    slug: "ng-filemanager",
    name: "ng-filemanager",
  },
  {
    slug: "ng-textarea-autoresize",
    name: "ng-textarea-autoresize",
  },
  {
    slug: "spacecar",
    name: "spacecar",
  },
];
