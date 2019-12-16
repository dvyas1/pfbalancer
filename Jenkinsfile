pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile.build'
    }
  }

  parameters {
    string(name: 'devops-bucket', defaultValue: '' description: 'Bucket name for develop branch')
    string(name: 'master-bucket', defaultValue: '' description: 'Bucket name for master branch')
    string(name: 'temp-bucket', defaultValue: '' description: 'Bucket name for any other non-standard branch')
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
          def bucketName = ''
          if (env.BRANCH_NAME == 'master') {
            echo 'This is a master branch'
            bucketName = params.master-bucket
          } else if (env.BRANCH_NAME == 'develop') {
            echo 'This is a develop branch'
            bucketName = params.develop-bucket
          } else {
            echo 'this is a temp branch'
            bucketName = params.develop-bucket
          }
          echo bucketName
        }

        sh '''aws --version
echo "*********************"
echo "${bucketName}"
echo "*********************"'''
      }
    }

  }
  environment {
    HOME = '.'
  }
}