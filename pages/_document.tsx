import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Muli:ital,wght@0,500;0,600;0,700;1,400&display=swap"/>
      <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"/>
      <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"></link>
      <link rel="stylesheet" href="/assets/css/bootstrap-tcl.css"></link>
      <link rel="stylesheet" href="/assets/css/main.css"></link>
      <link rel="stylesheet" href="/assets/css/popular-news-list.css"></link>
      
      {/* <link rel="stylesheet" href="/assets/css/post-detail.css"></link> */}
      <link rel="stylesheet" href="/assets/css/post-author.css"></link>
      <link rel="stylesheet" href="/assets/css/comments.css"></link>
      <link rel="stylesheet" href="/assets/css/related-posts.css"></link>
    </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
