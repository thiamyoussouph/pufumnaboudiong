"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/cloudinary";

async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Non autorisé");
}

// Lit un champ fichier et le pousse vers Cloudinary si présent
async function handleImage(formData, currentUrl = null) {
  const file = formData.get("image");
  if (file && typeof file === "object" && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    return await uploadImage(buffer);
  }
  return currentUrl;
}

function parseData(formData) {
  return {
    name: formData.get("name")?.trim(),
    family: formData.get("family")?.trim(),
    price: parseInt(formData.get("price"), 10) || 0,
    description: formData.get("description")?.trim() || "",
    stock: parseInt(formData.get("stock"), 10) || 0,
    noteTop: formData.get("noteTop")?.trim() || null,
    noteHeart: formData.get("noteHeart")?.trim() || null,
    noteBase: formData.get("noteBase")?.trim() || null,
    active: formData.get("active") === "on",
  };
}

function validateProductData(data) {
  const errors = [];
  if (!data.name) errors.push("Le nom est requis.");
  if (!data.family) errors.push("La famille est requise.");
  if (!data.description) errors.push("La description est requise.");
  if (!Number.isInteger(data.price) || data.price <= 0) errors.push("Le prix doit être un entier positif.");
  if (!Number.isInteger(data.stock) || data.stock < 0) errors.push("Le stock doit être un entier positif ou nul.");
  if (errors.length) throw new Error(errors.join(" "));
}

export async function createProduct(formData) {
  await requireAuth();
  const data = parseData(formData);
  validateProductData(data);
  const imageUrl = await handleImage(formData);
  await prisma.product.create({ data: { ...data, imageUrl } });
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProduct(id, formData) {
  await requireAuth();
  const data = parseData(formData);
  validateProductData(data);
  const existing = await prisma.product.findUnique({ where: { id: Number(id) } });
  const imageUrl = await handleImage(formData, existing?.imageUrl || null);
  await prisma.product.update({ where: { id: Number(id) }, data: { ...data, imageUrl } });
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProduct(id) {
  await requireAuth();
  await prisma.product.delete({ where: { id: Number(id) } });
  revalidatePath("/");
  revalidatePath("/admin");
}
