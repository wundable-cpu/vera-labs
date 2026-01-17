"use server";

import { auth } from "@/auth";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { OAuth2Client } from "google-auth-library";

export async function getAnalytics(propertyId: string) {
  try {
    // Get the session and access token
    const session = await auth();

    if (!session?.accessToken) {
      return {
        error: "No access token found. Please sign in again.",
      };
    }

    const accessToken = session.accessToken as string;

    // Create OAuth2 client with the access token
    const oauth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    
    oauth2Client.setCredentials({
      access_token: accessToken,
    });

    // Initialize the Analytics Data API client with OAuth2 credentials
    const analyticsDataClient = new BetaAnalyticsDataClient({
      auth: oauth2Client,
    });

    // Calculate date range for last 7 days
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    // Format dates as YYYY-MM-DD
    const startDate = sevenDaysAgo.toISOString().split("T")[0];
    const endDate = today.toISOString().split("T")[0];

    // Validate propertyId
    if (!propertyId) {
      return {
        error: "Property ID is required",
      };
    }

    // Run the report
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: startDate,
          endDate: endDate,
        },
      ],
      metrics: [
        { name: "activeUsers" },
        { name: "conversions" },
        { name: "sessions" },
      ],
    });

    // Extract the metric values
    // The response structure has rows with metricValues
    let activeUsers = 0;
    let conversions = 0;
    let sessions = 0;

    if (response.rows && response.rows.length > 0) {
      const row = response.rows[0];
      if (row.metricValues) {
        activeUsers = parseInt(row.metricValues[0]?.value || "0", 10);
        conversions = parseInt(row.metricValues[1]?.value || "0", 10);
        sessions = parseInt(row.metricValues[2]?.value || "0", 10);
      }
    }

    return {
      activeUsers,
      conversions,
      sessions,
      dateRange: {
        startDate,
        endDate,
      },
    };
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to fetch analytics data",
    };
  }
}