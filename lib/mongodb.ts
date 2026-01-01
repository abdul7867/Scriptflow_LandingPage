import { MongoClient, Db, MongoClientOptions } from 'mongodb';

const uri = process.env.MONGODB_URI;

// Optimized connection options for serverless environments
const options: MongoClientOptions = {
  maxPoolSize: 10,           // Connection pooling
  minPoolSize: 2,            // Keep minimum connections ready
  serverSelectionTimeoutMS: 5000,  // Faster failure detection
  socketTimeoutMS: 45000,    // Socket timeout
  retryWrites: true,         // Reliability
  retryReads: true,
};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error('Please add your MongoDB URI to .env.local');
  }

  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    if (!clientPromise) {
      client = new MongoClient(uri, options);
      clientPromise = client.connect();
    }
    return clientPromise;
  }
}

// Helper function to get the database
export async function getDatabase(): Promise<Db> {
  const clientPromise = getClientPromise();
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB_NAME || 'scriptflow');
}

// Export the getClientPromise function for direct access if needed
export { getClientPromise };
