pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile.build'
    }

  }
  stages {
    stage('Build App') {
      steps {
        sh '''echo "Installing NPM Packages"
npm install
echo "Installation complete"'''
        sh '''echo "Build App"
npm run ng build --prod
echo "Build App Complete"'''
      }
    }

    stage('Deploy to S3') {
      steps {
        sh '''aws --version
echo "*********************"
printenv
echo "*********************"'''
      }
    }

  }
  environment {
    HOME = '.'
  }
}