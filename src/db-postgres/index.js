// import { Pool } from "pg";
// import { PrismaPg } from "@prisma/adapter-pg";
// import { PrismaClient } from "@prisma/client";
//
// const connectionString = `${process.env.DATABASE_URL}`;
//
// const pool = new Pool({
//   user: process.env.POSTGRESDB_USER,
//   host: process.env.HOST,
//   database: process.env.POSTGRESDB_DATABASE,
//   password: process.env.POSTGRES_PASSWORD,
//   port: process.env.POSTGRESDB_DOCKER_PORT
//     ? parseInt(process.env.POSTGRESDB_DOCKER_PORT)
//     : 5432,
//   connectionString,
// });
// const adapter = new PrismaPg(pool); // Error with Typescript compil
// export const prisma = new PrismaClient({ adapter });

// const pool = new Pool({
//   user: process.env.POSTGRESDB_USER,
//   host: process.env.HOST,
//   database: process.env.POSTGRESDB_DATABASE,
//   password: process.env.POSTGRES_PASSWORD,
//   port: process.env.POSTGRESDB_DOCKER_PORT ? parseInt(process.env.POSTGRESDB_DOCKER_PORT) : 5432,
// });
// export const initPostGresDb = async () => {
//
//   console.log(await pool.query("SELECT NOW()"));
//
//   const client = new Client({
//     user: process.env. "dbuser",
//     host: process.env. "database.server.com",
//     database: process.env. "mydb",
//     password: process.env. "secretpassword",
//     port:process.env.  3211,
//   });
//
//   await client.connect();
//
//   console.log(await client.query("SELECT NOW()"));
//
//   await client.end();
// };
//
// // export const query = async (
// //   text: string,
// //   params: [],
// //   callback: (err: Error, result: QueryResult) => void,
// // ) => {
// //   return pool.query(text, params, callback);
// // };
// export const query = async (
//   text: string,
//   params: [],
//   callback: (err: Error, result: QueryResult) => void,
// ) => {
//   const start = Date.now()
//   const res = await pool.query(text, params)
//   const duration = Date.now() - start
//   console.log('executed query', { text, duration, rows: res.rowCount })
//   return res
// }
//
// export const getClient = async () => {
//   const client = await pool.connect()
//   const query = client.query
//   const release = client.release
//   // set a timeout of 5 seconds, after which we will log this client's last query
//   const timeout = setTimeout(() => {
//     console.error('A client has been checked out for more than 5 seconds!')
//     console.error(`The last executed query on this client was: ${client.lastQuery}`)
//   }, 5000)
//   // monkey patch the query method to keep track of the last query executed
//   client.query = (...args) => {
//     client.lastQuery = args
//     return query.apply(client, args)
//   }
//   client.release = () => {
//     // clear our timeout
//     clearTimeout(timeout)
//     // set the methods back to their old un-monkey-patched version
//     client.query = query
//     client.release = release
//     return release.apply(client)
//   }
//   return client
// }
