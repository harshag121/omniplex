# Azure Deployment Scripts and Configuration

# Build script for Azure App Service
build:
	npm install
	npm run build

# Start script for production
start:
	npm start

# Azure deployment configuration
deploy-azure:
	az webapp up --name omniplex-app --resource-group omniplex-rg --location "East US" --sku B1
