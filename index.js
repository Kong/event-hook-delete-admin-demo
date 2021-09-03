const fetch = require("node-fetch");
const fastify = require("fastify");
const app = fastify();

app.post("/admin-created", async (req, reply) => {
  const requiredDomain = `@${process.env.REQUIRED_DOMAIN}`;

  // If it's the correct domain, allow the request
  if (req.body.entity.email.endsWith(requiredDomain)) {
    return {
      admin_deleted: false,
    };
  }

  // If not, make a request to delete the admin
  const url = `${process.env.KONG_ADMIN_URL}/admins/${req.body.entity.id}`;
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Kong-Admin-User": process.env.KONG_ADMIN_USER,
      "Kong-Admin-Token": process.env.KONG_ADMIN_TOKEN,
    },
  });
  return {
    admin_deleted: true,
  };
});

app.listen(3000).then(() => {
  console.log("Server running at http://localhost:3000/");
});
