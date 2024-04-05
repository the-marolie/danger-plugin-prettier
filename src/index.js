const prettier = require('prettier');
const fs = require('fs');
const path = require('path');

module.exports = async () => {
  const filesToCheck = danger.git.modified_files.concat(danger.git.created_files);
  // check only js files
  filesToCheck.forEach(file => {
    if (!file.endsWith('.js')) {
      return;
    }
    const content = fs.readFileSync(file, 'utf8');
    const prettierConfig = prettier.resolveConfig.sync(file);
    const formatted = prettier.format(content, { ...prettierConfig, filepath: file });

    if (content !== formatted) {
      fail(`${file} is not formatted correctly.`);
    } else {
      message(`${file} is formatted correctly.`);
    }
  });
};
