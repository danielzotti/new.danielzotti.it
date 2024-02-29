import { AmbigramIntro } from './components/ambigram-intro';
import { AmbigramWrapper } from './components/ambigram-wrapper';
import { BackButton } from 'src/components/back-button/back-button';
import { config } from 'src/config';

export default function AmbigramPage() {
  return (
    <>
      <AmbigramWrapper>
        <BackButton path={config.urls.projects} text={'Projects'} />
        <AmbigramIntro />
      </AmbigramWrapper>
    </>
  );
}
