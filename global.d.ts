declare namespace NodeJS {
  // 使用声明合并扩展process.env
  interface ProcessEnv {
    MYSQL_HOST: string;
    MYSQL_PORT: string;
    MYSQL_DATABASE: string;
    MYSQL_USER: string;
    MYSQL_PASSWORD: string;
  }
}
