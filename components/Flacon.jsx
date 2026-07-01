// Visuel du parfum : photo Cloudinary si disponible, sinon flacon CSS
export default function Flacon({ name, liquid, imageUrl, size = "lg" }) {
  if (size === "sm") {
    return (
      <div className="relative w-11 h-[60px] rounded-[5px] border border-line-strong overflow-hidden shrink-0">
        {imageUrl ? (
          <img src={imageUrl} alt={name || ""} className="w-full h-full object-cover" />
        ) : (
          <i className="absolute inset-x-0 bottom-0 h-[70%] block" style={{ background: liquid }} />
        )}
      </div>
    );
  }

  // Grand format
  if (imageUrl) {
    return (
      <div className="h-[260px] mb-6 rounded-xl overflow-hidden border border-line-strong bg-gradient-to-b from-white/[0.04] to-black/20 flex items-center justify-center p-3">
  <img src={imageUrl} alt={name || ""} className="max-h-full max-w-full object-contain" />
</div>
    );
  }

  return (
    <div className="h-[220px] flex items-end justify-center mb-6">
      <div className="relative w-24">
        <div
          className="w-[34px] h-[26px] mx-auto rounded-t-[5px] border border-b-0 border-gold-deep"
          style={{ background: "linear-gradient(180deg,#3a2a22,#241a16)" }}
        />
        <div className="w-[22px] h-3 mx-auto bg-[#2a1d18] border-x border-line" />
        <div className="relative h-[132px] rounded-t-lg rounded-b-xl border border-line-strong overflow-hidden bg-gradient-to-b from-white/5 to-black/10">
          <div className="absolute inset-x-0 bottom-0 h-[74%]" style={{ background: liquid }} />
          <div className="absolute top-0 left-[14%] w-3 h-full bg-gradient-to-r from-white/20 to-transparent" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 text-center font-serif text-[9px] tracking-[0.18em] uppercase py-[7px] bg-ink/40 border-y border-ivory/50">
            {name}
          </div>
        </div>
      </div>
    </div>
  );
}
