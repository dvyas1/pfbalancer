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
        sh '''echo "Installing Angular CLI"
mkdir build
cd build
pwd


npm uninstall angular-cli
npm cache clean or npm cache verify #(if npm > 5)
npm install @angular/cli@latest

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