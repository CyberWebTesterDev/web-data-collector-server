module.exports.configPostgres = {
  user: "postgres",
  host: "127.0.0.1",
  database: "webscraper_db",
  password: "root",
  port: 5432,
  max: 10,
  min: 0,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};
