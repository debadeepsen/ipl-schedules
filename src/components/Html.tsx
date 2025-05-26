// "use client";

const Html = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
};

export default Html;