const AWS = require('aws-sdk');
const mysql = require('mysql');

exports.handler = async message => {
  console.log(message);

  const connection = mysql.createConnection({
    host: process.env.DB_ADDRESS,
    user: 'root',
    password: await getDBPassword(),
    database: 'items'
  });

  const rows = await new Promise((resolve, reject) => {
    connection.query('SHOW TABLES', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });

  connection.destroy();

  return {
    statusCode: 200,
    body: JSON.stringify(rows),
    headers: {
      'Content-Type': 'application/json'
    }
  };
};

let _dbPassword;
async function getDBPassword () {
  if (!_dbPassword) {
    const secretsManager = new AWS.SecretsManager();

    ({ SecretString: _dbPassword } = await secretsManager.getSecretValue({
      SecretId: process.env.SECRETS_NAMESPACE + 'dbPassword'
    }).promise());
  }

  return _dbPassword;
}
