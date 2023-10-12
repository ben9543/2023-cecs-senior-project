import boto3
from botocore.exceptions import NoCredentialsError

# Replace these with your own AWS credentials and S3 bucket name

class S3_API():

    # Access Key & Secret Key will be required
    def __init__(self, aws_access_key_id, aws_secret_access_key):
        self.aws_access_key_id = aws_access_key_id
        self.aws_secret_access_key = aws_secret_access_key

    def upload_to_s3(self, uploaded_file, bucket_name, s3_object_key):
        try:
            s3 = boto3.client('s3', aws_access_key_id=self.aws_access_key_id, aws_secret_access_key=self.aws_secret_access_key)
            s3.upload_fileobj(uploaded_file, bucket_name, s3_object_key)
            print(f'Successfully uploaded the image file to {bucket_name}/{s3_object_key}')
        except NoCredentialsError:
            return 'AWS credentials not found'
        except Exception as e:
            return f'Error uploading image to S3: {str(e)}'