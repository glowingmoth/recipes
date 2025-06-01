import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.ATLAS_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to server
    await client.connect();

    // Send ping to confirm successful connect
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. Successfully connected to MongoDB!");
  } catch (err) {
    // Ensure the client will close when finished/error
    await client.close();
  }
}

run();

let db = client.db("recipes");

export default db;
