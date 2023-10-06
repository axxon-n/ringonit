#!/bin/bash

BUCKET_NAME="ringonit.it"

npm run build
aws s3 cp $PWD/dist/index.html s3://$BUCKET_NAME/
aws s3 cp $PWD/dist/assets/ s3://$BUCKET_NAME/assets/ --recursive
