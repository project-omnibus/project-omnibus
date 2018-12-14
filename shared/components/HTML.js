import React from 'react';

const HTML = (props) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      <meta name="theme-color" content="#000000"/>
      <title>Project Omnibus</title>
    </head>
    <body>
      <div
        id="root"
        dangerouslySetInnerHTML={{ __html: props.html }}
      />
      <script dangerouslySetInnerHTML={{
          __html:
            `window.__SERIALIZED_STATE__ =
              JSON.stringify(${props.serverState})`
        }}
      />
    <script type="application/javascript" src="/main.bundle.js" />
    </body>
  </html>
);

export default HTML;
