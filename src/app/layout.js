import "./globals.css";
import "../../public/voucher.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>voucher</title>
        <meta
          name="description"
          content="This is my awesome Next.js application"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
       

       {children}
      </body>
    </html>
  );
}
