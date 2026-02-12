# Deployment Instructions

## 1. Prerequisites on the Remote Server (Google Cloud VM)

Before running the deployment script, ensure your VM is ready:

1.  **SSH into your VM:**
    ```bash
    ssh faztrick_gmail_com@uaecodes.com
    # OR use Google Cloud Console > SSH button
    ```

2.  **Install Nginx:**
    ```bash
    sudo apt update
    sudo apt install nginx -y
    sudo systemctl enable nginx
    sudo systemctl start nginx
    ```

3.  **Ensure firewall allows HTTP traffic:**
    - Go to Google Cloud Console > VPC Network > Firewall.
    - Create a rule allowing tcp:80 (HTTP) to your instance.

## 2. Configure Local Deployment Script

Open `deploy.sh` in this project and verify/update these variables at the top:

- `SERVER_IP="uaecodes.com"` (Already set)
- `SSH_USER="..."` (Update this! Usually `username_gmail_com` for GCP)
  - Example: `SSH_USER="faztrick_gmail_com"`

## 3. Run Deployment

From your local project folder:

```bash
./deploy.sh
```

This script will:
1.  Build the project locally.
2.  Create the necessary directories on the server.
3.  Upload the built files.
4.  Configure Nginx to serve your app.
5.  Restart Nginx.

Your site should be live at http://uaecodes.com !
