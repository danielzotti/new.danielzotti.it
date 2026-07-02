/* eslint-disable prettier/prettier */
export type OpenSourceRepo = {
  slug: string;
  name: string;
  description: string | null;
  homepage: string | null;
  html_url: string;
  created_at: string | null;
  updated_at: string | null;
  topics: string[];
  readme: string | null;
};

export const openSourceRepos: OpenSourceRepo[] = [
  {
    "slug": "new-danielzotti-it",
    "name": "new.danielzotti.it",
    "description": "My personal website (version 2023) with curriculum, skills, portfolio and blog. Developed in NextJS 14, PWA and SSG + Docker + GitLab CI",
    "homepage": "https://www.danielzotti.it",
    "html_url": "https://github.com/danielzotti/new.danielzotti.it",
    "created_at": "2023-05-04T15:03:19Z",
    "updated_at": "2026-06-10T15:53:35Z",
    "topics": [
      "blog",
      "gitlab-ci",
      "nextjs",
      "pwa",
      "react",
      "scss",
      "ssg",
      "ssr",
      "typescript",
      "website"
    ],
    "readme": "# My personal website <3\n\nThis is the new 2023 version built with [~~NextJs 14~~ NextJs 16](https://nextjs.org/)\nand [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).\n\n![Website preview](https://raw.githubusercontent.com/danielzotti/new.danielzotti.it/master/public/static/images/brand/danielzotti-website-preview.png)\n\n## DISCLAIMER\n\nThe website itself (the NextJs code) is really basic, and I haven't spent too much time on that. I write code better\nthan that, I swear! 😇\n\nI also use this website for testing and trying new technologies (which can be found in the next chapter).\n\n**_Please don't try to hack my website ❤️_**\n\n## The technologies I've used:\n\n- NextJs 16 (React 19) ~~NextJs 15~~ ~~NextJs 14~~ ~~NextJs 13.3 (with `app` folder)~~\n- Docker\n- GitLab CI\n- SSR\n- SSG\n- PWA (+ offline mode)\n\n## TL;DR\n\n- Local development (**without docker**) with \"classic\" NextJS CLI\n  - `npm run dev` aka `next dev`\n- Local development: on every change to code, it refreshes\n  - `npm run docker:start:local`\n\n## Steps to create & run the project\n\n- `nvm use`: it uses the version written in `.nvmrc` file (v20.0.0)\n- `npx create-next-app@latest`\n- `npm install` (see `package.json` for dependencies)\n- `npm run dev`\n- Open [http://localhost:3087](http://localhost:3087)\n\n## Roadmap\n\n- [x] Home page\n  - [x] Introduction\n  - [x] Social links\n  - [x] CV download\n- [x] Sections\n  - [x] Blog\n  - [x] Projects\n  - [x] Selected open source repo from GitHub\n- [x] Font Awesome Icons\n- [x] PWA (only if the user install the PWA)\n- [x] 404 page ~~(workaround using `pages` folder since `app` folder doesn't support it yet)~~\n- [x] Cookie manager\n- [x] Google Analytics\n- [x] CSS variables instead of SCSS\n- [x] Theme dark/light\n- [x] Syntax Highlight for code\n- [x] Sort articles by date ASC\n- [x] Offline status (with desaturated colors and images)\n- [ ] Improve accessibility\n- [ ] Transparent navbar on top in Home Page\n- [ ] Improve Open source section with preview in teasers\n- [ ] Filter articles by category\n- [ ] New UI graphic\n\n## Thanks to\n\n### Dependencies\n\n- [gray-matter](https://github.com/jonschlinkert/gray-matter): read metadata from a Markdown file\n- [markdown-to-jsx](https://www.npmjs.com/package/markdown-to-jsx): convert Markdown to HTML\n- [octokit](https://github.com/octokit): SDK for GitHub API\n- [FontAwesome](https://fontawesome.com/): Icon fonts\n- [qrcode-svg](https://github.com/papnkukn/qrcode-svg): QR Code generator\n- [react-syntax-highlighter](https://github.com/react-syntax-highlighter): Code Syntax Highlighter\n- [next-pwa](https://github.com/shadowwalker/next-pwa): PWA plugin based\n  on [workbox](https://developer.chrome.com/docs/workbox/)\n\n### Blog articles\n\n- [Analytics with Next.js 13](https://dev.to/sdorra/analytics-with-nextjs-13-1hhi)\n- [How to setup Google Tag Manager in a Next 13 App Router website](https://dev.to/valse/how-to-setup-google-tag-manager-in-a-next-13-app-router-website-248p)\n- [Using :root in CSS modules](https://github.com/vercel/next.js/discussions/17089)\n"
  },
  {
    "slug": "fake-3d-website",
    "name": "fake-3d-website-next",
    "description": "A fake 3D simulation using webcam or mouse move and mouse wheel",
    "homepage": "https://danielzotti.github.io/fake-3d-website-next/",
    "html_url": "https://github.com/danielzotti/fake-3d-website-next",
    "created_at": "2024-03-17T15:08:30Z",
    "updated_at": "2024-05-15T15:55:05Z",
    "topics": [],
    "readme": "# Fake 3D Website\n\nA 3D mode for a website using webcam and face detection\n\n## Dependencies\n\n- NextJs 14\n- TensorflowJs\n- MediaPipe Face Detection\n\n## Notes\n\n- HTTPS on local environment: https://mswjs.io/docs/recipes/using-local-https/#trust-certificate-on-browser-level\n- Service Worker\n    - Chrome --> Application Tab --> Service Workers --> Update on reload [checked!]\n    - Chrome --> Network Tab --> Disable cache [checked!]\n\n## Project idea\n\n- Create a hide & seek website where the user can enable 3D mode using the webcam in order to find hidden things\n    - A famous 3D painting?\n- Alternative point of views:\n    - Far away (frame?)\n    - Very close (Keyhole?)\n- Recreate famous paintings in 3D\n\n## Project features\n\n- Enable webcam\n    - Read webcam stream\n    - Show video on page\n    - Once the video is loaded, show \"Enable 3D\" button\n- Enable 3D\n    - Load the model\n    - Start face detection\n    - Read right eye position\n    - Calculate distance from the center\n    - Apply translation coords to child elements (Box3D)\n- Disable 3D\n    - Stop face detection\n    - Stop video\n    - Position content in the basic position (0,0)\n- Disable webcam\n    - Hide video & Reset Stream\n- Enable mouse\n    - Listen to mouse move events (change x and y position)\n    - Listen to mouse wheel event (zoom in/out)\n- Disable mouse\n  - Remove listeners (mouse move, mouse wheel)\n\n## TODO\n\n- [x] Add local mediapipe detector solutionPath\n- [x] Cache model using Service Worker (do not download model every time)\n- [x] Add React Context in order to simplify the set of x and y point\n- [x] Add/Improve depth using both eyes (it works only calculating the horizontal distance)\n- [x] Create a more graphical example (Magritte paintings)\n- [x] Add threshold/interpolation for face detection (view position buffer)\n- [x] Make z (zoom) work not just if eyes are horizontal\n- [ ] Select webcam (in case of multiple webcams)\n- [ ] Improve UI\n- [ ] Improve performance (lighter images?) \n- [ ] Create an example of a real \"standard\" website with 3D mode\n\n## Thanks to\n\n- TensorflowJs\n- MediaPipe/FaceDetection\n- [Prevent Default inside passive elements](https://www.uriports.com/blog/easy-fix-for-unable-to-preventdefault-inside-passive-event-listener/)\n- [Emoji Cursor](https://www.emojicursor.app/)\n"
  },
  {
    "slug": "slide-roulette",
    "name": "slide-roulette",
    "description": "A slide roulette app to test your improvising skills!",
    "homepage": "https://slide-roulette.danielzotti.it",
    "html_url": "https://github.com/danielzotti/slide-roulette",
    "created_at": "2024-04-26T15:59:47Z",
    "updated_at": "2026-02-25T12:20:59Z",
    "topics": [
      "game",
      "improvisation",
      "qwik",
      "slide-roulette"
    ],
    "readme": "# Slide Roulette\n\nA slide roulette app: one random topic and 3 (or more) random slides (with just an image) to test your improvising\nskills!\n\nhttps://github.com/user-attachments/assets/1f5ebb68-74ec-496f-8157-2bc0210c239a\n\n## Other contributors\n- [Marinella Mastrosimone](https://github.com/cybermarinella) (UX/UI)\n- [Massimiliano Attianese](https://github.com/MaxAttianese) (Dev)\n- [Antonio Rocco](https://github.com/AntonioRoccoGit) (Dev)\n\n## Contribution guidelines\n\n...just open a PR! 🙃 I'll be happy to review it and merge it if it's good!\n\nFirst time contributing to an open source project? See [First Contributions repo](https://firstcontributions.github.io/)\nand [How to make your first Open Source contribution](https://www.youtube.com/watch?v=Xg6C_ij99TI).\n\nSee [Slide Roulette Project](https://github.com/users/danielzotti/projects/2) for more details about next steps (WIP).\n\n### How to add a new language\n\n#### 1. Create a new TypeScript file in `src/topics` folder, called as the language code (e.g. `en.ts` for English)\n\n- The structure should be as follows:\n\n```typescript\n// src/topics/en.ts\nexport default {\n    languageCode: \"en\",\n    languageName: \"English\",\n    conjunction: \"and\",\n    one: [\"shadows\", \"trees\"],\n    two: [\"with a strange shape of clowns\", \"created to scare people\"]\n}\n```\n\n- Set the proper conjunction for the language (e.g. `and` for English, `e` for Italian, etc.)\n- Add random plural nouns in the `one` array (e.g shadows, trees, etc.)\n- Add random sentences related (or not) to the plural nouns in the `two` array\n- Please remember that different levels will compose those 2 arrays:\n    - Level 1: Randomly select one single element from `one` array\n    - Level 2: Randomly select 2 elements from `one` array and compose them with the conjunction\n    - Level 3: Starts from Level 2 but adds a random sentence from the `two` array\n\n#### 2. Import the file `src/topics/en.ts` in the `src/utils/topics.ts` file and add a switch case for that specific file\n\n```typescript\n// src/utils/topics.ts\nimport en from \"../topics/en\"; // <- IMPORT FILE\n\nswitch (lang) {\n    // ...\n    case \"en\":          // <- ADD A SWITCH CASE\n        topics = en;\n        break;\n    // ...\n}\n\n```\n\n#### 3. Add the language code in the `src/config.ts` file inside the `languages.list` array in order to show it in the language selector dropdown menu.\n\n```typescript\n// src/config.ts\nconst config = {\n    //...\n    languages: {\n        list: [\n            // ADD A NEW LANGUAGE HERE\n            {code: \"en\", name: \"English\"},\n        ],\n    },\n    // ...\n}\n\n```\n\n## Thanks to\n\n- [Qwik](https://qwik.dev/)\n- [Vercel](https://vercel.com/)\n- [ChatGPT](https://chat.openai.com/) for the topics generation\n- [Unsplash](https://unsplash.com/) for the random images\n- [Lorem Picsum](https://picsum.photos/) for the random images (if Unsplash is down)\n- [Unsample](https://unsample.net/) for the local random images (if Unsplash/Lorem Picsum service is down)\n- [Bing Image Generation](https://www.bing.com/images) for the logo\n- [Play Speechless by Carmelo Ventimiglia](https://carmeloventimiglia.dev/play-speechless/) for the idea\n- [Canvas Confetti](https://github.com/catdad/canvas-confetti) for the confetti effect\n- [Fancy Border Radius Generator](https://9elements.github.io/fancy-border-radius) for the Jeff Goldblum Image's border \n\n## Notes\n\nError: ` [PLUGIN_ERROR]: Invalid module \"@qwik-city-plan\" is not a valid package name imported from /Users/daniel/Projects/github/slide-roulette/node_modules/@builder.io/qwik-city/index.qwik.mjs`\n\n- See https://github.com/QwikDev/qwik/issues/6024#issuecomment-2029467547\n- TLDR: move `dependencies` to `devDependencies`\n\n## Custom topic\nJust add a `&customTopic=My custom topic` at the end of the URL created after clicking \"Setup done\". \n\ne.g. https://slide-roulette.danielzotti.it/slides/?language=it&level=1&slidesCount=5&orientation=landscape&customTopic=Cissone\n\n## TODO\n\n- [ ] Add dark/light theme switcher button\n- [ ] Pages and slides transitions\n- [ ] Offline mode (PWA)\n- [ ] Custom topics (textarea + local storage? remote url?)\n"
  },
  {
    "slug": "me-danielzotti-it",
    "name": "me.danielzotti.it",
    "description": "My personal website with curriculum, skills and portfolio. Developed in Angular, PWA and SSR + Docker + GitLab CI + Github Actions. NB: username: guest, password: guest",
    "homepage": "http://old.danielzotti.it",
    "html_url": "https://github.com/danielzotti/me.danielzotti.it",
    "created_at": "2020-09-25T10:29:41Z",
    "updated_at": "2023-05-13T18:44:48Z",
    "topics": [
      "angular",
      "angular-universal",
      "docker",
      "github-actions",
      "gitlab-ci",
      "pwa",
      "scss",
      "typescript"
    ],
    "readme": "# My (OLD) personal website <3\n\n> If you want to browse the repo of the NEW website go [here](https://github.com/danielzotti/new.danielzotti.it).\n\n## NB: In order to visit the old website on [old.danielzotti.it](http://old.danielzotti.it) use the following credentials:\n- username: **guest** \n- password: **guest**\n\n___\n\nInspired by [this article](https://dev.to/victoria/be-brave-and-build-in-public-5afg) written by Victoria Drake, I decided to share my personal website's code.\n\n![Website preview](https://raw.githubusercontent.com/danielzotti/me.danielzotti.it/master/daniel-zotti-website-preview.png)\n\n## DISCLAIMER\n\nThe website itself (the Angular code) is really stupid, and I haven't spent too much time on that. I develop Angular code better than that, I swear! :D\n\nI also use this website for testing and trying new technologies (which can be found in the next chapter).\n\n***Please don't try to hack my website <3***\n\n## The technologies I've used:\n\n- Angular 11\n- SSR\n- PWA + offline status detection\n- Docker\n- GitHub Actions\n- GitLab CI\n\n# TL;DR\n\n- Local development (**without docker**) with \"classic\" Angular CLI\n  - `npm run start` aka `ng serve`\n- Local development: one every change to code, it refreshes\n  - `npm run docker:start:local`\n\n## Configuration files\n\n### nginx\n\nAlways return the index.html file (for SPA): `nginx-custom.conf`\n\n```\nserver {\n  listen 80;\n  location / {\n    root /usr/share/nginx/html;\n    index index.html index.htm;\n    try_files $uri $uri/ /index.html =404;\n  }\n}\n```\n\n### Docker\n\n#### `.dockerignore`\n\n```\n.env\n.git\n.gitignore\n.github\ndist\nnode_modules\n```\n\n#### `Dockerfile.local` (local development use)\n\n```\nFROM node:14.12.0-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nRUN npm install -g @angular/cli\nCOPY . .\nEXPOSE 4201\nCMD ng serve --host 0.0.0.0 --port 4201\n# NB: --disableHostCheck option doesn't work!\n```\n\n#### `Dockerfile` (deploy on server)\n\n```\n# Stage 0, \"build-stage\", based on Node.js, to build and compile Angular\nFROM node:14.12.0-alpine as build-stage\nWORKDIR app\nCOPY package*.json /app/\nRUN npm install\nRUN npm install -g @angular/cli @angular-devkit/build-angular\nCOPY . .\nARG configuration=production\nRUN npm run build -- --outputPath=/app/dist --configuration=${configuration}\n\n# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx\nFROM nginx:1.19.2-alpine\nCOPY --from=build-stage /app/dist/ /usr/share/nginx/html/\nCOPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf\n```\n\n#### `docker-compose.local.yml`\n\n```\nversion: '3'\n\nservices:\n  angular:\n    build:\n      context: .\n      dockerfile: Dockerfile.local\n    container_name: danielzottit_local\n    image: dz/danielzotti_local\n    ports:\n      - \"4201:4201\"\n    restart: unless-stopped\n    volumes:\n      - .:/app\n      - /app/node_modules\n```\n\n#### `docker-compose.deploy.yml`\n\n```\nversion: '3'\n\nservices:\n  angular:\n    build:\n      context: .\n      dockerfile: Dockerfile\n      args:\n        - configuration=${CONFIGURATION}\n    container_name: danielzotti\n    image: dz/danielzotti\n    ports:\n      - \"${PORT}:80\"\n    restart: unless-stopped\n```\n\n## Docker `permission denied` error\n\nFor Linux console:\n\n```\nsudo groupadd docker\nsudo usermod -aG docker ${USER}\nnewgrp docker\nsu - ${USER}\n```\n\n# Easter Egg\n\nThere is an Easter egg that you can discover simply reading the code or browsing the website at a certain time (08:\n30-09:00, 11:00-11:20, 16:00-16:20).\n\n# Thanks to\n\n- [Angular in Docker with Nginx, supporting configurations / environments, built with multi-stage Docker builds and testing with Chrome Headless](https://medium.com/@tiangolo/angular-in-docker-with-nginx-supporting-environments-built-with-multi-stage-docker-builds-bb9f1724e984)\n- [Angular — Local Development With Docker-Compose](https://medium.com/bb-tutorials-and-thoughts/angular-local-development-with-docker-compose-13719b998e424)\n- [Docker ARG, ENV and .env - a Complete Guide](https://vsupalov.com/docker-arg-env-variable-guide)\n- [Create a MEAN APP with Angular 7, Nginx and Docker Compose](https://www.linkedin.com/pulse/create-mean-app-angular-7-nginx-docker-compose-radhouen-assakra/)\n"
  },
  {
    "slug": "chrome-notepad",
    "name": "chrome-notepad",
    "description": "Basic notepad chrome extension ",
    "homepage": "",
    "html_url": "https://github.com/danielzotti/chrome-notepad",
    "created_at": "2020-02-29T12:48:09Z",
    "updated_at": "2025-01-26T17:57:20Z",
    "topics": [
      "chrome-extension",
      "javascript",
      "react"
    ],
    "readme": "# Chrome Notepad extension\nA simple notepad with bold, italic and underline to be used as a Chrome extension\n\n![Chrome Notepad preview](https://raw.githubusercontent.com/danielzotti/chrome-notepad/v1.3/others/chrome-notepad-preview_1280x800.png)\n\n## Chrome web store URL\nhttps://chrome.google.com/webstore/detail/chrome-notepad/mfibfcbcjkpgcapmdfihigbnfidibbem\n"
  },
  {
    "slug": "danielzotti-telegram-bot",
    "name": "danielzotti-telegram-bot",
    "description": "A Telegram bot that manages events, jokes, members and more",
    "homepage": "",
    "html_url": "https://github.com/danielzotti/danielzotti-telegram-bot",
    "created_at": "2022-11-24T15:21:10Z",
    "updated_at": "2024-12-30T22:47:22Z",
    "topics": [
      "bot",
      "nodejs",
      "telegram",
      "telegram-bot",
      "typescript"
    ],
    "readme": "# Daniel Zotti Telegram bot\n\nA Telegram bot designed to be included in Telegram groups. The bot expose these features:\n\n1. Jokes\n2. Welcome/Goodbye messages\n\n## Bot creation (already done, but it's here as a reminder)\n\n- `/setname` @DanielZottiBot\n- `/setdescription` A Telegram bot that manages events, jokes, member and more\n- `/setuserpic`: `/assets/profile.jpg`\n\n## Bot Commands\n\n- `/start` it shows a message when the bot is started\n- `/help` it shows info about the bot\n- `/jokes` it shows how many jokes are in the DB\n- `/random_joke` it sends a random joke\n\n## Features\n\n### 1. Jokes\n\nSome examples to trigger a joke:\n\n- `What would Daniel say?` (keyword: \"Daniel\")\n- `I need a joke!` (keyword: \"joke\")\n\n#### How to add jokes\n\nIn order to add (or edit) a joke, you have to edit the `/assets/jokes.json` file.\n\nThe JSON file is an array of objects having this structure:\n\n- `date` (optional): data with following format `yyyy-mm-dd`.\n- `event` (optional): info about the place or the occasion the joke has been stated.\n- `sentences (required)`: a list of sentences, structured this way:\n  - `name` (optional) name of the person\n  - `text` (required): the actual sentence\n\n##### Example\n\n```json\n{\n  \"date\": \"2021-10-05\",\n  \"event\": \"In pub with friends\",\n  \"sentences\": [\n    {\n      \"name\": \"Daniel\",\n      \"text\": \"Why do programmers keep pressing the F5 button??\"\n    },\n    {\n      \"name\": \"Friends\",\n      \"text\": \"No, not again.....\"\n    },\n    {\n      \"name\": \"Daniel\",\n      \"text\": \"Because it’s <i>refreshing</i>.\"\n    }\n  ]\n}\n```\n\n### 2. Welcome/Goodbye messages\n\n- One or more members are added to the group:\n  `@danielzotti has just added a member to the group! Let's welcome @mario aka Mario Rossi`\n- A member is removed from the group (or leave):\n  `Oh no! @mario aka Mario Rossi has left the group!`\n\n\n## Installation and how to use\n\n- `nvm use` to set the right node version\n- `npm install`\n- `npm run start` to run it locally\n- `npm run dev` to run it locally with nodemon\n\n## Deploy\n\nOn Daniel's server through GitHub Actions\n\n## Add bot to a group\nIn order to make the \"send joke triggered by keyword\" work, the Daniel Zotti bot needs to have access to the message of a group.\nThe *group privacy* has to be turned *off*: https://stackoverflow.com/questions/50204633/allow-bot-to-access-telegram-group-messages\n\n## Useful links\n- https://medium.com/@g.c.dassanayake/deploying-a-nodejs-application-using-github-actions-e5f4bde7b21b\n\n## GitHub Actions\n\n### Add GitHub runner\nAdd runner on private linux server:\n- Add self-hosted runner to GitHub project and install it: https://docs.github.com/en/actions/hosting-your-own-runners/adding-self-hosted-runners\n- Create docker group: `sudo groupadd docker`\n- Create a dedicated user for the runner: `sudo useradd github-runner`\n- Add it to docker group: `sudo usermod -aG docker github-runner` \n- Move to github-runner home folder: `cd /home/github-runner`\n\nMore info: https://docs.github.com/en/actions/hosting-your-own-runners/about-self-hosted-runners\n\nRunning as a service: https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/configuring-the-self-hosted-runner-application-as-a-service\n\n### Create workflow\nCreate a file in `.github/workflows/main.yml`\n\n"
  },
  {
    "slug": "ng-filemanager",
    "name": "ng-filemanager",
    "description": "A simple but completely customizable file manager for angular (IE version >= 10)",
    "homepage": "https://www.npmjs.com/package/@danielzotti/ng-filemanager",
    "html_url": "https://github.com/danielzotti/ng-filemanager",
    "created_at": "2019-03-11T15:27:13Z",
    "updated_at": "2023-05-03T08:22:32Z",
    "topics": [
      "angular",
      "filemanager",
      "typescript"
    ],
    "readme": "# @danielzotti/ng-filemanager\n\nFully customizable multiple file input for Angular with >= IE10 browser support (remember to activate polyfills in `polyfills.ts`!)\n\n- [Live demo](https://danielzotti.github.io/ng-filemanager)\n\n- [NPM](https://www.npmjs.com/package/@danielzotti/ng-filemanager)\n\n- Try it yourself:\n  - Run `npm install`\n  - Run `npm run start` for a dev server\n  - Navigate to `http://localhost:4200/`\n\n# How to use it\n\n## Install the package\n\nRun `npm i @danielzotti/ng-filemanager --save`\n\n## Import the module\n\nImport `NgFilemanagerModule` from `@danielzotti/ng-filemanager` in `app.module.ts`\n\n```typescript\nimport { BrowserModule } from \"@angular/platform-browser\";\nimport { NgModule } from \"@angular/core\";\nimport { FormsModule } from \"@angular/forms\";\n\nimport { NgFilemanagerModule } from \"@danielzotti/ng-filemanager\";\n\nimport { AppComponent } from \"./app.component\";\n\n@NgModule({\n  declarations: [AppComponent],\n  imports: [BrowserModule, FormsModule, NgFilemanagerModule],\n  providers: [],\n  bootstrap: [AppComponent]\n})\nexport class AppModule {}\n```\n\n## Use it in a component\n\n### Basic template\n- Easy to use\n- No validation or file size/number limitation\n\n```html\n<form #form=\"ngForm\" novalidate (submit)=\"onSubmitFiles(form)\">\n  <ng-filemanager [(ngModel)]=\"files\" name=\"files\"></ng-filemanager>\n  <button>Submit</button>\n</form>\n```\n\n### Completely customizable UI and validation\n\n#### validation\n\n- min file number `min`\n- max file number `max`\n- max total file size `maxFileSize`\n- disabled input when uploading `isLoading`\n- custom errors [`exactFileNumber`,`minFileNumber`,`maxFileNumber`,`minFileSize`]\n\n#### UI\n\n- browse file custom text `selectText`\n- browse file custom icon `selectIcon`\n- delete all files custom text `deleteAllText`\n- delete all files custom icon `deleteAllIcon`\n- delete single file custom icom `deleteIcon`\n\n```html\n<form #form=\"ngForm\" novalidate (submit)=\"onSubmitFiles(form)\">\n  <ng-filemanager\n    [(ngModel)]=\"files\"\n    name=\"files\"\n    [min]=\"2\"\n    [max]=\"5\"\n    [maxFileSize]=\"1024000\"\n    #filesRef=\"ngModel\"\n    [isLoading]=\"isUploadingFiles\"\n  >\n    <ng-template #selectText>\n      <span>Browse files</span>\n    </ng-template>\n    <ng-template #selectIcon> <i class=\"fa fa-files-o\"></i>&nbsp; </ng-template>\n    <ng-template #deleteAllIcon> <i class=\"fa fa-trash\"></i>&nbsp; </ng-template>\n    <ng-template #deleteAllText>\n      <span>Delete all files</span>\n    </ng-template>\n    <ng-template #deleteIcon>\n      <i class=\"fa fa-trash\"></i>\n    </ng-template>\n  </ng-filemanager>\n\n  <div class=\"error-message\" *ngIf=\"filesRef.dirty && filesRef.errors?.exactFileNumber\">\n    <span>you must upload a file</span>\n  </div>\n  <div class=\"error-message\" *ngIf=\"filesRef.dirty && filesRef.errors?.minFileNumber\">\n    <span>you must upload at least 2 files</span>\n  </div>\n  <div class=\"error-message\" *ngIf=\"filesRef.dirty && filesRef.errors?.maxFileNumber\">\n    <span>you cannot upload more than 5 files</span>\n  </div>\n  <div class=\"error-message\" *ngIf=\"filesRef.dirty && filesRef.errors?.maxFileSize\">\n    <span>you cannot upload more than 1MB</span>\n  </div>\n\n  <div class=\"buttons\">\n    <button type=\"submit\" class=\"default-button\" [disabled]=\"form.invalid || isUploadingFiles\">\n      Upload\n      <span *ngIf=\"isUploadingFiles\">\n        (loading...)\n      </span>\n    </button>\n    <button type=\"reset\" class=\"default-button\" [disabled]=\"isUploadingFiles\" *ngIf=\"form.touched\">\n      Reset\n    </button>\n  </div>\n</form>\n```\n\n#### Style\n\n```scss\n.ng-filemanager__container {\n  // the ng-filemanager input container\n}\n\n.ng-filemanager__input {\n  // the real input file (should be hidden)\n  // \"display: none\" already set in ng-filemanager component css\n}\n\n.ng-filemanager__buttons-container {\n  // \"browse\" and \"delete all\" container\n}\n\n.ng-filemanager__button {\n  // \"browse\" and \"delete all\" button\n}\n\n.ng-filemanager__button__icon {\n  // \"browse\" and \"delete all\" button icon\n}\n\n.ng-filemanager__file-list {\n  // container of all uploaded files\n}\n\n.ng-filemanager__file {\n  // single file item\n}\n\n.ng-filemanager__file__button {\n  // single file \"delete\" button\n}\n\n.ng-filemanager__file__button__icon {\n  // single file button icon\n}\n```\n\n### How to manage file upload in typescript component\n\n```typescript\nonSubmitFiles(form: NgForm) {\n    // manage form validation\n    if (form.invalid) {\n      alert('Form invalid! See console log for details');\n      console.log('Form invalid', form);\n      return false;\n    }\n    this.isUploadingFiles = true;\n\n    const formData: FormData = new FormData();\n\n    const files = form.value.files;\n\n    // add other form input data to formData\n    formData.append('payload', JSON.stringify({ customJsonProperty: 'customValue' }));\n\n    // add every single file to formData\n    if (typeof files !== 'undefined' && files != null && files.length > 0) {\n      for (let i = 0; i < files.length; i++) {\n        formData.append('file' + i, files[i].browserFile);\n      }\n    }\n    const fakeUrl = 'http://www.mocky.io/v2/5c87748e320000d9123bd1fb';\n    this.http.post(fakeUrl, formData).subscribe(res => {\n      this.isUploadingFiles = false;\n      alert('Done! See network details in developer console (Header of https://www.mocky.io/v2/5c87748e320000d9123bd1fb)');\n      form.reset();\n    });\n  }\n```\n"
  },
  {
    "slug": "ng-textarea-autoresize",
    "name": "ng-textarea-autoresize",
    "description": "A special angular directive which autoresizes a textarea based on the content",
    "homepage": "https://www.npmjs.com/package/@danielzotti/ng-textarea-autoresize",
    "html_url": "https://github.com/danielzotti/ng-textarea-autoresize",
    "created_at": "2019-07-24T11:01:17Z",
    "updated_at": "2023-05-03T08:22:37Z",
    "topics": [
      "angular",
      "autoresize",
      "textarea",
      "typescript"
    ],
    "readme": "# @danielzotti/ng-textarea-autoresize\n\nIt's a special angular directive that autoresize a textarea based on the content.\nAutoresize is triggered on:\n\n- textarea content change\n- model change\n- window resize\n\n## Get started\n\n- [Live demo](https://danielzotti.github.io/ng-textarea-autoresize)\n\n- [NPM](https://www.npmjs.com/package/@danielzotti/ng-textarea-autoresize)\n\n- Try it yourself:\n  - Run `npm install`\n  - Run `npm run start` for a dev server\n  - Navigate to `http://localhost:4200/`\n\n## How to use it\n\n### Install the package\n\nRun `npm i @danielzotti/ng-textarea-autoresize --save`\n\n### Import the module\n\nImport `NgTextareaAutoresizeModule` from `@danielzotti/ng-textarea-autoresize` in `app.module.ts`\n\n```typescript\nimport { BrowserModule } from \"@angular/platform-browser\";\nimport { NgModule } from \"@angular/core\";\n\nimport { NgTextareaAutoresizeModule } from \"@danielzotti/ng-textarea-autoresize\";\n\nimport { AppComponent } from \"./app.component\";\n\n@NgModule({\n  declarations: [AppComponent],\n  imports: [BrowserModule, NgFilemanagerModule],\n  providers: [],\n  bootstrap: [AppComponent]\n})\nexport class AppModule {}\n```\n\n### Use it in a component\n\n#### Basic template\n\n- Easy to use\n\n```html\n<textarea autoresize></textarea>\n```\n\n#### Max height\n\n- Set max height in pixels on `autoresizeMaxHeight` attribute\n\n```html\n<textarea autoresize autoresizeMaxHeight=\"150\"></textarea>\n```\n\n#### Bind to model\n\n- Bind textarea content to a variable on `autoresize` attribute\n- Bind textarea max height to a variable on `autoresizeMaxHeight` attribute\n\n```html\n<textarea [autoresize]=\"text\" [autoresizeMaxHeight]=\"maxHeight\"></textarea>\n```\n\n```typescript\nimport { Component } from \"@angular/core\";\n\n@Component({\n  selector: \"app-root\",\n  templateUrl: \"./app.component.html\",\n  styleUrls: [\"./app.component.scss\"]\n})\nexport class AppComponent {\n  maxHeight = 150; // pixels\n  text = \"This is the text for the textarea!\";\n}\n```\n"
  },
  {
    "slug": "spacecar",
    "name": "spacecar",
    "description": "A videogame written in assembly language for an exam at University in 2008",
    "homepage": null,
    "html_url": "https://github.com/danielzotti/spacecar",
    "created_at": "2022-04-02T21:46:03Z",
    "updated_at": "2022-04-02T23:31:33Z",
    "topics": [],
    "readme": "# SPACECAR\n\nA DOS videogame written in assembly language. I developed it for an exam at University in 2008.\n\n![Spacer videogame in action](https://raw.githubusercontent.com/danielzotti/spacecar/master/images/pause.png)\n\n## Demo\n\nHere you have a [demo video](https://youtu.be/O3vanqQIQrU) on YouTube\n\n## Commands\n\n- `Enter`: start\n- `P`: pause\n- `ESC`: Exit game\n- `Arrow left/right`: move left/right\n- `Arrow up/down`: change level (increase/decrease speed)\n\n## Install dosbox\n\n- Linux: `sudo apt install dosbox`\n- Windows & Mac: https://www.dosbox.com/download.php?main=1\n- Download **MASM** suite for dosbox (please, search it on Google)\n\n## Preparation\n\n- Open **dosbox**\n- Prepare a folder containing `MASM`, `LINK` and your `SPACECAR.ASM` files\n- Mount the folder on **C:** drive: `mount c /home/daniel/dosbox/8086`\n\n## Compile & Run\n\n- `MASM SPACECAR.ASM`: it creates the object file\n- `LINK SPACECAR.OBJ`: it create the EXE file\n- `SPACECAR.EXE`: it runs the videogame\n\n## Useful DOS commands\n\n- `KEYB IT`: change keyboard layout\n\n## Virtualbox version\n\n- Install `VirtualBox`\n- Install `MS-DOS 6.22`\n- Install `MASM 6.11`\n- Install `LINK`\n"
  }
];
