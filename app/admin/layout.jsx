import Link from "next/link";
import Providers from "@/components/Providers";
import SignOutButton from "@/components/SignOutButton";

export const metadata = {
  title: "Espace boutique — SILLAGE",
};

export default function AdminLayout({ children }) {
  return (
    <Providers>
      <div className="min-h-screen">
        <header className="border-b border-line bg-ink/80 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-shell mx-auto px-7 h-[70px] flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="font-serif text-xl tracking-[0.2em] font-medium">
                SIL<span className="text-gold">·</span>LAGE
              </Link>
              <span className="text-ivory-soft text-sm hidden sm:inline">Espace boutique</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/admin/orders" className="text-ivory-soft hover:text-ivory text-sm">Commandes</Link>
              <Link href="/" className="text-ivory-soft hover:text-ivory text-sm">Voir la boutique ↗</Link>
              <SignOutButton />
            </div>
          </div>
        </header>
        <main className="max-w-shell mx-auto px-7 py-10">{children}</main>
      </div>
    </Providers>
  );
}
