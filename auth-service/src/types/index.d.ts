import "fastify";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: any;
    mongo: {
      db: Db;
    };
  }

  interface FastifyRequest {
    user?: any;
    token?: any;
  }

}
