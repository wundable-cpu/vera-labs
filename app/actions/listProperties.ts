"use server";

import { auth } from "@/auth";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";

export async function listProperties() {
  try {
    // Get the session and access token
    const session = await auth();

    if (!session?.accessToken) {
      return {
        error: "No access token found. Please sign in again.",
        properties: [],
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

    // Initialize the Google Analytics Admin API using googleapis
    const analyticsAdmin = google.analyticsadmin({
      version: "v1beta",
      auth: oauth2Client,
    });

    // List account summaries (which includes properties)
    const response = await analyticsAdmin.accountSummaries.list({});

    const properties: Array<{ id: string; displayName: string }> = [];

    if (response.data.accountSummaries) {
      for (const accountSummary of response.data.accountSummaries) {
        if (accountSummary.propertySummaries) {
          for (const propertySummary of accountSummary.propertySummaries) {
            if (propertySummary.property && propertySummary.displayName) {
              // Extract property ID from the property name (format: "properties/123456789")
              const propertyId = propertySummary.property.split("/").pop() || "";
              properties.push({
                id: propertyId,
                displayName: propertySummary.displayName,
              });
            }
          }
        }
      }
    }

    return {
      properties,
      error: properties.length === 0 ? "No properties found" : undefined,
    };
  } catch (error) {
    console.error("Error listing properties:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to list properties",
      properties: [],
    };
  }
}
