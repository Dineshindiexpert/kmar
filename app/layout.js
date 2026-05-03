import './../styles/scss/theme.scss';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>My App</title>
      </head>
      <body>
        {children}

      </body>
    </html>
  );
}
