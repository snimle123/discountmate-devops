pipeline {
    agent any

    tools {
        nodejs "NodeJS_22"
    }

    environment {
        SONARQUBE = 'SonarQubeServer'  
    }

    stages {

        stage('Build') {
            steps {
                echo "Building DiscountMate backend..."
                dir('backend') {
                    bat 'npm install'
                    bat 'docker build -t discountmate:latest .'
                }
            }
        }

        stage('Test') {
            steps {
                echo "Running unit tests..."
                dir('backend') {
                    bat 'npm test'
                }
            }
        }

        stage('Code Quality') {
            steps {
                echo "Running SonarQube scan..."
                withSonarQubeEnv('SonarQubeServer') {
                    dir('backend') {
                        bat 'sonar-scanner -Dsonar.projectKey=discountmate -Dsonar.sources=.'
                    }
                }
            }
        }

        stage('Security') {
            steps {
                echo "Running Snyk security scan..."
                dir('backend') {
                    bat 'snyk test || exit 0'
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                echo "Deploying to staging on port 5000..."
                bat 'docker stop discountmate-staging || exit 0'
                bat 'docker rm discountmate-staging || exit 0'
                bat 'docker run -d -p 5000:3000 --name discountmate-staging discountmate:latest || exit 0'
            }
        }

        stage('Release to Production') {
            steps {
                echo "Promoting to production on port 6000..."
                bat 'docker stop discountmate-prod || exit 0'
                bat 'docker rm discountmate-prod || exit 0'
                bat 'docker tag discountmate:latest discountmate:prod'
                bat 'docker run -d -p 6000:3000 --name discountmate-prod discountmate:prod || exit 0'
            }
        }

        stage('Monitoring') {
            steps {
                echo "Checking health of production app..."
                bat 'curl http://localhost:6000/health || exit 1'
            }
        }
    }
}


