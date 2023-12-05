from aws.s3 import S3_API

# S3 Object (Sample code)
# Make sure to replace "****" accordingly to your bucket settings for testing.
access_key = "****"
secret_key = "****"
region = "us-west-1" 
bucket_name = "studyspot-123"
s3_instance = S3_API(access_key, secret_key, region, bucket_name)
objects = s3_instance.list_bucket_all()
for o in objects:
    print(o)