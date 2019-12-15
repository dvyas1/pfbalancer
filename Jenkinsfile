pipeline {
  agent {
    docker {
      args '-p 4200:4200'
      image 'node:latest'
    }

  }
  stages {
    stage('Install Packages') {
      steps {
        sh '''echo "Installing stuff"
npm install
apt-get install tree --yes
pip3 install awscli --upgrade --user
echo "Installation complete"'''
      }
    }

    stage('Build') {
      steps {
        sh '''echo "building app"
npm run ng build --prod
echo "build complete"

echo "tree output"
tree'''
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