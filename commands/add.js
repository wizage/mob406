const inquirer = require('inquirer');

async function run(context) {
  // print out the help message of your plugin
  const question = [
    {
      name:"projectname",
      message:"Provide a project name:",
    },
    {
      name:"hashKey",
      message:"Provide a key name:",
    }
  ];

  const targetDir = context.amplify.pathManager.getBackendDirPath();

  const answers = await inquirer.prompt(question);

  const options = {
    providerPlugin:"awscloudformation",
    service:"Custom"
  }

  copyJobs = [
    {
        dir: __dirname,
        //Template location that is ejs format (from the dir level)
        template: 'template.yaml.ejs',
        //Location to copy to (direct path)
        //i.e. /<backend_location>/<category_name>/<project_name>/<unique-template-name>
        target: `${targetDir}/Custom/${answers.projectname}/${answers.projectname}-workflow-template.yaml`,
    }
  ];
  
  await context.amplify.copyBatch(context, copyJobs, answers);

  await context.amplify.updateamplifyMetaAfterResourceAdd(
    "Custom",
    answers.projectname,
    options
  );

  console.log(answers);

  console.log(context.amplify.getProjectMeta());

}

module.exports = {
  run,
};
