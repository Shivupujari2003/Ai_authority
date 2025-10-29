import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const email = process.argv[2];
if (!email) {
  console.error('Usage: node inspectDb.js user@example.com');
  process.exit(1);
}

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const conn = mongoose.connection;
    const db = conn.db;
    console.log('Connected. Database name:', db.databaseName);

    const cols = await db.listCollections().toArray();
    console.log('Collections in this database:');
    cols.forEach(c => console.log(' -', c.name));

    console.log(`\nSearching for email ${email} in each collection...`);
    for (const c of cols) {
      try {
        const coll = db.collection(c.name);
        const doc = await coll.findOne({ email });
        if (doc) {
          console.log(`\nFound in collection: ${c.name}`);
          console.log(JSON.stringify(doc, null, 2));
          process.exit(0);
        }
      } catch (err) {
        // ignore errors for collections that aren't documents
      }
    }

    console.log('\nUser not found in this database.');
    console.log('If not found, the document may be in a different database on the cluster.');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
};

run();