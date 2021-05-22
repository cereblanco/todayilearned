# Notes: Amazon Simple Storage Service (S3)

There are three possible ways to access/manage S3 and its objects
1. AWS Management console https://s3.console.aws.amazon.com/s3/
1. AWS Command Line Interface (CLI)
1. Using SDKs
#### 1. [AWS Management Console](https://s3.console.aws.amazon.com/s3/)

-  Using the Web Console, we can perform S3 operations (i.e. browse a bucket, upload an object, download an object, update object permissions and metadata, ...). Best option for administrators, or any users who prefer to use a graphical interface.

#### 2. [AWS CLI](https://docs.aws.amazon.com/polly/latest/dg/setup-aws-cli.html)

- If we want to use terminal/command-prompt instead, we can use *AWS CLI*. This is the best option if we want to download or upload in bulk (something we cannot do with the Web Console). We can sync a local folder to the destination bucket and vice versa.

- Checkout my cheat sheet for Mac [here](https://gist.github.com/cereblanco/5d1dc6687d426d644c02141d0de90ef0).

#### 3. Using SDKs

- If we want to use S3 in our *application/server* programatically, we can use *SDK*s. Best option for `automating` pre-processing/post-processing the objects in S3. Operative word is `automate`.

  - python -> [boto3](https://github.com/boto/boto3)
  - javascript -> [aws-sdk-js](https://github.com/aws/aws-sdk-js)

  **The use case for PresignedURLs**

  - If we want to allow third parties to have temporary access to an S3 object, the best option would be to use [Pre-signed URLs](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3-presigned-urls.html. With presigned URLs, client applications can directly talk with S3 instead of talking to our media service and our media service proxy-ing the requests to S3.

  For instance, in our illustration below, all requests from the client pass thru our media service, and our media service talks to S3 on client's behalf. Obviously, this introduces unnecessary load and cost on or media service.

![Pre-signed URLs](media-service-as-proxy.png)

  Presigned URLs, resolve this issue; our media service just generates a presigned URL, gives them to client, then client directly accesses S3.

![Pre-signed URLs](presigned-urls-flow.png)

  - We can use **SDKs** or **AWS CLI** to generate presigned-urls.

**Some Notes**
