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
        sh '''npm install
'''
      }
    }

    stage('Build') {
      steps {
        sh 'ng build --prod'
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