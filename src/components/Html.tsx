// "use client";

const Html = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link
          href='https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap'
          rel='stylesheet'
        ></link>
      </head>
      <body className={`antialiased`}>{children}</body>
    </html>
  )
}

export default Html
