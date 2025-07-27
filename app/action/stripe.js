"use server";

import { formatAmountForStripe } from "@/lib/formatAmountForStripe";
import { stripe } from "@/lib/stripe.config";
import { headers } from "next/headers";

const CURRENCY = "USD";

export async function createCheckoutSession(data) {
  const headersData = await headers();
  const origin = headersData.get("origin");
  const courseId = data.get("courseId");
  const title = data.get("title");
  const price = data.get("price");

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}&courseId=${courseId}`,
    cancel_url: `${origin}/courses`,
    ui_mode: "hosted",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: CURRENCY,
          product_data: {
            name: title,
          },
          unit_amount: formatAmountForStripe(price, CURRENCY),
        },
      },
    ],
  });
  return {
    url: checkoutSession.url,
  };
}

// export async function createPaymentIntent(data) {
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: formatAmountForStripe(price, CURRENCY),
//     automatic_payment_methods: { enabled: true },
//     currency: CURRENCY,
//   });

//   return { client_secret: paymentIntent.client_secret };
// }
