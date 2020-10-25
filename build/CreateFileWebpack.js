const path = require('path');
const write = require('write');

function _createFile(filePath, fileName, content) {
  return () => {
    const fullPath = path.join(filePath, fileName);
    write.sync(fullPath, content);
  };
}

module.exports = (function () {
  return class CreateFilePlugin {
    constructor(options) {
      if (!options) {
        throw new Error("Please provide 'options' for the CreateFilePlugin config");
      }
      if (options.path == null) {
        throw new Error("Please provide 'options.path' in the CreateFilePlugin config");
      }
      if (options.fileName == null) {
        throw new Error("Please provide 'options.fileName' in the CreateFilePlugin config");
      }
      if (options.content == null) {
        throw new Error("Please provide 'options.content' in the CreateFilePlugin config");
      }
      this.options = options;
    }

    apply(compiler) {
      const createFile = () => _createFile(
        this.options.path,
        this.options.fileName,
        this.options.content,
      );
      if (compiler.hooks) {
        compiler.hooks.afterEmit.tap('CreateFileWebpack', createFile());
      } else {
        compiler.plugin('afterEmit', createFile());
      }
    }
  };
}());
