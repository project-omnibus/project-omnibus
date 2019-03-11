import React from 'react';
const HTML = (props) => (
  <html className='index' lang='en'>
    <head>
      <meta charSet='utf-8' />
      <link rel='shortcut icon' href='/static/favicon.ico' />
      <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
      <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css' integrity='sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO' crossOrigin='anonymous' />
      <link href="https://fonts.googleapis.com/css?family=Lato|PT+Serif" rel="stylesheet" /> 
      <meta name='theme-color' content='#000000' />
      <link rel='stylesheet' href='./styles.css' />
      <title>Project Omnibus</title>
    </head>
    <body>
      <div
        id='root'
        dangerouslySetInnerHTML={{ __html: props.html }}
      />
      <script dangerouslySetInnerHTML={{
        __html:
            `window.__SERIALIZED_STATE__ =
              JSON.stringify(${props.serverState})`
      }}
      />
      <script type='application/javascript' src='/main.bundle.js' />
    </body>
  </html>
);

export default HTML;
