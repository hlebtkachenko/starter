import "server-only";

// Stripe SDK singleton. LATER: wire when first billing slice ships.
//
// import Stripe from "stripe";
// import { env } from "./env";
//
// export const stripe = new Stripe(env.STRIPE_API_KEY ?? "", {
//   apiVersion: "2024-06-20",   // pin per docs/api/versioning-api.md
// });

export const stripe: never = undefined as never;
