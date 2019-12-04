pipeline {
  agent {
    docker {
      args '-p 4200:4200'
      image 'node:slim'
    }

  }
  stages {
    stage('Install Angular Packages') {
      steps {
        sh '''npm install
'''
      }
    }

    stage('Build') {
      steps {
        sh '''echo "Building application for PROD"
ng build --prod'''
      }
    }

    stage('package') {
      steps {
        archiveArtifacts(onlyIfSuccessful: true, artifacts: 'dist/')
      }
    }

  }
  environment {
    HOME = '.'
  }
}