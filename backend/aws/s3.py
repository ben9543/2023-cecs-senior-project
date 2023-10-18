import boto3
from botocore.exceptions import NoCredentialsError

# Replace these with your own AWS credentials and S3 bucket name

class S3_API():

    # Access Key & Secret Key will be required
    def __init__(self, aws_access_key_id, aws_secret_access_key, region="us-west-1", bucket_name="studyspot-123"):
        self.aws_access_key_id = aws_access_key_id
        self.aws_secret_access_key = aws_secret_access_key
        self.region = region
        self.bucket_name = bucket_name
        self.client = boto3.client('s3', aws_access_key_id=self.aws_access_key_id, aws_secret_access_key=self.aws_secret_access_key)

    def generate_object_url_from_key(self, key):
        return f"https://{self.bucket_name}.s3.{self.region}.amazonaws.com/{key}"

    def list_bucket_all(self):
        result = []
        for obj in self.client.list_objects_v2(Bucket=self.bucket_name)['Contents']:
            key = obj['Key']
            url = self.generate_object_url_from_key(key)
            result.append({"url": url, "key":key})
        return result
    
    # Will be used to limit the response to keys that begin with the specified prefix such as university name
    def list_bucket_by_prefix(self, prefix):
        result = []
        for obj in self.client.list_objects_v2(Bucket=self.bucket_name, Prefix=prefix)['Contents']:
            key = obj['Key']
            url = self.generate_object_url_from_key(key)
            result.append({"url": url, "key":key})
        return result

    def upload_to_s3(self, uploaded_file, s3_object_key):
        try:
            self.client.upload_fileobj(uploaded_file, self.bucket_name, s3_object_key)
            print(f'Successfully uploaded the image file to {self.bucket_name}/{s3_object_key}')
        except NoCredentialsError:
            return 'AWS credentials not found'
        except Exception as e:
            return f'Error uploading image to S3: {str(e)}'