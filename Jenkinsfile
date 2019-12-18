
/**
* This method generates S3 Bucket name based on branch
*/
deploymentBkt = ""
def generateBucketName() {
  return "pfbalancer-" + env.BRANCH_NAME + "-" + "${currentBuild.number}"
} 

pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile.build'
    }
  }

  stages {
    stage('Build App') {
      steps {
        sh "npm install"
        sh "npm run ng build --prod"
      }
    }

    stage('Run Unit Tests') {
      steps {
        sh "npm run ci-test"
      }
    }

    stage('Run End to End Integration Tests') {
      steps {
        sh "npm run e2e"
      }
    }

    stage('Deploy to S3') {
      steps {

        //get bucket name
        script {
          deploymentBkt = generateBucketName()
          echo "deployment bucketname:" + deploymentBkt
        }

        //create bucket
        sh "aws s3api create-bucket --bucket ${deploymentBkt} --region us-east-1 --acl public-read"
        // copy resources
        sh "aws s3 cp dist/PortfolioBalancer s3://${deploymentBkt}/ --recursive"
        //mark bucket as website
        sh "aws s3 website s3://${deploymentBkt}/ --index-document index.html --error-document index.html"
        //create bucket policy
        writeFile file: "policy.json", text: "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":\"*\",\"Action\":\"s3:GetObject\",\"Resource\":\"arn:aws:s3:::${deploymentBkt}/*\"}]}"
        //sh "cat policy.json"
        //apply policy to bucket
        sh "aws s3api put-bucket-policy --bucket ${deploymentBkt} --policy file://policy.json"

      }
      
    }

  }
  environment {
    HOME = '.'
  }
}