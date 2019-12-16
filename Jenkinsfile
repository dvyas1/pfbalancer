

deploymentBkt = ''

/**
* This method generates S3 Bucket name based on branch
*/
deploymentBkt = ""
def generateBucketName() {
  def bktName = "pfbalancer001"
  bktName = bktName + env.BRANCH_NAME + Math.random()
}

pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile.build'
    }
  }

  parameters {
    string(name: 'devopsbucket', defaultValue: '', description: 'Bucket name for develop branch')
    string(name: 'masterbucket', defaultValue: '', description: 'Bucket name for master branch')
    string(name: 'tempbucket', defaultValue: '', description: 'Bucket name for any other non-standard branch')
  }

  stages {
    stage('Build App') {
      steps {
        sh '''echo "Installing NPM Packages"
npm install
echo "Installation complete"'''
        sh '''echo "Build App"
npm run ng build --prod
echo "Build App Complete"'''
      }
    }

    stage('Deploy to S3') {
      steps {

        script {
          deploymentBkt = generateBucketName()
          echo "bucketname ${deploymentBkt}"
        }

        sh "aws s3api create-bucket --bucket ${deploymentBkt} --region us-east-1 --acl private"
        sh "aws s3 cp dist s3://${deploymentBkt}/ --recursive"
        
      }
    }

  }
  environment {
    HOME = '.'
  }
}