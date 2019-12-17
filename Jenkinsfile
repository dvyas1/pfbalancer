
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

    stage('Deploy to S3') {
      steps {

        script {
          deploymentBkt = generateBucketName()
          echo "deployment bucketname:" + deploymentBkt
        }

        sh "aws s3api create-bucket --bucket ${deploymentBkt} --region us-east-1 --acl public-read"
        sh "aws s3 cp dist/PortfolioBalancer s3://${deploymentBkt}/ --recursive"
        sh "aws s3 website s3://${deploymentBkt}/ --index-document index.html --error-document index.html"

      }
      
    }

  }
  environment {
    HOME = '.'
  }
}