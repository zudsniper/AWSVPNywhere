# 🌐 AWS VPN CLI Tool

This project provides a command-line interface (CLI) tool for setting up a VPN connection on AWS using Terraform. The tool allows you to select a region, spins up a VPC instance, and routes your connection through it using either OpenVPN or AWS's proprietary VPN service.

## 🧰 Tech Stack

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Terraform](https://www.terraform.io/)
- [AWS SDK for JavaScript](https://aws.amazon.com/sdk-for-node-js/)
- [Inquirer.js](https://www.npmjs.com/package/inquirer)
- [Winston](https://www.npmjs.com/package/winston)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [PM2](https://www.npmjs.com/package/pm2)

## 🚀 Getting Started

Follow these steps to set up the AWS VPN CLI tool:

1. **Clone the repository**

   Clone the repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/aws-vpn-cli.git
   cd aws-vpn-cli
