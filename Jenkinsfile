pipeline {
  agent none
  
  stages {
    stage('Install Packages') {
      agent {
        docker {
          args '-p 4200:4200'
          image 'node:latest'
        }
      }
      steps {
        sh '''echo "Installing stuff"
npm install
echo "Installation complete"'''
      }
    }

    stage('Build') {
      agent {
        docker {
          args '-p 4200:4200'
          image 'node:latest'
        }
      }
      steps {
        sh '''echo "building app"
npm run ng build --prod
echo "build complete"

echo "*****************************"
pwd
echo "*****************************"'''
      }
    }

    stage('Package Deployment') {
      agent {
        docker {
          args '-p 4200:4200'
          image 'node:latest'
        }
      }
      steps {
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
        sh 'ls -ltr'
      }
    }

  }
  environment {
    HOME = '.'
  }
}