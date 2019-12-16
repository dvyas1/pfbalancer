pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile.build'
    }

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
          echo "${params}"
          def bucketName = ''
          if (env.BRANCH_NAME == 'master') {
            echo 'This is a master branch'
            bucketName = "${params.masterbucket}"
          } else if (env.BRANCH_NAME == 'develop') {
            echo 'This is a develop branch'
            bucketName = "${params.developbucket}"
          } else {
            echo 'this is a temp branch'
            echo "${params.tempbucket}"
            bucketName = "${params.tempbucket}"
          }
          echo bucketName
        }

        sh 'echo ${bucketName}'
      }
    }

  }
  environment {
    HOME = '.'
  }
  parameters {
    string(name: 'devopsbucket', defaultValue: '', description: 'Bucket name for develop branch')
    string(name: 'masterbucket', defaultValue: '', description: 'Bucket name for master branch')
    string(name: 'tempbucket', defaultValue: '', description: 'Bucket name for any other non-standard branch')
  }
}