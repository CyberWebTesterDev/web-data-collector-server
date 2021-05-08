interface IConfig {
   user: string;
   host: string;
   dataBase: string;
   password: string;
   port: number;
   max: number;
   min: number;
   idleTimeoutMillis: number;
   connectionTimeoutMillis: number;
}

const configPostgres: IConfig = {
   user: 'postgres',
   host: '127.0.0.1',
   dataBase: 'webscraper_db',
   password: 'root',
   port: 5432,
   max: 10,
   min: 0,
   idleTimeoutMillis: 30000,
   connectionTimeoutMillis: 2000,
};
