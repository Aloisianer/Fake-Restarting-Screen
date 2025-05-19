import "./globals.css";

export const metadata = {
  title: "Fake Restart Screen",
  description: "Fake Windows 11 Restarting Screen",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={'antialiased'}
      >
        {children}
      </body>
    </html>
  );
}
