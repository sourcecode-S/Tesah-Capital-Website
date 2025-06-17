## Overview

This guide provides step-by-step instructions for deploying the Tesah Capital website to Microsoft Azure. The website is built with Next.js 14, TypeScript, and Tailwind CSS.

## Prerequisites

### Required Tools

- **Node.js** (version 18 or higher)
- **Git** for version control
- **Azure CLI** (Command Line Interface)
- **Code editor** (VS Code recommended)
- **Domain name** for Tesah Capital
- **Microsoft Azure account**


### Technical Knowledge Required

- Basic command line usage
- Understanding of environment variables
- Basic Git operations
- Basic Azure portal navigation


## Step 1: Azure Account Setup

### 1.1 Create Azure Account

1. Go to [portal.azure.com](https://portal.azure.com)
2. Sign up for Azure account
3. Complete verification process
4. Set up billing (free tier available)


### 1.2 Install Azure CLI

```shellscript
# Windows (using PowerShell)
Invoke-WebRequest -Uri https://aka.ms/installazurecliwindows -OutFile .\AzureCLI.msi; Start-Process msiexec.exe -Wait -ArgumentList '/I AzureCLI.msi /quiet'

# macOS
brew install azure-cli

# Linux (Ubuntu/Debian)
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

### 1.3 Login to Azure

```shellscript
az login
# Follow browser authentication process
```

## Step 2: Code Preparation

### 2.1 Download/Clone the Codebase

```shellscript
# If using Git
git clone [repository-url]
cd tesah-capital-website

# Or extract from provided ZIP file
```

### 2.2 Install Dependencies

```shellscript
# Install Node.js dependencies
npm install
```

### 2.3 Update Package Manager Configuration

Since Azure doesn't support Bun by default, update to use npm:

```json
// package.json - ensure these scripts exist
{
  "scripts": {
    "build": "next build",
    "start": "next start",
    "dev": "next dev",
    "lint": "next lint"
  }
}
```

### 2.4 Test Local Development

```shellscript
npm run dev
# Visit http://localhost:3000 to verify everything works
```

## Step 3: Azure Static Web Apps Deployment (Recommended)

### 3.1 Create Resource Group

```shellscript
az group create --name tesah-capital-rg --location "East US"
```

### 3.2 Push Code to GitHub

1. Create GitHub repository for your code
2. Push the codebase:


```shellscript
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/tesah-capital.git
git push -u origin main
```

### 3.3 Create Static Web App

```shellscript
az staticwebapp create \
  --name tesah-capital-webapp \
  --resource-group tesah-capital-rg \
  --source https://github.com/yourusername/tesah-capital \
  --location "East US2" \
  --branch main \
  --app-location "/" \
  --api-location "api" \
  --output-location ".next"
```

### 3.4 Configure Build Settings

Create `.github/workflows/azure-static-web-apps-[random-name].yml`:

```yaml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main

jobs:
  build_and_deploy_job:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
      - name: Build And Deploy
        id: builddeploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/"
          api_location: ""
          output_location: ".next"
        env:
          NODE_VERSION: "18"
          NPM_CONFIG_PRODUCTION: false
```

## Step 4: Alternative - Azure App Service (For Full Server Features)

### 4.1 Create App Service Plan

```shellscript
az appservice plan create \
  --name tesah-capital-plan \
  --resource-group tesah-capital-rg \
  --sku B1 \
  --is-linux
```

### 4.2 Create Web App

```shellscript
az webapp create \
  --resource-group tesah-capital-rg \
  --plan tesah-capital-plan \
  --name tesah-capital-app \
  --runtime "NODE|18-lts" \
  --deployment-source-url https://github.com/yourusername/tesah-capital \
  --deployment-source-branch main
```

### 4.3 Configure App Settings

```shellscript
az webapp config appsettings set \
  --resource-group tesah-capital-rg \
  --name tesah-capital-app \
  --settings \
    NODE_ENV=production \
    WEBSITE_NODE_DEFAULT_VERSION=18.17.0 \
    SCM_DO_BUILD_DURING_DEPLOYMENT=true
```

## Step 5: Database Setup - Azure Database for PostgreSQL

### 5.1 Create PostgreSQL Server

```shellscript
az postgres flexible-server create \
  --resource-group tesah-capital-rg \
  --name tesah-capital-db \
  --location "East US" \
  --admin-user tesahadmin \
  --admin-password "YourSecurePassword123!" \
  --sku-name Standard_B1ms \
  --tier Burstable \
  --public-access 0.0.0.0 \
  --storage-size 32
```

### 5.2 Create Database

```shellscript
az postgres flexible-server db create \
  --resource-group tesah-capital-rg \
  --server-name tesah-capital-db \
  --database-name tesahcapital
```

### 5.3 Configure Firewall Rules

```shellscript
# Allow Azure services
az postgres flexible-server firewall-rule create \
  --resource-group tesah-capital-rg \
  --name tesah-capital-db \
  --rule-name AllowAzureServices \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0

# Allow your IP (for management)
az postgres flexible-server firewall-rule create \
  --resource-group tesah-capital-rg \
  --name tesah-capital-db \
  --rule-name AllowMyIP \
  --start-ip-address YOUR_IP_ADDRESS \
  --end-ip-address YOUR_IP_ADDRESS
```

## Step 6: File Storage - Azure Blob Storage

### 6.1 Create Storage Account

```shellscript
az storage account create \
  --name tesahcapitalstorage \
  --resource-group tesah-capital-rg \
  --location "East US" \
  --sku Standard_LRS \
  --kind StorageV2
```

### 6.2 Create Blob Container

```shellscript
# Get storage account key
STORAGE_KEY=$(az storage account keys list \
  --resource-group tesah-capital-rg \
  --account-name tesahcapitalstorage \
  --query '[0].value' -o tsv)

# Create container for file uploads
az storage container create \
  --name uploads \
  --account-name tesahcapitalstorage \
  --account-key $STORAGE_KEY \
  --public-access blob
```

## Step 7: Environment Variables Configuration

### 7.1 For Static Web Apps

In Azure Portal → Static Web Apps → Configuration:

```shellscript
NEXT_PUBLIC_API_URL=https://your-app-name.azurestaticapps.net
DATABASE_URL=postgresql://tesahadmin:YourSecurePassword123!@tesah-capital-db.postgres.database.azure.com:5432/tesahcapital?sslmode=require
AZURE_STORAGE_ACCOUNT_NAME=tesahcapitalstorage
AZURE_STORAGE_ACCOUNT_KEY=your-storage-key
AZURE_STORAGE_CONTAINER_NAME=uploads
NODE_ENV=production
```

### 7.2 For App Service

```shellscript
az webapp config appsettings set \
  --resource-group tesah-capital-rg \
  --name tesah-capital-app \
  --settings \
    NEXT_PUBLIC_API_URL=https://tesah-capital-app.azurewebsites.net \
    DATABASE_URL="postgresql://tesahadmin:YourSecurePassword123!@tesah-capital-db.postgres.database.azure.com:5432/tesahcapital?sslmode=require" \
    AZURE_STORAGE_ACCOUNT_NAME=tesahcapitalstorage \
    AZURE_STORAGE_ACCOUNT_KEY="your-storage-key" \
    AZURE_STORAGE_CONTAINER_NAME=uploads \
    NODE_ENV=production
```

## Step 8: Custom Domain Setup

### 8.1 Purchase Domain

- Use Azure Domain Services or external registrar
- Recommended: `tesahcapital.com` or `tesahcapital.gh`


### 8.2 Configure Custom Domain (Static Web Apps)

```shellscript
az staticwebapp hostname set \
  --name tesah-capital-webapp \
  --resource-group tesah-capital-rg \
  --hostname tesahcapital.com
```

### 8.3 Configure DNS Records

At your domain registrar, add:

```plaintext
Type: CNAME
Name: www
Value: your-app-name.azurestaticapps.net

Type: CNAME  
Name: @
Value: your-app-name.azurestaticapps.net
```

### 8.4 SSL Certificate

Azure automatically provides SSL certificates for custom domains.

## Step 9: Email Service - Azure Communication Services

### 9.1 Create Communication Service

```shellscript
az communication create \
  --name tesah-capital-communication \
  --resource-group tesah-capital-rg \
  --location "Global" \
  --data-location "United States"
```

### 9.2 Alternative: Use SendGrid on Azure Marketplace

1. Go to Azure Marketplace
2. Search for "SendGrid"
3. Create SendGrid resource
4. Get API key from SendGrid dashboard


### 9.3 Add Email Environment Variables

```shellscript
# For SendGrid
SENDGRID_API_KEY=SG.your-api-key
FROM_EMAIL=noreply@tesahcapital.com
CONTACT_EMAIL=info@tesahcapital.com

# For Azure Communication Services
AZURE_COMMUNICATION_CONNECTION_STRING=your-connection-string
```

## Step 10: Monitoring and Analytics

### 10.1 Enable Application Insights

```shellscript
az monitor app-insights component create \
  --app tesah-capital-insights \
  --location "East US" \
  --resource-group tesah-capital-rg \
  --application-type web
```

### 10.2 Configure Application Insights

Add to environment variables:

```shellscript
APPLICATIONINSIGHTS_CONNECTION_STRING=your-connection-string
```

### 10.3 Set Up Alerts

```shellscript
az monitor metrics alert create \
  --name "High Response Time" \
  --resource-group tesah-capital-rg \
  --scopes /subscriptions/your-subscription/resourceGroups/tesah-capital-rg/providers/Microsoft.Web/sites/tesah-capital-app \
  --condition "avg requests/duration > 1000" \
  --description "Alert when response time is high"
```

## Step 11: Security Configuration

### 11.1 Enable Azure Key Vault

```shellscript
az keyvault create \
  --name tesah-capital-vault \
  --resource-group tesah-capital-rg \
  --location "East US"
```

### 11.2 Store Secrets in Key Vault

```shellscript
az keyvault secret set \
  --vault-name tesah-capital-vault \
  --name "DatabasePassword" \
  --value "YourSecurePassword123!"

az keyvault secret set \
  --vault-name tesah-capital-vault \
  --name "JWTSecret" \
  --value "your-jwt-secret"
```

### 11.3 Configure Managed Identity

```shellscript
az webapp identity assign \
  --resource-group tesah-capital-rg \
  --name tesah-capital-app
```

## Step 12: Backup and Disaster Recovery

### 12.1 Database Backup

```shellscript
az postgres flexible-server backup create \
  --resource-group tesah-capital-rg \
  --name tesah-capital-db \
  --backup-name initial-backup
```

### 12.2 Storage Account Backup

Enable geo-redundant storage:

```shellscript
az storage account update \
  --name tesahcapitalstorage \
  --resource-group tesah-capital-rg \
  --sku Standard_GRS
```

## Step 13: Testing and Go-Live

### 13.1 Pre-Launch Testing

Test these features on your live Azure site:

- Homepage loads correctly
- Navigation works on all pages
- Contact form submits successfully
- Job application form works with file uploads
- Investment calculators function properly
- Admin panel is accessible
- Mobile responsiveness
- Database connectivity
- File upload to Azure Blob Storage


### 13.2 Performance Testing

```shellscript
# Use Azure Load Testing (optional)
az load test create \
  --name tesah-capital-loadtest \
  --resource-group tesah-capital-rg
```

### 13.3 Security Testing

- Run Azure Security Center recommendations
- Test SSL certificate
- Verify firewall rules


## Step 14: Cost Management

### 14.1 Set Up Cost Alerts

```shellscript
az consumption budget create \
  --resource-group tesah-capital-rg \
  --budget-name tesah-capital-budget \
  --amount 100 \
  --time-grain Monthly \
  --start-date 2024-01-01 \
  --end-date 2024-12-31
```

### 14.2 Monitor Costs

- Use Azure Cost Management dashboard
- Set up billing alerts
- Review resource utilization monthly


## Cost Estimation (Monthly)

### Production Setup

- **App Service (B1)**: ~$13/month
- **PostgreSQL (Burstable B1ms)**: ~$12/month
- **Storage Account**: ~$2/month
- **Static Web Apps**: Free tier available
- **Application Insights**: ~$5/month
- **Domain**: ~$1/month (if using Azure DNS)
- **Total**: ~$33/month


### Enterprise Setup

- **App Service (P1V2)**: ~$73/month
- **PostgreSQL (General Purpose)**: ~$50/month
- **Premium Storage**: ~$10/month
- **Load Balancer**: ~$18/month
- **Total**: ~$151/month


## Troubleshooting Common Issues

### Build Failures

```shellscript
# Check deployment logs
az webapp log tail --resource-group tesah-capital-rg --name tesah-capital-app

# Common fixes:
# 1. Ensure Node.js version is correct
# 2. Check package.json scripts
# 3. Verify environment variables
```

### Database Connection Issues

```shellscript
# Test connection
az postgres flexible-server connect \
  --name tesah-capital-db \
  --admin-user tesahadmin \
  --admin-password "YourSecurePassword123!"
```

### Storage Issues

```shellscript
# Check storage account status
az storage account show \
  --name tesahcapitalstorage \
  --resource-group tesah-capital-rg
```

## Ongoing Maintenance

### 14.1 Regular Updates

- Monitor Azure Service Health
- Update Node.js runtime monthly
- Review security recommendations
- Update SSL certificates (automatic)


### 14.2 Backup Schedule

- Database: Automated daily backups
- Storage: Geo-redundant replication
- Application code: Git repository


### 14.3 Monitoring

- Set up Azure Monitor dashboards
- Configure log analytics
- Review performance metrics weekly


## Support Resources

### Azure Support

- [Azure Documentation](https://docs.microsoft.com/azure/)
- [Azure Support Plans](https://azure.microsoft.com/support/plans/)
- Azure Portal help and support


### Community Resources

- [Azure Community](https://techcommunity.microsoft.com/azure)
- [Stack Overflow - Azure](https://stackoverflow.com/questions/tagged/azure)
- [GitHub - Azure Samples](https://github.com/Azure-Samples)


## Final Checklist

Before going live:

- All Azure resources are created
- Environment variables are configured
- Custom domain is set up with SSL
- Database is connected and accessible
- File storage is working
- Email service is configured
- Monitoring is enabled
- Backup strategy is in place
- Security settings are configured
- Cost alerts are set up
- All application features tested
- Performance benchmarks met


## Emergency Contacts

Keep these handy:

- Azure Support ticket system
- Domain registrar support
- Your development team contact
- Database administrator contact
