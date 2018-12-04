// Import AWS SDK and instantiate a variable for the AWS Secrets Manager
const AWS = require('aws-sdk');
const secretsManager = new AWS.SecretsManager();

// Store the SECRETS_NAMESPACE value from the Function's environment variables
const secretsNamespace = process.env.SECRETS_NAMESPACE;

exports.handler = async message => {
  console.log('Function configured with environment variables:');
  console.log(process.env);
  // Construct paramaters to pass to AWS Secrets Manager API call
  // SecretId is a combination of the secret's namespace and the specific secret to return
  const params = {
    SecretId: secretsNamespace + 'postgresPassword'
  };

  // AWS Secrets Manager API call passing through params for retrieval
  const response = await secretsManager.getSecretValue(params).promise();

  // Accessing the secret's value of the response object
  const postgresPassword = response.SecretString;

  // In real life NEVER log passwords
  console.log(`PASSWORD STARTS WITH: ${postgresPassword.slice(0, 1)}`);

  return {};
};
