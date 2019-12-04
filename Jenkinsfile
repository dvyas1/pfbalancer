pipeline {
  agent {
    docker {
      args '-p 4200:4200'
      image 'myimage:dev'
    }

  }
  stages {
    stage('Install Angular Packages') {
      steps {
        sh '''echo "Installing Angular CLI"
pwd
ls -ltr

echo "angular install"
npm install

echo "Angular CLI and other required packages installed"'''
      }
    }

    stage('Build') {
      steps {
        sh '''echo "Building application for PROD"
ng build --prod'''
      }
    }

  }
  environment {
    HOME = '.'
  }
}