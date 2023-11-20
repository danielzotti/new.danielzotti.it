---
title: Fortigames Companion App
description: How we built an app in less than 5 days with Qwik, Supabase and Vercel
date: "2023-11-20"
tags: [ "app", "typescript", "qwik", "supabase", "vercel" ]
---

# Fortigames Companion App

## How we built an app in less than 5 days with Qwik, Supabase and Vercel

September 29 was the day of the **Fortitude Group's convention**. It was a truly memorable day and I can't even describe the joy I felt finally spending time together with all the colleagues who work scattered around Italy (and whom I usually see only through a monitor).

But let's go back a bit, to two weeks earlier to be precise, when the email from HR with the official agenda for the convention arrived.

## Thursday 14th September

The desire to see each other and do something together is always huge, and after looking at the schedule, we realized that there was a **3-hour "free time" slot** with an asterisk next to it that said _"Possibility of using the pools and the volleyball, soccer and table tennis facilities"_. Within minutes after receiving the email I got a message from _Luigi_ proposing to arrange teams and matches for the respective sports.

The next day, things have already gotten out of hand and together with _Gabri_ we decide to organize something more complex:

> **the Fortigames**! A two-hour challenge between two teams that will compete simultaneously playing soccer, volleyball and table tennis.

To make the event more interesting, we decided to name both teams. After brainstorming, we opted for the symbol of **Yin and Yang** because of the classic _black and white T-shirts_. With a little more creativity, we decided on _**Tigers (Yin)**_ versus _**Dragons (Yang)**_!

