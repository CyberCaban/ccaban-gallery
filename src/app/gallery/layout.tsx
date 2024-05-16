import "~/styles/globals.css";

export const metadata = {
  title: "CCaban gallery",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function GalleryLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <div className="">{children}</div>
      {modal}
    </>
  );
}
