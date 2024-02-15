export const dbConfig = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'localhost',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
