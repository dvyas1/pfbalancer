

deploymentBkt = ''


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
          echo "${params}"
          if (env.BRANCH_NAME == 'master') {
            echo 'This is a master branch'
            deploymentBkt = "${params.masterbucket}"
          } else if (env.BRANCH_NAME == 'develop') {
            echo 'This is a develop branch'
            deploymentBkt = "${params.developbucket}"
          } else {
            echo 'this is a temp branch'
            echo "${params.tempbucket}"
            deploymentBkt = "${params.tempbucket}"
          }
          echo deploymentBkt
        }

        sh '''aws --version
echo "*********************"
echo "bkt: ${deploymentBkt}"
echo "*********************"'''
      }
    }

  }
  environment {
    HOME = '.'
  }
}