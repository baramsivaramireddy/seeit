
import "./globals.css";


export const metadata = {
  title: "See it",
  description: "created by Shiva",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
