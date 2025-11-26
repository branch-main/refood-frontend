# Production Deployment Guide

## Prerequisites

- Docker and Docker Compose installed
- Git installed

## Quick Start

### Using Docker Compose (Recommended)

```bash
# Build and run
docker compose up -d

# View logs
docker compose logs -f

# Stop
docker compose down
```

### Using Docker Directly

```bash
# Build the image
docker build -t refood-frontend .

# Run the container
docker run -d -p 80:80 --name refood-frontend refood-frontend
```

## Environment Variables

Create a `.env` file based on `.env.example` before building:

```bash
cp .env.example .env
# Edit .env with your production values
```

**Note:** Environment variables are embedded at build time. Rebuild the image after changing `.env`.

## Production Considerations

### SSL/HTTPS

For production, use a reverse proxy (Traefik, Caddy) or modify `nginx.conf`:

```nginx
server {
    listen 443 ssl;
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    # ... rest of config
}
```

### Custom Port

```bash
docker run -d -p 3000:80 refood-frontend
```

Or in `docker-compose.yml`:

```yaml
ports:
  - "3000:80"
```

## Health Check

The container includes a health check endpoint at `/`. Check status:

```bash
docker ps  # Shows health status
docker inspect --format='{{.State.Health.Status}}' refood-frontend
```

## Updating

```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```
