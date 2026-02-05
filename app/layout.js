export const metadata = {
  title: 'File Host - Upload & Share Files',
  description: 'Simple file hosting service. Upload files up to 500MB and share instantly.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ 
        margin: 0, 
        padding: 0,
        background: 'black', 
        color: 'white',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale'
      }}>
        {children}
      </body>
    </html>
  );
}
