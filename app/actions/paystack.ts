"use server";

export async function initializePayment(email: string, amount: number): Promise<string> {
  try {
    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amount * 100, // Paystack uses subunits (e.g., 50 GHS = 5000)
        currency: "GHS",
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?status=success`,
      }),
    });

    if (!res.ok) {
      throw new Error(`Paystack API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    
    if (!data.data || !data.data.authorization_url) {
      throw new Error("Invalid response from Paystack API");
    }

    return data.data.authorization_url; // This is where we redirect the user
  } catch (error) {
    console.error("Error initializing payment:", error);
    throw error;
  }
}
