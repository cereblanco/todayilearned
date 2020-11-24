### Notes: AWS S3

Three ways to access S3
1. AWS Management console https://s3.console.aws.amazon.com/s3/
2. AWS Command Line Interface (CLI)
3. Using SDKs
   


#### 1. [AWS Management Console](https://s3.console.aws.amazon.com/s3/)
- requires login credentials
- allows user to perform S3 operations (upload/download/update object permissions) using the AWS web UI


#### 2. [AWS CLI](https://docs.aws.amazon.com/polly/latest/dg/setup-aws-cli.html)
- requires installation of AWS CLI on your computer
- requires correct setup of AWS config file on your computer
- [S3 Cheat sheet on Mac](https://gist.github.com/cereblanco/5d1dc6687d426d644c02141d0de90ef0)

#### 3. Using SDKs
- allows access to S3 programatically using libraries
  - python -> [boto3](https://github.com/boto/boto3)
  - javascript -> [aws-sdk-js](https://github.com/aws/aws-sdk-js)


### [Pre-signed URLs](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3-presigned-urls.html)

- allows third parties to have temporary access to your S3 and S3 objects



