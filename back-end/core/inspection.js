let Status = require('./status');
let FileSystem = require('fs');
let unicode = 'utf-8';

class Inspection {
  constructor(register, assignment, studentCode) {
    this.register = register;
    this.assignment = assignment;
    this.studentCode = studentCode;

    this.status = new Status();
    this.assertList = [];
    this.errorPattern = '';
    this.inspectionFile = '';
  }

  createScript() {
    this.assertList = this.getAssertList(this.assignment);
    this.errorPattern = this.getErrorMessagePattern();

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

    const scriptPath = `./assignment/${this.assignment}/asserts/${this.register}.py`;
    return this.writeScript(scriptPath, scriptContent);
  }

  writeScript(scriptPath, content) {
    FileSystem.writeFileSync(scriptPath, content, unicode);
    this.inspectionFile = scriptPath;
    return scriptPath;
  }

  getErrorMessagePattern() {
    const path = `./assignment/error_msg`
    return FileSystem.readFileSync(path, unicode).trim();
  }

  getAssertList(assignment) {
    const path = `./assignment/${assignment}/asserts/assert_expr`;
    return FileSystem.readFileSync(path, unicode).split('\n')
  }

  analysis(error) {
    this.status.errorBuild(error)
  }

  report() {
    const status = this.status;
    const report = {
      register: this.register,
      assignment: this.assignment,
      studentCode: this.studentCode,
      ...status
    };

    return report;
  }
}

module.exports = Inspection;
