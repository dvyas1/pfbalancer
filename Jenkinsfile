pipeline {
  agent {
    docker {
      args '-p 4200:4200'
      image 'node:latest'
    }

  }
  stages {
    stage('Install Angular Packages') {
      steps {
        sh '''echo "Installing stuff"
npm install
echo "installation complete"'''
      }
    }

    stage('Build') {
      steps {
        sh '''echo "building app"
npm run ng build --prod
echo "build complete"'''
      }
    }

    stage('Package Deployment') {
      steps {
        archiveArtifacts(artifacts: 'dist/*', fingerprint: true)
      }
    }

  }
  environment {
    HOME = '.'
  }
}