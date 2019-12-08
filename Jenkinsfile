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
ng version
echo "installation complete"
echo "*********************************"
echo "regular path"
echo \'$PATH\'
echo \'#################################\'
echo \'jenkins path\'
echo "$PATH"'''
      }
    }

    stage('Build') {
      steps {
        sh '''echo "building app"
ng build --prod
echo "build complete"'''
      }
    }

  }
  environment {
    HOME = '.'
  }
}