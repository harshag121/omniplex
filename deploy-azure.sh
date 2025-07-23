#!/bin/bash

# Azure Deployment Script for Omniplex
set -e

echo "🚀 Starting Azure Deployment for Omniplex..."

# Configuration
APP_NAME="omniplex-app"
RESOURCE_GROUP="omniplex-rg"
LOCATION="eastus"
SKU="B1"

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo "❌ Azure CLI not found. Please install Azure CLI first."
    echo "Visit: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
    exit 1
fi

# Login check
echo "🔐 Checking Azure login status..."
if ! az account show &> /dev/null; then
    echo "🔑 Please login to Azure..."
    az login
fi

# Create resource group if it doesn't exist
echo "📦 Creating resource group if needed..."
az group create --name $RESOURCE_GROUP --location $LOCATION || true

# Create App Service Plan
echo "🏗️ Creating App Service Plan..."
az appservice plan create \
    --name "${APP_NAME}-plan" \
    --resource-group $RESOURCE_GROUP \
    --location $LOCATION \
    --sku $SKU \
    --is-linux || true

# Create Web App
echo "🌐 Creating Web App..."
az webapp create \
    --name $APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --plan "${APP_NAME}-plan" \
    --runtime "NODE:18-lts" || true

# Configure App Settings
echo "⚙️ Configuring App Settings..."
az webapp config appsettings set \
    --name $APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --settings \
        NODE_ENV=production \
        WEBSITES_PORT=3000 \
        WEBSITES_ENABLE_APP_SERVICE_STORAGE=false \
        SCM_DO_BUILD_DURING_DEPLOYMENT=true \
        ENABLE_ORYX_BUILD=true

# Enable continuous deployment from local Git
echo "🔄 Setting up deployment source..."
az webapp deployment source config-local-git \
    --name $APP_NAME \
    --resource-group $RESOURCE_GROUP

# Get deployment URL
DEPLOY_URL=$(az webapp deployment list-publishing-credentials \
    --name $APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --query "scmUri" \
    --output tsv)

echo "✅ Azure resources created successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Set environment variables in Azure Portal:"
echo "   - Go to: https://portal.azure.com"
echo "   - Navigate to App Service: $APP_NAME"
echo "   - Go to Configuration > Application Settings"
echo "   - Add your API keys and Stripe configuration"
echo ""
echo "2. Deploy your code:"
echo "   git remote add azure $DEPLOY_URL"
echo "   git push azure main"
echo ""
echo "3. Your app will be available at:"
echo "   https://$APP_NAME.azurewebsites.net"
echo ""
echo "🎉 Deployment configuration complete!"
