Write-Host "Starting deployment to Vercel..." -ForegroundColor Cyan
npx vercel --prod
Write-Host "Deployment complete!" -ForegroundColor Green