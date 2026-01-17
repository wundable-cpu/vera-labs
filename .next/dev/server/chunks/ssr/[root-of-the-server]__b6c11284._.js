module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/Documents/The Insight Engine/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auth",
    ()=>auth,
    "handlers",
    ()=>handlers,
    "signIn",
    ()=>signIn,
    "signOut",
    ()=>signOut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/node_modules/next-auth/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$next$2d$auth$2f$providers$2f$google$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/node_modules/next-auth/providers/google.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f40$auth$2f$core$2f$providers$2f$google$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/node_modules/@auth/core/providers/google.js [app-rsc] (ecmascript)");
;
;
const { handlers, auth, signIn, signOut } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])({
    trustHost: true,
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f40$auth$2f$core$2f$providers$2f$google$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            checks: [
                "none"
            ],
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                    // This specific 'scope' allows our AI to read Analytics data later
                    scope: "openid profile email https://www.googleapis.com/auth/analytics.readonly"
                }
            }
        })
    ],
    // 2. Force trust for the local development host
    trustHost: true,
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async jwt ({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session ({ session, token }) {
            // Send properties to the client, like an access_token from a provider.
            if (session && token.accessToken) {
                session.accessToken = token.accessToken;
            }
            return session;
        }
    }
});
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/process [external] (process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("process", () => require("process"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/dns [external] (dns, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("dns", () => require("dns"));

module.exports = mod;
}),
"[project]/Documents/The Insight Engine/app/actions/getAnalytics.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4056fb72705c3dd8830c37ffdac51a88712da321df":"getAnalytics"},"",""] */ __turbopack_context__.s([
    "getAnalytics",
    ()=>getAnalytics
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f40$google$2d$analytics$2f$data$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/node_modules/@google-analytics/data/build/src/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$google$2d$auth$2d$library$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/node_modules/google-auth-library/build/src/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function getAnalytics(propertyId) {
    try {
        // Get the session and access token
        const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
        if (!session?.accessToken) {
            return {
                error: "No access token found. Please sign in again."
            };
        }
        const accessToken = session.accessToken;
        // Create OAuth2 client with the access token
        const oauth2Client = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$google$2d$auth$2d$library$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OAuth2Client"](process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
        oauth2Client.setCredentials({
            access_token: accessToken
        });
        // Initialize the Analytics Data API client with OAuth2 credentials
        const analyticsDataClient = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f40$google$2d$analytics$2f$data$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BetaAnalyticsDataClient"]({
            auth: oauth2Client
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
                error: "Property ID is required"
            };
        }
        // Run the report
        const [response] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [
                {
                    startDate: startDate,
                    endDate: endDate
                }
            ],
            metrics: [
                {
                    name: "activeUsers"
                },
                {
                    name: "conversions"
                },
                {
                    name: "sessions"
                }
            ]
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
                endDate
            }
        };
    } catch (error) {
        console.error("Error fetching analytics data:", error);
        return {
            error: error instanceof Error ? error.message : "Failed to fetch analytics data"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getAnalytics
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAnalytics, "4056fb72705c3dd8830c37ffdac51a88712da321df", null);
}),
"[project]/Documents/The Insight Engine/app/actions/listProperties.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00cc119af5b5b34b6aab5e612c79b30cf1d9ba88ec":"listProperties"},"",""] */ __turbopack_context__.s([
    "listProperties",
    ()=>listProperties
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$googleapis$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/node_modules/googleapis/build/src/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$google$2d$auth$2d$library$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/node_modules/google-auth-library/build/src/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function listProperties() {
    try {
        // Get the session and access token
        const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
        if (!session?.accessToken) {
            return {
                error: "No access token found. Please sign in again.",
                properties: []
            };
        }
        const accessToken = session.accessToken;
        // Create OAuth2 client with the access token
        const oauth2Client = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$google$2d$auth$2d$library$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["OAuth2Client"](process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
        oauth2Client.setCredentials({
            access_token: accessToken
        });
        // Initialize the Google Analytics Admin API using googleapis
        const analyticsAdmin = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$googleapis$2f$build$2f$src$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["google"].analyticsadmin({
            version: "v1beta",
            auth: oauth2Client
        });
        // List account summaries (which includes properties)
        const response = await analyticsAdmin.accountSummaries.list({});
        const properties = [];
        if (response.data.accountSummaries) {
            for (const accountSummary of response.data.accountSummaries){
                if (accountSummary.propertySummaries) {
                    for (const propertySummary of accountSummary.propertySummaries){
                        if (propertySummary.property && propertySummary.displayName) {
                            // Extract property ID from the property name (format: "properties/123456789")
                            const propertyId = propertySummary.property.split("/").pop() || "";
                            properties.push({
                                id: propertyId,
                                displayName: propertySummary.displayName
                            });
                        }
                    }
                }
            }
        }
        return {
            properties,
            error: properties.length === 0 ? "No properties found" : undefined
        };
    } catch (error) {
        console.error("Error listing properties:", error);
        return {
            error: error instanceof Error ? error.message : "Failed to list properties",
            properties: []
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    listProperties
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(listProperties, "00cc119af5b5b34b6aab5e612c79b30cf1d9ba88ec", null);
}),
"[project]/Documents/The Insight Engine/app/actions/generateVoiceBriefing.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"605b85a8439afc46d8bafab2aeaed0abedb6df4d5e":"generateVoiceBriefing"},"",""] */ __turbopack_context__.s([
    "generateVoiceBriefing",
    ()=>generateVoiceBriefing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/node_modules/openai/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/node_modules/openai/client.mjs [app-rsc] (ecmascript) <export OpenAI as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
const openai = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__["default"]({
    apiKey: process.env.OPENAI_API_KEY
});
async function generateVoiceBriefing(text, voice = "onyx") {
    try {
        if (!process.env.OPENAI_API_KEY) {
            return {
                error: "OpenAI API key is not configured",
                audioBase64: null
            };
        }
        if (!text || text.trim().length === 0) {
            return {
                error: "Text is required",
                audioBase64: null
            };
        }
        // Generate speech using OpenAI TTS
        const response = await openai.audio.speech.create({
            model: "tts-1",
            voice: voice,
            input: text
        });
        // Convert the audio buffer to Base64
        const buffer = Buffer.from(await response.arrayBuffer());
        const audioBase64 = buffer.toString("base64");
        return {
            audioBase64,
            error: null
        };
    } catch (error) {
        console.error("Error generating voice briefing:", error);
        return {
            error: error instanceof Error ? error.message : "Failed to generate voice briefing",
            audioBase64: null
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    generateVoiceBriefing
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(generateVoiceBriefing, "605b85a8439afc46d8bafab2aeaed0abedb6df4d5e", null);
}),
"[project]/Documents/The Insight Engine/app/actions/generateBusinessInsights.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"60c4b6fccd530fb39fccb2eee452176a88ce93dfde":"generateBusinessInsights"},"",""] */ __turbopack_context__.s([
    "generateBusinessInsights",
    ()=>generateBusinessInsights
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/node_modules/openai/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/node_modules/openai/client.mjs [app-rsc] (ecmascript) <export OpenAI as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
const openai = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__["default"]({
    apiKey: process.env.OPENAI_API_KEY
});
async function generateBusinessInsights(technicalFinding, leakingRevenue) {
    try {
        if (!process.env.OPENAI_API_KEY) {
            return {
                error: "OpenAI API key is not configured"
            };
        }
        const prompt = `You are an AI consultant helping a 50-year-old business owner understand a technical analytics finding. 

TECHNICAL FINDING: "${technicalFinding}"
${leakingRevenue ? `ESTIMATED MONTHLY REVENUE LOSS: $${leakingRevenue.toLocaleString()}` : ''}

Please provide:
1. A plain explanation (2-3 sentences) explaining this finding in simple terms that a non-technical business owner would understand. Avoid jargon and technical terms.
2. Quantify the potential revenue loss if this issue is not fixed. Use the estimated monthly revenue loss provided, or estimate based on the finding if not provided. Explain it in terms of annual impact and what it means for the business.
3. Suggest exactly 3 non-technical steps the business owner can take to start fixing this issue. Each step should be actionable and not require coding knowledge.

Respond in JSON format:
{
  "plainExplanation": "...",
  "quantifiedRevenueLoss": "...",
  "nonTechnicalSteps": ["step 1", "step 2", "step 3"]
}`;
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are a business consultant who translates technical findings into clear, actionable business insights for non-technical business owners."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            response_format: {
                type: "json_object"
            },
            temperature: 0.7
        });
        const content = completion.choices[0]?.message?.content;
        if (!content) {
            return {
                error: "No response from OpenAI"
            };
        }
        try {
            const insights = JSON.parse(content);
            return {
                insights
            };
        } catch (parseError) {
            console.error("Error parsing OpenAI response:", parseError);
            return {
                error: "Failed to parse AI response"
            };
        }
    } catch (error) {
        console.error("Error generating business insights:", error);
        return {
            error: error instanceof Error ? error.message : "Failed to generate business insights"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    generateBusinessInsights
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(generateBusinessInsights, "60c4b6fccd530fb39fccb2eee452176a88ce93dfde", null);
}),
"[project]/Documents/The Insight Engine/app/actions/paystack.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"609e089985b097d88ef9b133a5f3ab05a30739f622":"initializePayment"},"",""] */ __turbopack_context__.s([
    "initializePayment",
    ()=>initializePayment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
async function initializePayment(email, amount) {
    try {
        const res = await fetch("https://api.paystack.co/transaction/initialize", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                amount: amount * 100,
                currency: "GHS",
                callback_url: `${("TURBOPACK compile-time value", "http://localhost:3000")}/dashboard?status=success`
            })
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
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    initializePayment
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(initializePayment, "609e089985b097d88ef9b133a5f3ab05a30739f622", null);
}),
"[project]/Documents/The Insight Engine/.next-internal/server/app/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/Documents/The Insight Engine/app/actions/getAnalytics.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/Documents/The Insight Engine/app/actions/listProperties.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/Documents/The Insight Engine/app/actions/generateVoiceBriefing.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/Documents/The Insight Engine/app/actions/generateBusinessInsights.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/Documents/The Insight Engine/app/actions/paystack.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$app$2f$actions$2f$getAnalytics$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/app/actions/getAnalytics.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$app$2f$actions$2f$listProperties$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/app/actions/listProperties.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$app$2f$actions$2f$generateVoiceBriefing$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/app/actions/generateVoiceBriefing.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$app$2f$actions$2f$generateBusinessInsights$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/app/actions/generateBusinessInsights.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$app$2f$actions$2f$paystack$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/app/actions/paystack.ts [app-rsc] (ecmascript)");
;
;
;
;
;
}),
"[project]/Documents/The Insight Engine/.next-internal/server/app/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/Documents/The Insight Engine/app/actions/getAnalytics.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/Documents/The Insight Engine/app/actions/listProperties.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/Documents/The Insight Engine/app/actions/generateVoiceBriefing.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/Documents/The Insight Engine/app/actions/generateBusinessInsights.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/Documents/The Insight Engine/app/actions/paystack.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00cc119af5b5b34b6aab5e612c79b30cf1d9ba88ec",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$app$2f$actions$2f$listProperties$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["listProperties"],
    "4056fb72705c3dd8830c37ffdac51a88712da321df",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$app$2f$actions$2f$getAnalytics$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAnalytics"],
    "605b85a8439afc46d8bafab2aeaed0abedb6df4d5e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$app$2f$actions$2f$generateVoiceBriefing$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateVoiceBriefing"],
    "609e089985b097d88ef9b133a5f3ab05a30739f622",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$app$2f$actions$2f$paystack$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["initializePayment"],
    "60c4b6fccd530fb39fccb2eee452176a88ce93dfde",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$app$2f$actions$2f$generateBusinessInsights$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateBusinessInsights"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f2e$next$2d$internal$2f$server$2f$app$2f$dashboard$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$Documents$2f$The__Insight__Engine$2f$app$2f$actions$2f$getAnalytics$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$Documents$2f$The__Insight__Engine$2f$app$2f$actions$2f$listProperties$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$Documents$2f$The__Insight__Engine$2f$app$2f$actions$2f$generateVoiceBriefing$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$Documents$2f$The__Insight__Engine$2f$app$2f$actions$2f$generateBusinessInsights$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$Documents$2f$The__Insight__Engine$2f$app$2f$actions$2f$paystack$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/Documents/The Insight Engine/.next-internal/server/app/dashboard/page/actions.js { ACTIONS_MODULE0 => "[project]/Documents/The Insight Engine/app/actions/getAnalytics.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/Documents/The Insight Engine/app/actions/listProperties.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/Documents/The Insight Engine/app/actions/generateVoiceBriefing.ts [app-rsc] (ecmascript)", ACTIONS_MODULE3 => "[project]/Documents/The Insight Engine/app/actions/generateBusinessInsights.ts [app-rsc] (ecmascript)", ACTIONS_MODULE4 => "[project]/Documents/The Insight Engine/app/actions/paystack.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$app$2f$actions$2f$getAnalytics$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/app/actions/getAnalytics.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$app$2f$actions$2f$listProperties$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/app/actions/listProperties.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$app$2f$actions$2f$generateVoiceBriefing$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/app/actions/generateVoiceBriefing.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$app$2f$actions$2f$generateBusinessInsights$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/app/actions/generateBusinessInsights.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$The__Insight__Engine$2f$app$2f$actions$2f$paystack$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/The Insight Engine/app/actions/paystack.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b6c11284._.js.map