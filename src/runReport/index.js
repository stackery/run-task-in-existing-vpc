exports.handler = async message => {
  console.log('Function configured with environment variables:');
  console.log(process.env);

  return {};
};
