import { prisma } from "@/lib/prisma";

// Produits visibles sur la vitrine
export async function getActiveProducts() {
  return prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: "asc" },
  });
}

// Tous les produits (back-office)
export async function getAllProducts() {
  return prisma.product.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getProductById(id) {
  return prisma.product.findUnique({ where: { id: Number(id) } });
}

// Dégradé de secours quand un parfum n'a pas encore de photo
export function familyGradient(family) {
  const map = {
    Boisé: "linear-gradient(180deg,#6d5330,#3a2a15)",
    Floral: "linear-gradient(180deg,#a75c58,#5e2a2c)",
    Cuir: "linear-gradient(180deg,#7a4a2c,#3d2113)",
    Vert: "linear-gradient(180deg,#7d8a52,#3c4626)",
    Hespéridé: "linear-gradient(180deg,#c9a24a,#7a5e1f)",
    Oriental: "linear-gradient(180deg,#8a5a3c,#40241a)",
  };
  return map[family] || "linear-gradient(180deg,#6b5a4a,#2f2620)";
}
