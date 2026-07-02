require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const products = [
  { name: "Nuit Vétiver", family: "Boisé", price: 45000, stock: 20, description: "Un boisé profond et vibrant, ouvert par la bergamote et le poivre, adouci par l'iris avant un fond de vétiver et de cèdre qui tient toute la journée.", noteTop: "bergamote, poivre noir", noteHeart: "iris, violette", noteBase: "vétiver, cèdre" },
  { name: "Rose Ombrée", family: "Floral", price: 52000, stock: 20, description: "Une rose sombre et sensuelle, enveloppée de poire et de cassis, reposant sur un lit de patchouli et de santal.", noteTop: "poire, cassis", noteHeart: "rose, pivoine", noteBase: "patchouli, santal" },
  { name: "Cuir Nomade", family: "Cuir", price: 58000, stock: 20, description: "Un cuir raffiné rehaussé de safran et de cardamome, pour une signature élégante et affirmée.", noteTop: "safran, cardamome", noteHeart: "cuir, iris", noteBase: "bois secs, vanille" },
  { name: "Figue Blanche", family: "Vert", price: 42000, stock: 20, description: "La fraîcheur lumineuse de la figue et de la bergamote, portée par un cœur floral et un fond boisé délicat.", noteTop: "figue, bergamote", noteHeart: "jasmin, néroli", noteBase: "cèdre, benjoin" },
  { name: "Néroli d'Été", family: "Hespéridé", price: 40000, stock: 20, description: "Un hespéridé solaire autour du néroli et de la fleur d'oranger, réchauffé par le santal et la vanille.", noteTop: "citron, néroli", noteHeart: "fleur d'oranger, jasmin", noteBase: "santal, vanille" },
  { name: "Bois Cendré", family: "Boisé", price: 49000, stock: 20, description: "Un boisé minéral et frais, mené par le pamplemousse et le poivre rose, ancré dans le cèdre et le patchouli.", noteTop: "pamplemousse, poivre rose", noteHeart: "cyprès, lavande", noteBase: "cèdre, patchouli" },
];

async function main() {
  // Admin par défaut
  const email = process.env.ADMIN_EMAIL || "admin@sillage.sn";
  const password = process.env.ADMIN_PASSWORD || "sillage2026";
  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, name: "Administrateur", password: hashed },
  });
  console.log(`✓ Admin créé : ${email} / ${password}`);

  // Produits (seulement si la table est vide)
  const count = await prisma.product.count();
  if (count === 0) {
    for (const p of products) {
      await prisma.product.create({ data: p });
    }
    console.log(`✓ ${products.length} parfums ajoutés`);
  } else {
    console.log("• Produits déjà présents, seed ignoré");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
