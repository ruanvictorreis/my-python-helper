let Status = require('./status');
let FileUtils = require('../util/fileUtils');

class Inspection {
  constructor(register, assignment, studentCode) {
    this.register = register;
    this.assignment = assignment;
    this.studentCode = studentCode;

    this.status = new Status();

    this.inspectionFile = '';
    this.assertList = getAssertList(assignment);
    this.errorPattern = getErrorMessagePattern();
  }

  createScript() {
    let scriptContent = this.studentCode + '\n';

    for (let assert of this.assertList) {
      const splited = assert.split('==');
      const callFunction = splited[0].trim();
      const expected = splited[splited.length - 1].trim();

      let errorMsg = this.errorPattern;
      errorMsg = errorMsg.replace(/--expected--/g, expected);
      errorMsg = errorMsg.replace(/--callFunction--/g, callFunction);

      let assertLine = `assert ${assert.trim()}, ${errorMsg}`;
      scriptContent = scriptContent + '\n' + assertLine;
    }

    const scriptPath = `./assignments/${this.assignment}/asserts/${this.register}.py`;
    return this.writeScript(scriptPath, scriptContent);
  }

  writeScript(scriptPath, content) {
    try {
      FileUtils.writeContent(scriptPath, content);
      this.inspectionFile = scriptPath;
      return scriptPath;
    }
    catch (err) {
      console.log(err);
    }
  }

  getErrorMessagePattern() {
    return FileUtils.readFileContent(`./assignment/error_msg`);
  }

  getAssertList(assignment) {
    const path = `./assignment/${assignment}/asserts/assert_expr`;
    return FileUtils.readFileLines(path);
  }

  analysis(error) {
    this.status.errorBuild(error)
  }

  report() {
    const status = this.status;
    const report = {
      register : this.register,
      assignment: this.assignment,
      studentCode: this.studentCode,
      ...status
    };
    
    return report;
  }
}

module.exports = Inspection;
