import {Client} from "pg";

const client = new Client({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
});

const connect = async () => {
  try {
    await client.connect();
    console.log('Connected to database');


    await client.query(`
        CREATE TABLE IF NOT EXISTS users (
        userId SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        friends INTEGER[] DEFAULT '{}',
        requests INTEGER[] DEFAULT '{}'
      );
    `);


    await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        category_id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL
      );
    `);


    await client.query(`
      CREATE TABLE IF NOT EXISTS events (
        event_id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        location_name TEXT NOT NULL,
        latitude DOUBLE PRECISION NOT NULL,
        longitude DOUBLE PRECISION NOT NULL,
        start_time TIMESTAMP NOT NULL,
        end_time TIMESTAMP NOT NULL,
        category_id INTEGER REFERENCES categories(category_id) ON DELETE SET NULL
      );
    `);

    console.log("Tables initialized");

    client.on('error', (error) => {
      console.log("Error Occurred In the db - ", error);
      process.exit(1);
    });

    client.on('end', () => {
      console.log('Database connection ended');
    });

    client.on('notice', (notice) => {
      console.log('Database notice:', notice);
    });

  } catch (error) {
    console.log("Error Connecting to db - ", error);
    process.exit(1);
  }
};


const disconnect=async()=>{
    try{

        await client.disconnect();

        client.on('error',(error)=>{
            console.log("Error Occured disconnecting database - ",error);
        });

    } catch(error){
        console.log("Error Disconnecting Db - ",error);
    }
};


export default {
    client,
    connect,
    disconnect
}