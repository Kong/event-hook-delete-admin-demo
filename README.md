# event-hook-delete-admin-demo

This is sample code for a blog post on Kong's Event Hooks.

To run it yourself, you'll need to set the following environment variables:

- `REQUIRED_DOMAIN` - We'll delete any new admins that aren't from this domain
- `KONG_ADMIN_URL` - The URL of your Kong admin API, including port
- `KONG_ADMIN_USER` - The username to log in to the admin API
- `KONG_ADMIN_TOKEN` - The RBAC token to log in to the admin API

## Event Hooks configuration

To enable this event hook, send the following `POST` request to `$KONG_ADMIN_URL/event-hooks`:

```json
{
  "source": "crud",
  "event": "admins:create",
  "handler": "webhook",
  "config": {
    "url": "http://<your host>/admin-created"
  }
}
```
