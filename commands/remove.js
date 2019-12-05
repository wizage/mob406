async function run(context) {
  // print out the help message of your plugin
  context.amplify.removeResource(context, 'Custom');
}

module.exports = {
  run,
};
