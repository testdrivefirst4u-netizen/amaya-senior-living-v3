import { MongoClient, type Collection, type Document } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "amaya";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function isConfigured(): boolean {
  return !!uri && !uri.includes("dummy") && !uri.includes("<username>");
}

function getClientPromise(): Promise<MongoClient> {
  const client = new MongoClient(uri as string);
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  }
  return client.connect();
}

/**
 * Returns the "leads" collection, or null when MONGODB_URI is unset or still
 * the dummy placeholder — callers should skip persistence in that case
 * rather than fail the request.
 */
export async function getLeadsCollection(): Promise<Collection<Document> | null> {
  if (!isConfigured()) return null;
  const client = await getClientPromise();
  return client.db(dbName).collection("leads");
}
