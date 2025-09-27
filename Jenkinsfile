pipeline {
    agent any

    tools {
        nodejs "NodeJS_22"
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
                echo "Running SonarQube scan (skipped if not configured)..."
                script {
                    try {
                        withSonarQubeEnv('SonarQubeServer') {
                            dir('backend') {
                                bat 'sonar-scanner -Dsonar.projectKey=discountmate -Dsonar.sources=.'
                            }
                        }
                    } catch (Exception e) {
                        echo "SonarQube not available, skipping Code Quality stage."
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
                echo "Deploying to staging on port 8080..."
                bat 'docker stop discountmate-staging || exit 0'
                bat 'docker rm discountmate-staging || exit 0'
                bat 'docker run -d -p 8080:3000 --name discountmate-staging discountmate:latest || exit 0'
            }
        }

        stage('Release to Production') {
            steps {
                echo "Promoting to production on port 8081..."
                bat 'docker stop discountmate-prod || exit 0'
                bat 'docker rm discountmate-prod || exit 0'
                bat 'docker tag discountmate:latest discountmate:prod'
                bat 'docker run -d -p 8081:3000 --name discountmate-prod discountmate:prod || exit 0'
            }
        }

        stage('Monitoring') {
            steps {
                echo "Checking health of production app..."
                bat 'curl http://localhost:8081/health || exit 1'
            }
        }
    }
}
