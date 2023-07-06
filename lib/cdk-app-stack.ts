import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import {aws_dynamodb} from "aws-cdk-lib";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    //Bucket Construct
    const bucket = new s3.Bucket(this, 'avatar-bucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    })

    //Table construct
    const table = new dynamodb.Table(this, 'todos-table', {
      partitionKey: {name: 'id', type: dynamodb.AttributeType.NUMBER},
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    })

    //Output Construct
    new cdk.CfnOutput(this, 'bucketName',{
      value: bucket.bucketName,
    });
    new cdk.CfnOutput(this, 'tableName', {value: table.tableName})


    // example resource
    // const queue = new sqs.Queue(this, 'CdkAppQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
