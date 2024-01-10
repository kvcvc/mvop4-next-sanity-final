import Link from "next/link";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-screen-xl p-4">
      <nav className="mb-4 flex justify-between gap-4 flex-col md:flex-row md:items-center">
        <Link href="/" className="text-4xl font-bold hover:underline">
          mvop4-next-sanity-final
        </Link>
        <Link href="/studio" className="text-base hover:underline">
          Přihlásit se do adminstrace
        </Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}
