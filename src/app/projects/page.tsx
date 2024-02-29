import { config } from 'src/config';
import { InternalPageLayout } from 'src/shared/layouts/internal-page-layout/internal-page-layout';
import styles from './page.module.scss';
import { Teaser } from 'src/components/teaser/teaser';
import { Metadata } from 'next';
import { buildMetadata } from 'src/utils/metadata';

export const metadata: Metadata = buildMetadata({
  title: config.pageTitle('Projects'),
  description:
    'Daniel Zotti\'s projects',
  url: `${config.baseUrl}${config.urls.projects}`
});

export default async function ProjectsPage() {
  return (
    <InternalPageLayout>
      <h1>Projects</h1>
      <div className={styles.projects}>
        <Teaser title={'QR Code generator'}
          url={`${config.urls.projects}/qr-code-generator`}
          tags={['tools', 'svg']}
          date={'2023-05-12'}
          description={'A simple QR Code generator'}
        />

        <Teaser title={'Daniel\'s ambigram'}
          url={`${config.urls.projects}/ambigram`}
          tags={['graphic', 'svg', 'animation']}
          date={'2023-04-13'}
          description={'A graphic project inspired by half-turn ambigrams'}
        />

        <Teaser title={'My wedding'}
          description={'The website I created for my wedding.'}
          url={'http:///matrimonio.danielzotti.it'}
          tags={['website', 'angular']}
          target='_blank'
        />

        <Teaser title={'Blinking'}
          url={'http://projects.danielzotti.it/blinking'}
          description={'A website that creates a parallax effect based on mouse movements to simulate depth.'}
          tags={['website', 'parallax', '3D']}
          target='_blank'
        />

        <Teaser title={'Technological blackboard'}
          url={'http://projects.danielzotti.it/lavagna-tecnologica'}
          description={'I wish I would have got this website when I was at primary school'}
          tags={['website', 'angularjs', 'funny']}
          target='_blank'
        />

        <Teaser title={'11.111 days of life'}
          description={'Have you ever wondered when you will turn 11.111 days of life? Now you can calculate it!'}
          url={'http://projects.danielzotti.it/undicimilacentoundici'}
          tags={['website', 'angularjs', 'countdown']}
          target='_blank'
        />

        <Teaser title={'Christmas aperitif'}
          description={'A simple countdown to a Christmas event I organized in Area Science Park!'}
          url={'http://projects.danielzotti.it/aperitivoine3-natale'}
          tags={['website', 'angularjs', 'countdown']}
          target='_blank'
        />

        <Teaser title={'Carnival aperitif'}
          description={'A simple countdown to an event I organized in Area Science Park!'}
          url={'http://projects.danielzotti.it/aperitivoine3-carnevale'}
          tags={['website', 'angularjs', 'countdown']}
          target='_blank'
        />

      </div>
    </InternalPageLayout>
  );
}
