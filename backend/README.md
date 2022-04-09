# Backend

Application uses [universal-store-api](https://github.com/kozaktomas/universal-store-api) project with connection to AWS
s3 bucket.

## Development

You can run your own instance of backend on localhost using Docker.

```bash
docker run -p 8080:8080 -v $(pwd)/config.yml:/app/config.yml ghcr.io/kozaktomas/universal-store-api:main run /app/config.yml mem
```

Backend application is now up and running on port 8080 and stores data to memory. It means all changes will be lost
after restart.