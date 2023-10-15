#!/bin/bash

BUCKET_NAME="ringonit.it"

npm run build
aws s3 cp $PWD/dist/index.html s3://$BUCKET_NAME/ --profile Kripmaxo --region eu-west-1
aws s3 cp $PWD/dist/assets/ s3://$BUCKET_NAME/assets/ --recursive --profile Kripmaxo --region eu-west-1

aws cloudfront create-invalidation --distribution-id E3SX7N2AI4F6CL --paths "/*" --profile Kripmaxo --region eu-west-1
