import "./globals.css";
import "../../public/voucher.css";
import { Jost } from "next/font/google";

const jost = Jost({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <head>
        <title>My Resume</title>
        <meta
          name="description"
          content="This is my awesome Resume"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={jost.className}>
       

       {children}
      </body>
    </html>
  );
}
