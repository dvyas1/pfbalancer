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
mkdir build
cd build
pwd


ng version

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
}