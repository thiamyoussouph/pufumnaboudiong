export default function Maison() {
  return (
    <section id="maison" className="border-t border-line py-24">
      <div className="max-w-shell mx-auto px-7 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="eyebrow">Notre Maison</p>
          <h2 className="font-serif font-light text-[clamp(30px,4vw,44px)] leading-[1.15] my-5">
            L'art de laisser<br />une trace.
          </h2>
          <p className="text-ivory-soft mb-4 max-w-[460px]">
            SILLAGE est née à Dakar d'une conviction simple : un parfum bien composé raconte
            quelque chose de celui qui le porte, longtemps après son passage.
          </p>
          <p className="text-ivory-soft max-w-[460px]">
            Nous travaillons en petites séries, avec des matières sélectionnées pour leur tenue
            et leur profondeur. Pas de raccourcis, pas de compromis.
          </p>
        </div>
        <div className="rounded-[20px] border border-line p-11 min-h-[300px] flex flex-col justify-between"
          style={{ background: "linear-gradient(150deg,#2c1d21,#241318)" }}>
          <p className="font-serif italic text-[26px] leading-[1.35]">
            « Un parfum, c'est le vêtement invisible que l'on porte toute la journée. »
          </p>
          <p className="text-gold tracking-[0.14em] text-[13px]">— L'atelier SILLAGE</p>
        </div>
      </div>
    </section>
  );
}
