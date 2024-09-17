export default function Container({ children }: { children: React.ReactNode }) {
  return <section className="flex justify-between items-center">{children}</section>;
}
