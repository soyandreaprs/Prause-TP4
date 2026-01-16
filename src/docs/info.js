export const info = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Users API",
      version: "1.0.0",
      description: "API for user management",
    },
    servers: [
      { url: "http://localhost:3000" },
      { url: "https://users.vercel.app" },
    ],
  },
  apis: ["./src/docs/*.yml"],
};
