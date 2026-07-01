export default function Footer() {
  return (
    <footer id="footer" className="border-t border-line pt-14 pb-10">
      <div className="max-w-shell mx-auto px-7">
        <div className="flex justify-between gap-10 flex-wrap mb-11">
          <div>
            <a href="#" className="font-serif text-2xl tracking-[0.22em] font-medium mb-3.5 inline-block">
              SIL<span className="text-gold">·</span>LAGE
            </a>
            <p className="text-ivory-soft text-sm max-w-[260px]">
              Maison de parfums, Ouest Foire, Dakar. Compositions rares en petites séries.
            </p>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.18em] uppercase text-gold mb-4">Boutique</h4>
            {["Collection", "Nouveautés", "Coffrets"].map((l) => (
              <a key={l} href="#collection" className="block text-ivory-soft hover:text-ivory text-sm mb-2.5 transition">{l}</a>
            ))}
          </div>
          <div>
            <h4 className="text-xs tracking-[0.18em] uppercase text-gold mb-4">Maison</h4>
            {["Notre histoire", "Nous contacter", "Livraison & retours"].map((l) => (
              <a key={l} href="#maison" className="block text-ivory-soft hover:text-ivory text-sm mb-2.5 transition">{l}</a>
            ))}
          </div>
          <div>
            <h4 className="text-xs tracking-[0.18em] uppercase text-gold mb-4">Paiement</h4>
            <div className="flex gap-2.5 flex-wrap">
              {["Wave", "Orange Money", "PayDunya"].map((p) => (
                <span key={p} className="border border-line-strong rounded-lg px-3 py-1.5 text-xs text-ivory-soft">{p}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-line pt-6 flex justify-between flex-wrap gap-3 text-ivory-soft text-[13px]">
          <span>© 2026 SILLAGE — Tous droits réservés.</span>
          <span>Dakar · Sénégal</span>
        </div>
      </div>
    </footer>
  );
}
