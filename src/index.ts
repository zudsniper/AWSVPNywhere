import * as AWS from 'aws-sdk';
import * as inquirer from 'inquirer';
import * as winston from 'winston';


// use environment variables
import * as dotenv from 'dotenv';
dotenv.config();

// Set up AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});


// Set up winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// Set up AWS SDK
AWS.config.update({region: 'us-west-2'});

const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

// Get available regions
ec2.describeRegions({}, (err, data) =>  if (err) {
    logger.error(`Error getting regions: ${err}`);
  } else {
    const regions = data.Regions.map(region => region.RegionName);

    // Prompt user to select a region
    inquirer.prompt([
      {
        type: 'list',
        name: 'region',
        message: 'Select a region:',
        choices: regions,
      },
    ]).then(answers => {
      // Set the selected region
      AWS.config.update({region: answers.region});

      // Run Terraform commands to set up VPN
      // This is a placeholder and you'll need to replace it with the actual commands
      const terraformCommand = `terraform apply -var 'region=${answers.region}'`;

      const { exec } = require('child_process');
      exec(terraformCommand, (err, stdout, stderr) => {
        if (err) {
          // Terraform errors will be here
          logger.error(`Error running Terraform: ${err}`);
        }

        // Terraform output will be here
        logger.info(`Terraform output: ${stdout}`);
      });
    });
  }
});

