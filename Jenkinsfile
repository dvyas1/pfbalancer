pipeline {
  agent {
    docker {
      args '-p 4200:4200'
      image 'ubuntu:latest'
    }

  }
  stages {
    stage('Install Angular Packages') {
      steps {
        sh '''echo "Installing Angular CLI"
mkdir build
cd build
pwd
sudo mkdir /.npm
sudo chown -R 111:115 "/.npm"
npm uninstall -g angular-cli
npm cache clean or npm cache verify #(if npm > 5)
npm install -g @angular/cli@latest

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