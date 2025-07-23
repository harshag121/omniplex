# Azure Deployment Guide for Omniplex

## 🚀 Azure Deployment - Task 3

This guide will help you deploy the Omniplex application with Stripe integration to Azure App Service.

### Prerequisites

1. **Azure Account**: Sign up at https://azure.microsoft.com
2. **Azure CLI**: Install from https://docs.microsoft.com/en-us/cli/azure/install-azure-cli
3. **Git**: Ensure Git is installed and configured

### Quick Deployment

#### Option 1: Automated Script (Recommended)
```bash
# Run the automated deployment script
./deploy-azure.sh
```

#### Option 2: Manual Deployment
```bash
# Login to Azure
az login

# Create resource group
az group create --name omniplex-rg --location eastus

# Deploy with Azure CLI
az webapp up --name omniplex-app --resource-group omniplex-rg --location eastus --sku B1
```

### Environment Configuration

After deployment, configure these environment variables in Azure Portal:

#### Required API Keys
```
BING_API_KEY=your_bing_api_key
OPENAI_API_KEY=your_openai_api_key
OPENWEATHERMAP_API_KEY=your_weather_api_key
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key
FINNHUB_API_KEY=your_finnhub_key
```

#### Firebase Configuration
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-ABCDEF
```

#### Stripe Configuration (Production)
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key
STRIPE_SECRET_KEY=sk_live_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

#### System Configuration
```
NODE_ENV=production
WEBSITES_PORT=3000
WEBSITES_ENABLE_APP_SERVICE_STORAGE=false
SCM_DO_BUILD_DURING_DEPLOYMENT=true
ENABLE_ORYX_BUILD=true
```

### Deployment Steps

1. **Create Azure Resources**
   ```bash
   ./deploy-azure.sh
   ```

2. **Configure Environment Variables**
   - Go to Azure Portal: https://portal.azure.com
   - Navigate to your App Service: `omniplex-app`
   - Go to Configuration > Application Settings
   - Add all required environment variables

3. **Deploy Code**
   ```bash
   # Add Azure as remote repository
   git remote add azure https://omniplex-app.scm.azurewebsites.net:443/omniplex-app.git
   
   # Deploy to Azure
   git push azure main
   ```

4. **Verify Deployment**
   - Visit: https://omniplex-app.azurewebsites.net
   - Check health endpoint: https://omniplex-app.azurewebsites.net/api/health
   - Test Stripe integration: https://omniplex-app.azurewebsites.net/pricing

### Post-Deployment Configuration

#### Stripe Webhook Setup
1. Go to Stripe Dashboard: https://dashboard.stripe.com
2. Navigate to Webhooks
3. Add endpoint: `https://omniplex-app.azurewebsites.net/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

#### Custom Domain (Optional)
```bash
# Add custom domain
az webapp config hostname add \
    --webapp-name omniplex-app \
    --resource-group omniplex-rg \
    --hostname your-domain.com
```

### Monitoring and Scaling

#### View Application Logs
```bash
az webapp log tail --name omniplex-app --resource-group omniplex-rg
```

#### Scale Application
```bash
# Scale up (increase instance size)
az appservice plan update --name omniplex-app-plan --resource-group omniplex-rg --sku S1

# Scale out (increase instance count)
az webapp config set --name omniplex-app --resource-group omniplex-rg --number-of-workers 2
```

### Troubleshooting

#### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify package.json scripts
   - Review build logs in Azure Portal

2. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names for typos
   - Restart app after configuration changes

3. **Stripe Integration**
   - Verify webhook URL is accessible
   - Check Stripe dashboard for webhook delivery
   - Ensure production keys are used

#### Health Check
Visit: https://omniplex-app.azurewebsites.net/api/health

#### Useful Commands
```bash
# Check deployment status
az webapp show --name omniplex-app --resource-group omniplex-rg

# Restart application
az webapp restart --name omniplex-app --resource-group omniplex-rg

# View configuration
az webapp config appsettings list --name omniplex-app --resource-group omniplex-rg
```

### Security Considerations

1. **HTTPS**: Azure App Service provides HTTPS by default
2. **Environment Variables**: Use Azure Key Vault for sensitive data
3. **Stripe Webhooks**: Verify webhook signatures
4. **CORS**: Configure appropriate CORS settings
5. **Authentication**: Ensure Firebase auth is properly configured

### Cost Optimization

- **B1 SKU**: Basic tier for development (~$13/month)
- **S1 SKU**: Standard tier for production (~$56/month)
- **Auto-scaling**: Configure based on traffic patterns
- **Application Insights**: Monitor performance and usage

### Success Criteria

✅ Application deployed to Azure
✅ All environment variables configured
✅ Stripe payments working in production
✅ Health check endpoint responding
✅ Custom domain configured (optional)
✅ Monitoring and logging enabled

### Support Resources

- **Azure Documentation**: https://docs.microsoft.com/en-us/azure/app-service/
- **Next.js on Azure**: https://docs.microsoft.com/en-us/azure/app-service/quickstart-nodejs
- **Stripe Documentation**: https://stripe.com/docs/webhooks
- **Azure CLI Reference**: https://docs.microsoft.com/en-us/cli/azure/

---

## 🎉 Deployment Complete!

Your Omniplex application with Stripe integration is now running on Azure App Service!
