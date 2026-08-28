import { MongoClient, ObjectId, Binary, type Collection } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "amaya";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromiseAssets: Promise<MongoClient> | undefined;
}

function isConfigured(): boolean {
  return !!uri && !uri.includes("dummy") && !uri.includes("<username>");
}

function getClientPromise(): Promise<MongoClient> {
  const client = new MongoClient(uri as string);
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromiseAssets) {
      global._mongoClientPromiseAssets = client.connect();
    }
    return global._mongoClientPromiseAssets;
  }
  return client.connect();
}

type BlogAssetDoc = {
  _id: ObjectId;
  contentType: string;
  data: Binary;
  createdAt: Date;
};

async function getCollection(): Promise<Collection<BlogAssetDoc> | null> {
  if (!isConfigured()) return null;
  const client = await getClientPromise();
  return client.db(dbName).collection<BlogAssetDoc>("blogAssets");
}

export const MAX_ASSET_BYTES = 4 * 1024 * 1024; // 4MB — keeps documents well under Mongo's 16MB limit

/** Stores an uploaded image in MongoDB and returns the id to build its public URL from. */
export async function saveBlogAsset(buffer: Buffer, contentType: string): Promise<string> {
  const col = await getCollection();
  if (!col) throw new Error("Database not configured.");
  const result = await col.insertOne({
    _id: new ObjectId(),
    contentType,
    data: new Binary(buffer),
    createdAt: new Date(),
  });
  return result.insertedId.toHexString();
}

export async function getBlogAsset(id: string): Promise<{ buffer: Buffer; contentType: string } | null> {
  if (!ObjectId.isValid(id)) return null;
  const col = await getCollection();
  if (!col) return null;
  const doc = await col.findOne({ _id: new ObjectId(id) });
  if (!doc) return null;
  return { buffer: Buffer.from(doc.data.buffer), contentType: doc.contentType };
}
