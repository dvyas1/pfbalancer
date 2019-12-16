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
        archiveArtifacts(artifacts: 'dist/PortfolioBalancer6/*.*', fingerprint: true)
      }
    }

    stage('Deploy to S3') {
      steps {
        echo 'Testing Message'
        sh '''pwd
echo "****************************"
ls -R
echo "****************************"'''
      }
    }

  }
  environment {
    HOME = '.'
  }
}
