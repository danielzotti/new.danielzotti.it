import { consoleCool } from './console-cool';
import { config } from '../config';

export const danielzottiTimeline = [
  {
    year: 1987,
    event: 'Daniel is born in Trieste, Italy on the 16th of April and the world has changed forever! ...or it remained the same, I don\'t remember correctly...',
    categories: ['life']
  },
  {
    year: 1991,
    event: 'First play with a videogame on a MSX console',
    categories: ['life']
  },
  {
    year: 1994,
    event: 'First PC ever: Windows 3.1 on a 386',
    categories: ['life']
  },
  {
    year: '1996-2005',
    event: '[Too tired to add data at the moment]',
    categories: ['life']
  },
  {
    year: 2006,
    event: 'University enrollment: Computer Engineering',
    categories: ['work', 'study']
  },
  {
    year: 2007,
    event: 'First university trainee in the IT department at Burlo Garofolo in Trieste',
    categories: ['work']
  },
  {
    year: 2008,
    event: 'First job as a developer in the IT department at Burlo Garofolo in Trieste',
    categories: ['work']
  },
  {
    year: 2014,
    event: 'First "startup" with a colleague and friend: Blinking',
    categories: ['work']
  },
  {
    year: 2015,
    event: 'New job at Promoscience',
    categories: ['work']
  },
  {
    year: 2016,
    event: 'First version of danielzotti.it website',
    categories: ['projects']
  },
  {
    year: 2020,
    event: 'New job at Wärtsilä',
    categories: ['work']
  },
  {
    year: 2021,
    event: 'New job at Bitrock',
    categories: ['work']
  },
  {
    year: 2023,
    event: 'New version of danielzotti.it website',
    categories: ['work']
  }
];


export const danielzottiInfo = {
  about: () => {
    console.log('Daniel Zotti is born in Trieste on the 16th of April 1987. He actually live in Trieste and he\'s not looking for a job at the moment!');
  },
  career: (year?: number) => {
    consoleCool('My story as a creative web developer');
    const career = danielzottiTimeline.filter(el => el.categories.includes('work'))
      .map(({ year, event }) => ({ year, event }));
    console.table(year ? career.filter(el => el.year === year) : career);
  },
  help: () => {
    console.group('window.danielzotti help:');

    console.groupCollapsed('danielzotti.about()');
    console.log('Info about Daniel Zotti');
    console.groupEnd();

    console.groupCollapsed('danielzotti.career()');
    console.log('A timeline about Daniel Zotti\'s career as a developer');
    console.groupEnd();

    console.groupCollapsed('danielzotti.help()');
    console.log('A list of all possible commands');
    console.groupEnd();

    console.groupCollapsed('danielzotti.social()');
    console.log('A list of links to social media profiles');
    console.groupEnd();

    console.groupCollapsed('danielzotti.career()');
    console.log('A complete timeline about Daniel Zotti\'s life');
    console.groupEnd();

    console.groupEnd();
  },
  invert: () => {
    const html = document.querySelector('html');
    consoleCool('Congratulations, I have found a hidden method! You\'re an hacker, aren\'t you? 🤪');

    if (!html) {
      return;
    }

    const mode = html.style.filter ? 'off' : 'on';

    if (mode === 'on') {
      html.style.filter = 'invert(1)';
      html.style.background = 'white';
      html.style.color = 'black';
      html.style.fontFamily = 'monospace !important';
    } else {
      html.style.filter = '';
      html.style.background = '';
      html.style.color = '';
      html.style.fontFamily = '';
      html.style.fontFamily = '';
    }
  },
  social: () => {
    console.table(Object.entries(config.social)
      .map(([key, value]) => ({
        name: key, url: value.url
      })));
  },
  timeline: () => {
    console.table(danielzottiTimeline.map((el) => ({ ...el, categories: el.categories.join(',') })));
  }

};
