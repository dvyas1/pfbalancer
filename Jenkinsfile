pipeline {
  agent none
  stages {
    stage('Build App') {
      agent {
        docker {
          args '-p 4200:4200'
          image 'node:latest'
        }

      }
      steps {
        sh '''echo "Installing NPM Packages"
npm install
echo "Installation complete"'''
        sh '''echo "Build App"
npm run ng build --prod
echo "Build App Complete"'''
        archiveArtifacts(artifacts: 'dist/PortfolioBalancer6/*.*', fingerprint: true)
      }
    }

    stage('Deploy to S3') {
      agent {
        docker {
          image 'mikesir87/aws-cli:latest'
        }

      }
      steps {
        echo 'Testing Message'
        sh '''pwd
echo "****************************"
ls -R
echo "****************************"'''
      }
    }

  }
  environment {
    HOME = '.'
  }
}