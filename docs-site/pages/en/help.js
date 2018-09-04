/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  Container,
  GridBlock,
} from 'docusaurus/lib/core/CompLibrary';
import { siteConfig } from '../../siteConfig';

function docUrl(doc, language = siteConfig.language) {
  return `${siteConfig.baseUrl}docs/${language.shortName ? `${language.shortName}/` : ''}${doc}`;
}

const Help = ({ language = siteConfig.language }) => {
  const supportLinks = [
    {
      content: `Learn more using the [documentation on this site.](${docUrl(
        'doc1.html',
        language,
      )})`,
      title: 'Browse Docs',
    },
    {
      content: 'Ask questions about the documentation and project',
      title: 'Join the community',
    },
    {
      content: "Find out what's new with this project",
      title: 'Stay up to date',
    },
  ];

  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
          <header className="postHeader">
            <h1>
              Need help?
            </h1>
          </header>
          <p>
            This project is maintained by a dedicated group of people.
          </p>
          <GridBlock contents={supportLinks} layout="threeColumn" />
        </div>
      </Container>
    </div>
  );
};

export { Help };
export default Help;
