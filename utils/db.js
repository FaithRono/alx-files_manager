// utils/db.js
import { MongoClient } from 'mongodb';

const { DB_HOST = 'localhost', DB_PORT = '27017', DB_DATABASE = 'files_manager' } = process.env;
const url = `mongodb://${DB_HOST}:${DB_PORT}`;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

class DBClient {
  constructor() {
    this.client = client;
    this.dbName = DB_DATABASE;
    this.db = null;

    this.client.connect()
      .then(() => {
        this.db = this.client.db(this.dbName);
        console.log('MongoDB client connected to the server');
      })
      .catch((err) => {
        console.error('MongoDB client not connected to the server:', err);
      });
  }

  isAlive() {
    return !!this.db;
  }

  async nbUsers() {
    try {
      const collection = this.db.collection('users');
      return await collection.countDocuments();
    } catch (error) {
      console.error('Error fetching user count:', error);
      return 0;
    }
  }

  async nbFiles() {
    try {
      const collection = this.db.collection('files');
      return await collection.countDocuments();
    } catch (error) {
      console.error('Error fetching file count:', error);
      return 0;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
