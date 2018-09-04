/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  MarkdownBlock,
  Container,
  GridBlock,
} from 'docusaurus/lib/core/CompLibrary';
import { siteConfig } from '../../siteConfig';

function imgUrl(img) {
  return `${siteConfig.baseUrl}img/${img}`;
}

function docUrl(doc, languageShortName = siteConfig.defaultLanguage.shortName) {
  return `${siteConfig.baseUrl}docs/${languageShortName ? `${languageShortName}/` : ''}${doc}`;
}

function pageUrl(page, languageShortName = siteConfig.defaultLanguage.shortName) {
  return siteConfig.baseUrl + (languageShortName ? `${languageShortName}/` : '') + page;
}

const Button = ({ href, target, children }) => {
  return (
    <div className="pluginWrapper buttonWrapper">
      <a className="button" href={href} target={target}>
        {children}
      </a>
    </div>
  );
};

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = ({ children }) => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">
        {children}
      </div>
    </div>
  </div>
);

const Logo = ({ imgSrc }) => (
  <div className="projectLogo">
    <img src={imgSrc} alt="Project Logo" />
  </div>
);

const ProjectTitle = () => (
  <h2 className="projectTitle">
    {siteConfig.title}
    <small>
      {siteConfig.tagline}
    </small>
  </h2>
);

const PromoSection = ({ children }) => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">
        {children}
      </div>
    </div>
  </div>
);

const HomeSplash = ({ language = siteConfig.defaultLanguage }) => {
  return (
    <SplashContainer>
      <Logo imgSrc={imgUrl('docusaurus.svg')} />
      <div className="inner">
        <ProjectTitle />
        <PromoSection>
          <Button href={docUrl('overview', language.shortName)}>
            See the Docs
          </Button>
        </PromoSection>
      </div>
    </SplashContainer>
  );
};

const Block = ({
  id,
  background,
  layout,
  children,
}) => (
  <Container
    padding={['bottom', 'top']}
    id={id}
    background={background}
  >
    <GridBlock align="center" contents={children} layout={layout} />
  </Container>
);

const Features = () => (
  <Block layout="fourColumn">
    {[
      {
        title: 'Easier State Management',
        content: 'This is the content of my feature',
        image: imgUrl('docusaurus.svg'),
        imageAlign: 'top',
      },
      {
        title: 'Reduce Boilerplate',
        content: 'The content of my second feature',
        image: imgUrl('docusaurus.svg'),
        imageAlign: 'top',
      },
    ]}
  </Block>
);

const FeatureCallout = () => (
  <div
    className="productShowcaseSection paddingBottom"
    style={{ textAlign: 'center' }}
  >
    <h2>
      Feature Callout
    </h2>
    <MarkdownBlock>
      These are features of this project
    </MarkdownBlock>
  </div>
);

const LearnHow = () => (
  <Block background="light">
    {[
      {
        content: 'Talk about learning how to use this',
        image: imgUrl('docusaurus.svg'),
        imageAlign: 'right',
        title: 'Learn How',
      },
    ]}
  </Block>
);

const TryOut = () => (
  <Block id="try">
    {[
      {
        content: 'Talk about trying this out',
        image: imgUrl('docusaurus.svg'),
        imageAlign: 'left',
        title: 'Try it Out',
      },
    ]}
  </Block>
);

const Description = () => (
  <Block background="dark">
    {[
      {
        content: 'This is another description of how this project is useful',
        image: imgUrl('docusaurus.svg'),
        imageAlign: 'right',
        title: 'Description',
      },
    ]}
  </Block>
);

const Showcase = ({ language = siteConfig.defaultLanguage }) => {
  if ((siteConfig.users || []).length === 0) {
    return null;
  }

  const showcase = siteConfig.users.filter(user => user.pinned).map(user => (
    <a href={user.infoLink} key={user.infoLink}>
      <img src={user.image} alt={user.caption} title={user.caption} />
    </a>
  ));

  return (
    <div className="productShowcaseSection paddingBottom">
      <h2>
        Who is Using This?
      </h2>
      <p>
        This project is used by all these people
      </p>
      <div className="logos">
        {showcase}
      </div>
      <div className="more-users">
        <a className="button" href={pageUrl('users.html', language)}>
          {`More ${siteConfig.title} Users`}
        </a>
      </div>
    </div>
  );
};

const Index = ({ language = siteConfig.defaultLanguage }) => {
  return (
    <div>
      <HomeSplash language={language} />
      <div className="mainContainer">
        <Features />
        <FeatureCallout />
        <LearnHow />
        <TryOut />
        <Description />
        <Showcase language={language} />
      </div>
    </div>
  );
};

export { Index };
export default Index;
