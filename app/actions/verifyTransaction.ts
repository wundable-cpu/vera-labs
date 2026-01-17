"use server";

interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    status: string;
    reference: string;
    amount: number;
    customer: {
      email: string;
    };
    [key: string]: any;
  };
}

/**
 * Server Action to verify a Paystack transaction
 */
export async function verifyTransaction(reference: string): Promise<{
  status: "success" | "failed" | "pending";
  message?: string;
}> {
  try {
    if (!reference) {
      return {
        status: "failed",
        message: "Transaction reference is required",
      };
    }

    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!paystackSecretKey) {
      console.error("PAYSTACK_SECRET_KEY is not configured");
      return {
        status: "failed",
        message: "Payment verification service is not configured",
      };
    }

    // Make GET request to Paystack API
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Paystack API error:", response.status, errorData);
      return {
        status: "failed",
        message: errorData.message || "Failed to verify transaction",
      };
    }

    const data: PaystackVerifyResponse = await response.json();

    // Check the data.status field
    if (!data.data || !data.data.status) {
      return {
        status: "failed",
        message: "Invalid response from payment provider",
      };
    }

    const transactionStatus = data.data.status.toLowerCase();

    if (transactionStatus === "success") {
      return {
        status: "success",
        message: data.message || "Transaction verified successfully",
      };
    } else if (transactionStatus === "pending" || transactionStatus === "ongoing") {
      return {
        status: "pending",
        message: data.message || "Transaction verification in progress",
      };
    } else {
      return {
        status: "failed",
        message: data.message || "Transaction verification failed",
      };
    }
  } catch (error) {
    console.error("Error verifying transaction:", error);
    return {
      status: "failed",
      message: error instanceof Error ? error.message : "Failed to verify transaction",
    };
  }
}

