#!/bin/bash

# We have to repush the image to GCP because backend runs in CloudRun.

set -eux

# PROJECT_ID=xxx
IMAGE=kotrzina/lesempolem-backend

if [ -z "${PROJECT_ID}" ]
then
      echo "\$PROJECT_ID needs to be set"
      exit 1
fi

docker login -u oauth2accesstoken -p "$(gcloud auth print-access-token)" https://eu.gcr.io
docker build -t eu.gcr.io/${PROJECT_ID}/${IMAGE}:latest .
docker push eu.gcr.io/${PROJECT_ID}/${IMAGE}:latest
docker inspect eu.gcr.io/${PROJECT_ID}/${IMAGE}:latest | jq '.[0].RepoDigests[0]'