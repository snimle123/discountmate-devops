pipeline {
    agent any

    environment {
        SONARQUBE = 'SonarQubeServer'  
    }

    stages {

        stage('Build') {
            steps {
                echo "Building DiscountMate backend..."
                dir('backend') {
                    sh 'npm install'
                    sh 'docker build -t discountmate:latest .'
                }
            }
        }

        stage('Test') {
            steps {
                echo "Running unit tests..."
                dir('backend') {
                    sh 'npm test'
                }
            }
        }

        stage('Code Quality') {
            steps {
                echo "Running SonarQube scan..."
                withSonarQubeEnv('SonarQubeServer') {
                    dir('backend') {
                        sh 'sonar-scanner -Dsonar.projectKey=discountmate -Dsonar.sources=.'
                    }
                }
            }
        }

        stage('Security') {
            steps {
                echo "Running Snyk security scan..."
                dir('backend') {
                    sh 'snyk test || true'   
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                echo "Deploying to staging..."
                sh 'docker run -d -p 3000:3000 --name discountmate-staging discountmate:latest || true'
            }
        }

        stage('Release to Production') {
            steps {
                echo "Promoting to production..."
                sh 'docker tag discountmate:latest discountmate:prod'
                sh 'docker run -d -p 4000:3000 --name discountmate-prod discountmate:prod || true'
            }
        }

        stage('Monitoring') {
            steps {
                echo "Checking health of production app..."
                sh 'curl http://localhost:4000/health || exit 1'
            }
        }
    }
}
