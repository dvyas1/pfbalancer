pipeline {
  agent {
    docker {
      args '-p 4200:4200'
      image 'node:latest'
    }

  }
  stages {
    stage('Install Packages') {
      steps {
        sh '''echo "Installing stuff"
npm install
echo "Installation complete"'''
      }
    }

    stage('Build') {
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
      steps {
        archiveArtifacts(artifacts: './dist/PortfolioBalancer6/*.*', fingerprint: true)
      }
    }

  }
  environment {
    HOME = '.'
  }
}