> More info about [Yin and Yang / Tigers and Dragons](https://new.artsmia.org/programs/teachers-and-students/teaching-the-arts/artwork-in-focus/japanese-tiger-and-dragon)

## Tuesday 19th September

We create a form on **Google Forms** to collect participants data and at the same time, ask the HR team for the full list of convention attendees with their company info and emails.

![Google Forms](/static/images/articles/fortigames-companion-app/1-google-form.png)

That being said, you may ask, _"isn't Daniel's blog usually filled with technical posts?"_ You are right! In fact, after this preamble, I'll take you to a week before the event, specifically Friday, September 22.

## Friday 22nd September

Out of the blue, _Gabri_ comes up with the idea of developing a **convention "companion" app**, mostly focusing on the _Fortigames_ and convenient for managing the results and helping attendees figure out where to go, what to do, etc.

Initially we think it's a joke; **_making an app from scratch in less than a week, especially working in our spare time, is unthinkable_**. But then _Stefano_ joins in as well, and he proposes to use some technology never tried before, and I couldn't resist.

So we decide to develop a PWA using the following technologies:

- **Balsamiq**: for _wireframe_
- **Figma**: for the _UI_
- **Qwik**: as the main _framework_
- **Font Awesome** for _icons_
- **SCSS** structure copy-pasted from danielzotti.it website with **CSS modules**
- **Supabase**: _realtime database_ with _Google authentication_ (since every Fortitude Group employee has their own Google corporate account)
- **GitHub**: to save the _open source code_
- **Vercel**: for the _deployment_

### Project creation

On Friday night, I already started creating the project on the _**[Supabase](https://supabase.com)**_ website and installing _**[Qwik](https://qwik.builder.io/)**_, with its plugin for _Supabase_.

```shell
npm create qwik@latest

npm install @supabase/supabase-js supabase-auth-helpers-qwik
```

> [_Supabase_ integrations for _Qwik_](https://qwik.builder.io/docs/integrations/supabase)

### Google Authentication setup

Activate authentication via _Google_ from the _Fortigames_ project on the [_Supabase_ dashboard](https://supabase.com/dashboard)

![Supabase - Google OAuth Provider](/static/images/articles/fortigames-companion-app/2-supabase-google-oauth-provider.png)

set the return url for the provider

![Supabase return url](/static/images/articles/fortigames-companion-app/3-supabase-return-url.png)

and create the web app on [_Google Cloud_](https://console.cloud.google.com/apis/dashboard) (with the correct return URL)

![_Google Cloud_](/static/images/articles/fortigames-companion-app/4-google-cloud.png)

To log the user in, simply create a button that, when clicked, calls _Supabase_'s `createClient` function by setting:

- `Google` as the provider
- entering as parameters
- the project URL
- the key we find on the _Supabase_ site

_Supabase_ does the rest (it basically takes care of reading the token data from the URL and saving it to the localStorage)

```typescript jsx
// /src/components/auth/login/login.tsx

export const Login = component$(() => {
  const location = useLocation();

  const handleGoogleLogin = $(async () => {
    createClient<Database>(
      import.meta.env.PUBLIC_SUPABASE_URL || '',
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY || ''
    ).auth
      .signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: location.url.origin + config.urls.auth
        }
      });
  });

  return <Button onClick$={handleGoogleLogin}> Login with Google </Button>;
});
```

## Saturday 23rd September

We agree to meet Saturday morning at 9am to start jotting down ideas and talk about graphics and features.

### The team

- **Stefano**: Head of UX/UI Engineering
- **Gabriella**: Team Leader UX/UI
- **Daniel**: Team Leader Frontend

### App Features

- **Dashboard page**: with realtime results and schedule, countdown start/end games and location map (+ cup with winner at the end)
- **Teams page**: list of team members + filters by team and sport type
- **Games page**: results of the 3 sports + section only for referees, facilitators and admin to score and start/stop games
- **Boardgames page** (yes, those who don't want to play sports can have fun playing with boardgames!) with list of available games and some additional info
- **Info page**: rules, agenda, location, etc..
- **Profile page**: with custom icon based on team membership and links to dedicated chats on Slack for team, facilitators, boardgamers, etc...
- **Admin section**: to manage convention registrants and Fortigames participants.

### Wireframe

The very first app wireframe:

![First wireframe](/static/images/articles/fortigames-companion-app/5-first-wireframe.jpg)

### Database

After reasoning about the features, we begin from the creation of the DB directly on the _Supabase_ website. Having little time, we try to simplify the structure a bit so as to speed up the work.

![Supabase - DB schema](/static/images/articles/fortigames-companion-app/6-supabase-db-schema.png)

#### Users

List of users who can access the app.

- Personal information (first name, last name, company)
- Info about roles (admin, facilitator, referee)
- Info about games (team affiliation, game participation)
- **Email**: we use this field to associate the person's info with the user authenticated through Google

#### Agenda

The day's agenda information. Each row corresponds to a task and has a beginning and an ending time.

#### Games Results

The information about the results of the various games. Each row corresponds to the result of a specific sport (`soccer`, `volleyball`, and `table_tennis`)

#### Config

The information about the status of the games: _planned start/end time_, _actual start/end time_, a flag to manage the _paused game_ (e.g., bad weather or not plannable problems) and, of course, the name of the _winner!_

#### Layout

We didn't think about a desktop version (or at least totally responsive) so as to speed up the work. From the usual _"mobile first"_ approach, you could say that we switched to a more simple approach that I would call _"mobile only"_ 😀 (basically we put a `max-width` and handled responsive only for smartphones and tablets, without revising the page structure).

This is how the very first working version of the app looked like.

![First Layout](/static/images/articles/fortigames-companion-app/7-first-layout.png)

#### SCSS file structure

To speed up the work, we used the SCSS files from the [danielzotti.it website](https://www.danielzotti.it).

The reasons are as follows:

- **No UI frameworks** are used
- It is **modular**
- It already has **reset** styles included
- It works with **CSS variables**
- It supports **dark/light theme**
- It already contains some **basic styles**

The structure is as follows and each file has its own purpose:

- **base**: styles of basic html tags such as `h1`,..., `h6`, `p`, `a`, `ul`, `code`
- **common**: common styles used in different contexts but which are not base tags. (e.g. `.table-container` to handle overflow of tables)
- **fonts**: `@import` of the various fonts used
- **layout**: responsive styles similar to _Bootstrap_: container, breakpoint, etc...
- **reset**: reset of all basic styles
- **theme**: the variables for dark/light themes
- **variables-css**: the general and theme-independent variables: `spacing`, `html-max-width`, ...
- **variables-scss**: the SCSS variables (unfortunately `@media()` does not support css variables yet, so we had to keep the SCSS variables to use them in that context)
- **components** (folder): styles of reusable components such as buttons, icons, ...
- **mixins** (folder): reusable mixins within the application.

> [Daniel's website SCSS file structure](https://github.com/danielzotti/new.danielzotti.it/tree/github/src/scss)

Around 3pm we get to the point where:

- the layout structure is ready and supports the dark/light theme
- we are able to authenticate through Google
- we have imported the convention participant data via CSV (directly on the _Supabase_ website)
- we are able to read the data from the users table
- we have the ability to use icons conveniently thanks to FontAwesome

## Monday 25th September

### Supabase CLI

The developer experience of _Supabase_ is really nice. In addition to the well-written documentation and useful SDK, there is also a _cli_ to make life easier for developers.

To use it, just install it

```shell
npm i supabase --save-dev
```

generate a personal access token.

> [Personal Access Token](https://supabase.com/dashboard/account/tokens)

and login

```shell
supabase login
```

> [_Supabase_ login](https://supabase.com/docs/reference/cli/supabase-login)

### Supabase and TypeScript

And for those who, like me, love working with TypeScript, the _cli_ provides a feature to _automatically generate DB types_:

```shell
supabase gen types typescript --project-id {project_id} > src/types/database.types.ts
```

> [Generate _Supabase_ types](https://supabase.com/docs/reference/cli/supabase-gen-keys)

### User filter

_Supabase_ has the ability to _manage policies within the DB_, but time is short and there is no ready method for filtering authenticated users by domain, so we decide to go the easy way and _filter users client-side only_, simply checking to see if they are in the `users` table.

### Authentication session

_Supabase_ handles the authentication through Google easily, but _maintaining the session is the responsibility of the app developer_.

In fact, **reading the user's data from the `localStorage` every time causing bad performances** and, in addition, there is no way (or we didn't find it) to figure out when the JWT token is actually saved in the localStorage and can finally be read and saved in memory. Initially, we used the good old `setTimeout` of `500ms` but of course it became even _less performant_ because we had to wait for the timeout _each time we needed to read it_.

As a result, we decided to manually handle saving the data in the `localStorage`.

The flow is as follows:

- The user clicks on the `Login` button.
- He/She is sent to the classic Google Login page
- Once logged in, he is redirected to the `/auth` page that will take care of reading the token from the URL parameters
- with a call to the DB, data is read from the users table (filtered for the email with which the user has authenticated)
- if the user does not exist in the users table, an error page is shown because the user is not in the list of users authorized to use the app
- if the user exists, we enrich the information taken from the users table to the session data
- save the session data in the `localStorage`
- save the session data in the context (using the `useAuth` hook) so that we can directly use the context and not the `localStorage` as the data source (single source of truth)
- the user is eventually redirected to the home page (dashboard)

> [`/auth` page](https://github.com/danielzotti/fortigames/blob/master/src/routes/auth/index.tsx)

What happens if we reload the page (after successfully logging in)?

- We added the `useCheckSession()` hook on the layout that encapsulates all protected pages and returns the session
- `useCheckSession` internally checks if the context exists
- If the context exists, it returns it immediately
- If the context does not exist:
- it goes to check if a token exists in the `localStorage`
- if the token does not exist, the user is redirected to the login
- if the token exists, it copies the information into the context and returns the newly updated context

```typescript
// /src/hooks/useCheckSession.ts

export function useCheckSession() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const isTokenExpired = $(({ expires_at }: AuthSession) => {
    if (!expires_at) {
      return false;
    }
    return new Date() >= new Date(expires_at * 1000);
  });

  const getSessionFromLocalStorage = $(async () => {
    try {
      const tokenString = localStorage.getItem(config.jwtTokenLocalStorageName);

      if (!tokenString) {
        return null;
      }
      const token: AuthSession = JSON.parse(tokenString);
      if (await isTokenExpired(token)) {
        return null;
      }
      return token;
    } catch (e) {
      return null;
    }
  });

  useVisibleTask$(async () => {
    if (auth.value) {
      return;
    }
    const token = await getSessionFromLocalStorage();
    if (!token) {
      navigate(config.urls.login);
      return;
    }
    auth.value = token;
  });

  return auth;
}
```

> [`useAuth`](https://github.com/danielzotti/fortigames/blob/master/src/hooks/useAuth.ts) and [`useCheckSession`](https://github.com/danielzotti/fortigames/blob/master/src/hooks/useCheckSession.ts)

**NB:** One thing that is not immediate to understand about _Qwik_ at first is that **_code can be executed either client or server side_** (based on different logics).. In our specific case, we needed to execute the client-side check (where the JWT token session persists) and thus we used `useVisibleTask$` to make sure that the client-side code was executed, after the first rendering of the component.

In fact, the `useVisibleTask$()` is similar to `useTask$()` but it only runs on the browser and after initial rendering.

> [`useVisibleTask$`](https://qwik.builder.io/docs/components/tasks/#usevisibletask)

## Tuesday 26th September

There are still many features to be developed, and
_Erik_ (Frontend Developer) is added to the developer team to help us out with a couple of components.

### Time manager

A **countdown** that follows this logic:

- Before the games start, the countdown points to the scheduled start date of the games
- When the games have started, the countdown points to the expected end date of the games
- When the games have finished, the countdown points to the actual end date of the games

In addition, the current event on the agenda and upcoming events are shown.

> [`GamesTimeManager`](https://github.com/danielzotti/fortigames/blob/master/src/shared/components/games-time-manager/games-time-manager.tsx)

### Minimal UI kit

In order to speed up the development, we created a couple of reusable components: button, back to top button, company logo, back button, etc.

> [`Button`](https://github.com/danielzotti/fortigames/blob/master/src/shared/components/ui/button/button.tsx)

### First deploy on Vercel

Deploying to **[_Vercel_](https://vercel.com/)** is really straightforward with _Qwik_, in fact there is an adapter that you simply install with

```shell
npm run qwik add vercel-edge
```

> [_Vercel_ edge](https://qwik.builder.io/docs/deployments/vercel-edge/)

and then just go to the _Vercel_ website and connect the Git repo

![_Vercel_ - Import git](/static/images/articles/fortigames-companion-app/8-vercel-import-git.png)

In addition, you can configure the project to automatically **deploy on "push"** on a specific branch (`Settings → Git`)

![_Vercel_ - Set production branch](/static/images/articles/fortigames-companion-app/9-vercel-set-production-branch.png)

After pushing to the `deploy-vercel` branch just go to https://fortigames.vercel.app and see your app working.

The pattern for the URL is `https://{project_name}.vercel.app`

## Wednesday 27th September

### Time for Real Time!

_Supabase_ has the **Realtime** function and it is really easy to activate: just go to the table details, click on the button and you're done!

![Supabase - RealTime on](/static/images/articles/fortigames-companion-app/10-supabase-realtime-on.png)

> **"Fun" fact**: _Stefano_ was in charge of studying the realtime part and, initially, he had activated that feature only for the users table. When I set out to develop the code for the realtime results, I lost 2 hours to realize that realtime had not been enabled on that table as well. In fact, _Supabase_ does not return an error, but simply empties data so, with no error, it took me a while to figure it out (they could definitely improve this!!).

There is little data in the DB, and from a realtime perspective **it makes sense to load the whole list of users** (and all the other data) without thinking about pagination and just stay listening for the few data changes and update the data in memory accordingly. For convenience of use, we decided to wrap the logic in **_hooks_**.

### hooks for realtime 

NB: We will take `useParticipants()` hook as an example, but all the hooks are developed pretty much the same way (following the same pattern).

The idea is to _initialize the hook's store data in the protected pages layout_ (since the application works only after authentication), so _data is taken only once and, in any case, after authentication_.

The single source of truth is our **store**, and from there we filter the data we are interested in, such as the list of users who participate in games (those who are associated with a team), or the list of people who play board games. We listen for realtime changes in the DB and update the store accordingly, and all other `useComputed$` properties will update automatically.

```typescript
// /src/hooks/useParticipants.ts

export const useParticipants = () => {

  // Single source of truth
  const store = useContext(ParticipantsContext);

  // List of all people in Fortitue Group who participate to the convention
  const usersList = useComputed$<Participant[]>(() => {
    return Object.values(store);
  });

  // Participants in a team
  const participantsList = useComputed$<Participant[]>(() => {
    return Object.values(store).filter((p) => !!p.team);
  });

  // People who play boardgames
  const boardgamersList = useComputed$<Participant[]>(() => {
    return Object.values(store).filter((u) => u.is_playing_boardgames);
  });

  // Get participant by a specifica email (ID)
  const participantByEmail = $((email: string) => store[email]);

  // It is used in the layout of the protected route
  const initializeContext = $(async () => {
    const { data } = await supabaseClient.from("users").select("*");

    // Save data in key:value structure (email is the key)
    if (data?.length) {
      Object.entries(data).forEach(([key, value]) => {
        store[value.email] = value;
      });
    }

    // Listen to data changes
    supabaseClient
      .channel("custom-update-channel")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "users" },
        (payload: RealtimePostgresUpdatePayload<Participant>) => {
          store[payload.new.email] = payload.new;
        },
      )
      .subscribe();
  });

  return {
    initializeContext,
    store,
    participantByEmail,
    participantsList,
    usersList,
    boardgamersList,
  };
};
```

> [`useParticipants`](https://github.com/danielzotti/fortigames/blob/master/src/hooks/useParticipants.ts), [`useComputed$`](https://qwik.builder.io/docs/components/state/#usecomputed) and [`useSignal`](https://qwik.builder.io/docs/components/state/#usesignal)

### Manage score

Once the realtime feature is ready, we can work on updating the score of the matches. This is a fairly straightforward operation: just do "+1" or "-1" on the data when you click on the appropriate button (kind of like the classic "counter" example). One thing to keep in mind is to immediately disable the button after the user clicked, so as to avoid multiple updates.

```typescript jsx
// /src/routes/(protected)/games/[id]/index.tsx

const updateScore = $(
  async ({ team, score }: { team: 'dragons' | 'tigers'; score: number }) => {
    if (!result.value) {
      return;
    }
    if (score < 0) {
      return;
    }

    isSubmitting.value = true;
    try {
      const row = {
        ...result.value,
        last_update: new Date().toISOString(),
        [team]: score
      };
    } catch (ex) {
      alert('There was an error :(');
    } finally {
      isSubmitting.value = false;
    }
  }
);

<Button
  variant='selected'
  disabled={isSubmitting.value}
  onClick$={() =>
    updateScore({
      team: 'dragons',
      score: result.value!['dragons'] + 1
    })
  }
>
  +</Button>;
```

### Almost done

It's 1:40am. The app seems usable and (almost) complete. We can go to bed now, but first let's take a picture to celebrate!

![Fortigames Devs](/static/images/articles/fortigames-companion-app/fortigames-devs.jpg)

## Thursday 28th September

### Start/Stop Fortigames

In order to have something up and running on the day of the convention, we left the components for managing the games for last, since this could be handled by editing the DB directly anyway (from the _Supabase_ website).

Fortunately, there was still a day to go, and by taking just a couple of hours off in the afternoon I was able to manage the buttons to **start games**, **pause** and **restart** them.

Each button has the same logic: _it reads the status of the games in realtime and, when clicked, handles the specific Start/Stop/Reset operation of the games_.

### Winner page

Graphics aside (an SVG of the cup drawn by _Gabri_), the component keeps listening to the `winner` field of the `config` table and, at the time it is set with the value _"dragons"_ or _"tigers"_, the component displays the trophy with the name of the _winner_.

## Last moments

It's 8pm of the day before the convention. The next day's departure is at 6am (and a 3-hour drive!) and the sleep backlog has to be made up somehow (going to bed every day at 2am was probably not a good idea 😅).

Just time for a few last graphical fixes, **ZERO testing**, and the last deployment is done hoping for good luck!
Time to pack up and try to rest up for the two-day event!

One last look at the **_evolution of the UI_** before concluding our journey:

![From Balsamiq, to Figma and the real app](/static/images/articles/fortigames-companion-app/11-ui-history.png)

## Final thoughts

Okay, the time was really short but we made it develop this app!
Sure, adding ideas and features along the way was not a good idea, but in the end we did it and **_it was worth it_**.

> I will never stop saying it, if you have fun and put passion into it you can do anything.

Let's take stock of the choices made:

- Knowing that the app is used by trusted people and only internally, we did not take large security controls into account
- The app was created just for fun, so we didn’t care about performances and chose instead to add more features.
- We were so focused on functionality that we did not have time to focus on shared development patterns (ES: DB access mode, folder and file structure, naming conventions, ...)
- We did not study _Qwik_ or _Supabase_ in a structured way. We went ahead by trial and error and reading only the part of the documentation that could be useful to us (usually this is not the best way to study)
- _Qwik_ is nice but it is definitely different from known frameworks, although JSX, hooks, routes are also used in other frameworks. At first you feel something "strange" and you bang your head on it but then, once you understand its logic, I must say it is a pleasure to develop with it.
- _Supabase_ has a nice dev experience and a really well written doc. On the other hand, realtime feature seemed a little slow compared to Firebase.

- Overall we are happy with how it went, partly because we used both _Qwik_ and
  _Supabase_ for the first time and, in a few days, we were able to develop a working app with very little effort. These are two tools that we will keep in mind also for more complex projects, taking advantage of doing a deep dive to study them properly.

### Next steps / Improvements

Of course there are certainly improvements that can be made. I don't know if we will do them but I’d like to list them:

- Improving **DB security** configuring _Supabase_ Policies.
- Adding a **toggle theme button** to select the preferred theme (currently, the default OS theme is used)
- Improving the UI of the **admin section**
- Managing the **`config` table directly from UI**
- **Code cleanup**: revise folder structure a bit, clean up comments and unused code, use shared patterns in various pages/components
- …and more that I can't think of now!

## The Code

I leave the link to the [GitHub repo](https://github.com/danielzotti/fortigames) so you can browse through the code. If you want to try using the app you just need to use the repo code and follow the steps to create your own DB on
_Supabase_ and your own app on _Google Cloud_ console.

## The Demo

You'll have to settle for a video, I'm sorry...

<iframe width="560" height="315" style="max-width:100%" src="https://www.youtube.com/embed/wRukdA-ZBAs?si=XfcuwSOwK7Syg9kO" title="Fortigames Companion App Demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Wrap-up

This was a very long post... I would say it took more time to write the article than the actual development work! 😅 I hope the tutorial is clear and useful for someone. And, as usual, if you have questions or you need more information about a specific part, don't hesitate to reach out! 🙃

❤️ Thanks for reading it! ❤️
