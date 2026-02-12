#!/bin/bash

# Configuration
# Google Cloud usernames from email are often formatted like this: user_gmail_com
SERVER_IP="uaecodes.com"
SSH_USER="faztrick" # Adjust if your actual SSH username is different (e.g., faztrick_gmail_com)
REMOTE_DIR="/var/www/educore"

echo "🚀 Starting deployment to $SERVER_IP..."

# 1. Build the project
echo "📦 Building the application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Aborting."
    exit 1
fi

# 2. Prepare remote directory (requires sudo access on server)
echo "📂 Preparing remote directory..."
ssh $SSH_USER@$SERVER_IP "sudo mkdir -p $REMOTE_DIR && sudo chown -R $SSH_USER:$SSH_USER $REMOTE_DIR"

# 3. Upload files
echo "Cc_Uploading files..."
rsync -avz --delete dist/ $SSH_USER@$SERVER_IP:$REMOTE_DIR

# 4. Configure Nginx (This part assumes Nginx is installed. If not, you might need to install it first)
echo "🔧 Configuring Nginx..."

# Create a temporary nginx config locally
cat > educore.nginx.conf <<EOF
server {
    listen 80;
    server_name $SERVER_IP www.$SERVER_IP;

    root $REMOTE_DIR;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Optional: Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
EOF

# Upload config and enable it
scp educore.nginx.conf $SSH_USER@$SERVER_IP:/tmp/educore.nginx.conf
ssh $SSH_USER@$SERVER_IP "sudo mv /tmp/educore.nginx.conf /etc/nginx/sites-available/educore && \
sudo ln -sf /etc/nginx/sites-available/educore /etc/nginx/sites-enabled/ && \
sudo nginx -t && \
sudo systemctl restart nginx"

# Cleanup local config
rm educore.nginx.conf

echo "🎉 Deployment complete! Visit http://$SERVER_IP"
