import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardContent } from "./dashboard-content";
import { getAnalytics } from "@/app/actions/getAnalytics";
import { listProperties } from "@/app/actions/listProperties";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ propertyId?: string; demo?: string }> | { propertyId?: string; demo?: string };
}) {
  const session = await auth();

  // Redirect to landing page if no session
  if (!session?.user) {
    redirect("/");
  }


  // Handle searchParams (can be a Promise in Next.js 15)
  const params = searchParams instanceof Promise ? await searchParams : searchParams;

  // Check if we're in demo mode (triggered manually via URL param)
  const isDemoMode = (params as any)?.demo === "true";

  // Only fetch properties if not in demo mode
  let properties: Array<{ id: string; displayName: string }> = [];
  let hasPropertiesError = false;
  
  if (!isDemoMode) {
    try {
      const propertiesResult = await listProperties();
      properties = propertiesResult.properties || [];
      hasPropertiesError = Boolean(propertiesResult.error && properties.length === 0);
    } catch (error) {
      console.error("Error fetching properties:", error);
      hasPropertiesError = true;
      properties = [];
    }
  }

  // Get property ID from URL params, or use first property, or fallback to env var
  const propertyId =
    params?.propertyId ||
    properties[0]?.id ||
    process.env.GA4_PROPERTY_ID ||
    "";

  // Fetch analytics data for the selected property, or use demo data
  let analyticsData;
  if (isDemoMode) {
    // Mock data for demo mode with specific revenue leak numbers
    analyticsData = {
      activeUsers: 14250,
      conversions: 456, // 3.2% of activeUsers
      sessions: 28400,
      leakingRevenue: 12450, // $12,450 / month
      topCulprit: "Mobile Checkout Latency (4.2s)",
      recoveryPotential: "+18% Conversion lift",
      dateRange: {
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        endDate: new Date().toISOString().split("T")[0],
      },
    };
  } else {
    try {
      analyticsData = propertyId
        ? await getAnalytics(propertyId)
        : { error: "No property ID available" };
    } catch (error) {
      console.error("Error fetching analytics:", error);
      analyticsData = {
        error: "Google Analytics connecting... Please set up API keys.",
      };
    }
  }

  return (
    <DashboardContent
      session={session}
      analyticsData={analyticsData}
      properties={properties}
      currentPropertyId={propertyId}
      isDemoMode={isDemoMode}
      hasPropertiesError={hasPropertiesError}
    />
  );
}

