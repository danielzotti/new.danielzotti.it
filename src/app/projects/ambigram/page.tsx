import { AmbigramIntro } from './components/ambigram-intro';
import { AmbigramWrapper } from './components/ambigram-wrapper';
import { BackButton } from '../../../components/back-button/back-button';
import { config } from '../../../config';
import { Footer } from '../../../components/footer/footer';

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
