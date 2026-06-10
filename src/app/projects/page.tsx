import { config } from "src/config";
import { InternalPageLayout } from "src/shared/layouts/internal-page-layout/internal-page-layout";
import styles from "./page.module.scss";
import { Teaser } from "src/components/teaser/teaser";
import { Metadata } from "next";
import { buildMetadata } from "src/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: config.pageTitle("Projects"),
  description: "Daniel Zotti's projects",
  url: `${config.baseUrl}${config.urls.projects}`,
});

export default async function ProjectsPage() {
  return (
    <InternalPageLayout>
      <h1>Projects</h1>
      <div className={styles.projects}>
        <Teaser
          title={"ASCII Smuggler"}
          url={`${config.urls.projects}/ascii-smuggler`}
          tags={["tools", "security", "unicode"]}
          date={"2026-06-10"}
          description={
            "Convert ASCII text to Unicode Tag Characters which ends up as invisible text, or decode hidden tags."
          }
        />

        <Teaser
          title={"Tabuu"}
          description={"My favorite card game, but to play online!"}
          url={"https://tabuu.danielzotti.it"}
          tags={["website", "nextjs", "game", "vibe-coding"]}
          target="_blank"
          date={"2026-02-27"}
        />
        <Teaser
          title={"Sing (h)it!"}
          description={
            '"Sing(h)it! The H is silent. U are not!" is an engaging party game designed to test your musical knowledge and quick thinking! Gather your friends, challenge them to sing songs containing specific words, and see who can reach the top of the leaderboard.'
          }
          url={"https://sing-hit.danielzotti.it"}
          tags={["website", "nextjs", "game", "vibe-coding"]}
          target="_blank"
          date={"2025-12-10"}
        />
        <Teaser
          title={"Infinitris"}
          description={"An infinite Tic-Tac-Toe game"}
          url={"https://infinitris.danielzotti.it"}
          tags={["website", "nextjs", "game", "vibe-coding"]}
          target="_blank"
          date={"2025-12-10"}
        />
        <Teaser
          title={"Impro Word"}
          description={"A handy tool to generate random words for your impro!"}
          url={"https://impro-word.danielzotti.it"}
          tags={["website", "nextjs", "tool", "vibe-coding"]}
          target="_blank"
          date={"2026-03-10"}
        />
        <Teaser
          title={"Slide Roulette"}
          description={
            "An app to test your improvising skills going through a random presentation!"
          }
          url={"https://slide-roulette.danielzotti.it"}
          tags={["website", "qwik", "game"]}
          target="_blank"
          date={"2024-05-03"}
        />

        <Teaser
          title={"Fake 3D Website"}
          description={
            "A fake 3D simulation using webcam or mouse move + mouse wheel"
          }
          url={"https://danielzotti.github.io/fake-3d-website-next"}
          tags={["website", "3d", "nextjs"]}
          target="_blank"
          date={"2024-03-15"}
        />

        <Teaser
          title={"QR Code generator"}
          url={`${config.urls.projects}/qr-code-generator`}
          tags={["tools", "svg"]}
          date={"2023-05-12"}
          description={"A simple QR Code generator"}
        />

        <Teaser
          title={"Daniel's ambigram"}
          url={`${config.urls.projects}/ambigram`}
          tags={["graphic", "svg", "animation"]}
          date={"2023-04-13"}
          description={"A graphic project inspired by half-turn ambigrams"}
        />

        <Teaser
          title={"My wedding"}
          description={"The website I created for my wedding."}
          url={"http:///matrimonio.danielzotti.it"}
          tags={["website", "angular"]}
          target="_blank"
          date={"2017-09-20"}
        />

        <Teaser
          title={"Blinking"}
          url={"http://projects.danielzotti.it/blinking"}
          description={
            "A website that creates a parallax effect based on mouse movements to simulate depth."
          }
          tags={["website", "parallax", "3D"]}
          target="_blank"
          date={"2014-06-20"}
        />

        <Teaser
          title={"Technological blackboard"}
          url={"http://projects.danielzotti.it/lavagna-tecnologica"}
          description={
            "I wish I would have got this website when I was at primary school"
          }
          tags={["website", "angularjs", "funny"]}
          target="_blank"
          date={"2010-11-01"}
        />

        <Teaser
          title={"11.111 days of life"}
          description={
            "Have you ever wondered when you will turn 11.111 days of life? Now you can calculate it!"
          }
          url={"http://projects.danielzotti.it/undicimilacentoundici"}
          tags={["website", "angularjs", "countdown"]}
          target="_blank"
        />

        <Teaser
          title={"Christmas aperitif"}
          description={
            "A simple countdown to a Christmas event I organized in Area Science Park!"
          }
          url={"http://projects.danielzotti.it/aperitivoine3-natale"}
          tags={["website", "angularjs", "countdown"]}
          target="_blank"
        />

        <Teaser
          title={"Carnival aperitif"}
          description={
            "A simple countdown to an event I organized in Area Science Park!"
          }
          url={"http://projects.danielzotti.it/aperitivoine3-carnevale"}
          tags={["website", "angularjs", "countdown"]}
          target="_blank"
        />
      </div>
    </InternalPageLayout>
  );
}
