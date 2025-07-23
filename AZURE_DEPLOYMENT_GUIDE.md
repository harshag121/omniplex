# Azure Deployment Guide for Omniplex

## Overview
This guide will help you deploy the Omniplex application to Azure App Service with all necessary configurations for Stripe payment integration and Firebase authentication.

## Prerequisites
1. ✅ Azure CLI installed and configured
2. ✅ Azure subscription with sufficient credits
3. ✅ Git repository with your code
4. ✅ Stripe account with production keys
5. ✅ Firebase project configured

## Deployment Steps

### Step 1: Prepare for Deployment
1. Ensure your code is committed to Git:
   ```bash
   git add .
   git commit -m "Prepare for Azure deployment"
   ```

### Step 2: Run Azure Deployment Script
1. Execute the deployment script:
   ```bash
   chmod +x deploy-azure.sh
   ./deploy-azure.sh
   ```

2. Follow the prompts to:
   - Login to Azure (if not already logged in)
   - Confirm resource creation
   - Note the deployment URL provided

### Step 3: Configure Environment Variables
1. Open Azure Portal: https://portal.azure.com
2. Navigate to your App Service: `omniplex-app`
3. Go to **Configuration** > **Application Settings**
4. Add the following environment variables from `azure-env-template.txt`:

#### Required Production Variables:
```
NODE_ENV=production
WEBSITES_PORT=3000
NEXTAUTH_URL=https://omniplex-app.azurewebsites.net
NEXTAUTH_SECRET=[generate-secure-key]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=[your-live-publishable-key]
STRIPE_SECRET_KEY=[your-live-secret-key]
STRIPE_WEBHOOK_SECRET=[your-live-webhook-secret]
```

#### Firebase Configuration:
```
NEXT_PUBLIC_FIREBASE_API_KEY=[your-api-key]
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=[your-domain]
NEXT_PUBLIC_FIREBASE_PROJECT_ID=[your-project-id]
```

### Step 4: Configure Stripe for Production
1. **Stripe Dashboard Setup:**
   - Login to https://dashboard.stripe.com
   - Switch to **Live mode** (toggle in top-left)
   - Go to **Products** and create your Pro Plan product
   - Copy the Live price ID to use in `STRIPE_PRODUCT_ID_PRO_MONTHLY`

2. **Webhook Configuration:**
   - Go to **Developers** > **Webhooks**
   - Click **Add endpoint**
   - Use URL: `https://omniplex-app.azurewebsites.net/api/stripe/webhook`
   - Select events: `checkout.session.completed`, `invoice.payment_succeeded`
   - Copy the signing secret to `STRIPE_WEBHOOK_SECRET`

### Step 5: Deploy Code to Azure
1. Add Azure as a Git remote:
   ```bash
   git remote add azure [deployment-url-from-script]
   ```

2. Deploy to Azure:
   ```bash
   git push azure main
   ```

3. Monitor deployment in Azure Portal:
   - Go to **Deployment Center** > **Logs**
   - Watch for successful build and deployment

### Step 6: Configure Custom Domain (Optional)
1. In Azure Portal, go to **Custom domains**
2. Add your custom domain
3. Configure DNS settings
4. Update `NEXTAUTH_URL` to use your custom domain

### Step 7: Set Up SSL/HTTPS
1. Azure App Service provides free SSL certificates
2. Go to **TLS/SSL settings** > **Private Key Certificates**
3. Create or import SSL certificate
4. Bind certificate to your domain

### Step 8: Configure Monitoring
1. **Application Insights:**
   - Enable in **Application Insights** section
   - Monitor performance and errors

2. **Log Stream:**
   - Use **Log stream** for real-time debugging
   - View application logs and errors

## Post-Deployment Verification

### Health Check
1. Visit your app: `https://omniplex-app.azurewebsites.net`
2. Test the health endpoint: `https://omniplex-app.azurewebsites.net/api/health`
3. Expected response:
   ```json
   {
     "status": "healthy",
     "timestamp": "2024-01-XX...",
     "environment": "production",
     "services": {
       "stripe": "connected",
       "firebase": "connected"
     }
   }
   ```

### Stripe Integration Test
1. Go to `/stripe-demo` page
2. Test payment flow with live card (use small amount like $0.50)
3. Verify webhook delivery in Stripe Dashboard
4. Check Azure logs for webhook processing

### Firebase Authentication Test
1. Test user registration/login
2. Verify user data in Firebase Console
3. Check authentication flows work properly

## Troubleshooting

### Common Issues:

1. **Build Failures:**
   - Check **Deployment Center** > **Logs**
   - Verify Node.js version compatibility
   - Ensure all dependencies are in package.json

2. **Environment Variable Issues:**
   - Verify all required variables are set
   - Check for typos in variable names
   - Restart App Service after changes

3. **Stripe Webhook Issues:**
   - Verify webhook URL is correct
   - Check webhook secret matches
   - Ensure HTTPS is enabled

4. **Firebase Connection Issues:**
   - Verify Firebase config is correct
   - Check domain authorization in Firebase Console
   - Ensure service account permissions

### Debugging Commands:
```bash
# View Azure logs
az webapp log tail --name omniplex-app --resource-group omniplex-rg

# Check app status
az webapp show --name omniplex-app --resource-group omniplex-rg --query "state"

# Restart app
az webapp restart --name omniplex-app --resource-group omniplex-rg
```

## Security Considerations

### Production Security:
1. ✅ Use HTTPS only (enforced by Azure App Service)
2. ✅ Set strong `NEXTAUTH_SECRET`
3. ✅ Use production Stripe keys only
4. ✅ Configure proper CORS origins
5. ✅ Enable Application Insights for monitoring
6. ✅ Set up proper logging levels

### Environment Variables Security:
- Never commit secrets to Git
- Use Azure Key Vault for sensitive data (advanced)
- Regularly rotate API keys
- Monitor access logs

## Scaling Considerations

### Performance Optimization:
1. **App Service Plan:**
   - Start with B1 (Basic)
   - Scale up to S1+ for production traffic
   - Consider P1V2+ for high performance

2. **Database Scaling:**
   - Use Azure Database for PostgreSQL/MySQL
   - Configure connection pooling
   - Implement caching with Redis

3. **CDN Integration:**
   - Use Azure CDN for static assets
   - Configure proper cache headers
   - Optimize images and files

## Cost Management

### Azure Costs:
- **Basic B1 Plan:** ~$13-20/month
- **Standard S1 Plan:** ~$56/month
- **Premium P1V2 Plan:** ~$146/month

### Monitoring Costs:
- Use Azure Cost Management
- Set up billing alerts
- Monitor resource usage

## Support Resources

- **Azure Documentation:** https://docs.microsoft.com/en-us/azure/app-service/
- **Next.js on Azure:** https://docs.microsoft.com/en-us/azure/static-web-apps/deploy-nextjs
- **Stripe Documentation:** https://stripe.com/docs/webhooks
- **Firebase Hosting:** https://firebase.google.com/docs/hosting

---

## Quick Reference Commands

```bash
# Deploy to Azure
./deploy-azure.sh

# Check deployment status
az webapp show --name omniplex-app --resource-group omniplex-rg

# View logs
az webapp log tail --name omniplex-app --resource-group omniplex-rg

# Restart app
az webapp restart --name omniplex-app --resource-group omniplex-rg

# Update environment variables
az webapp config appsettings set --name omniplex-app --resource-group omniplex-rg --settings KEY=VALUE
```

This deployment guide ensures a production-ready setup with proper security, monitoring, and scalability considerations.
