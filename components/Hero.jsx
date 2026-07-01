export default function Hero() {
  return (
    <section className="relative py-[110px] overflow-hidden">
      <div className="absolute -top-40 -right-28 w-[620px] h-[620px] pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(198,161,91,.22),transparent 62%)" }} />
      <div className="relative max-w-shell mx-auto px-7">
        <div className="max-w-[760px]">
          <p className="eyebrow">Maison de parfums · Dakar</p>
          <h1 className="font-serif font-light text-[clamp(44px,7vw,88px)] leading-[1.02] tracking-tight my-6">
            Le parfum est<br />
            une <em className="italic text-gold">signature</em>,<br />
            pas un accessoire.
          </h1>
          <p className="text-lg text-ivory-soft max-w-[520px] mb-9">
            Des compositions rares, assemblées à la main et pensées pour durer sur la peau.
            Découvrez la collection SILLAGE.
          </p>
          <div className="flex gap-4 flex-wrap items-center">
            <a href="#collection"
              className="bg-gold hover:bg-[#d4b16e] text-ink px-8 py-4 rounded-full font-semibold text-sm tracking-wide transition hover:-translate-y-0.5">
              Voir la collection
            </a>
            <a href="#maison"
              className="text-ivory px-2 py-4 text-sm tracking-wide border-b border-line-strong hover:border-gold transition">
              Notre histoire
            </a>
          </div>
          <div className="flex gap-7 flex-wrap mt-16 pt-8 border-t border-line text-ivory-soft text-[13px] tracking-wide">
            <span>Extraits de parfum</span>
            <span className="text-gold">·</span>
            <span>Livraison à Dakar en 48h</span>
            <span className="text-gold">·</span>
            <span>Échantillons offerts</span>
          </div>
        </div>
      </div>
    </section>
  );
}
