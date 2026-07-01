// Protège toutes les routes /admin : redirige vers /login si non connecté
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/admin/:path*"],
};
