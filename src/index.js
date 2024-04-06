const { check, resolveConfig } = require('prettier');
const fs = require('fs');

module.exports = async () => {
  const filesToCheck = danger.git.modified_files.concat(danger.git.created_files);
  // check only js files
  await Promise.all(filesToCheck.map(async file => {
    if (!file.endsWith('.js')) {
      return;
    }
    const options = await resolveConfig(file);
    const content = fs.readFileSync(file, 'utf8');
    const formatted = check(content, { ...options, filepath: file }); // Added 'filepath' option
    
    if (!formatted) {
      fail(`${file} is not formatted correctly.`);
    } 
  }));
};
