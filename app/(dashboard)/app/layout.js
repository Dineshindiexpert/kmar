import './../styles/scss/theme.scss';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
        {children}

      </body>
    </html>
  );
}
