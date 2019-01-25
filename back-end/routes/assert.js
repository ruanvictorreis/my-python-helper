let express = require('express');
let router = express.Router();
let PythonShell = require('python-shell');
let Inspection = require('../core/inspection.js');

router.post('/', function (request, response) {
  const attempt = request.body;
  const register = attempt.register;
  const assignment = attempt.assignment;
  const studentCode = attempt.studentCode;

  const inspection = new Inspection(register, assignment, studentCode);
  const inspectionScript = inspection.createScript();
  
  let pyScript = new PythonShell(inspectionScript);
  
  let pythonKiller = setTimeout(function () {
    pyScript.childProcess.kill();
    inspection.isCorrect = false;
    inspection.syntaxError = true;
    inspection.errorMsg = "TimeOutError";
    response.json(assert.getResult());
  }, 10000);

  pyScript.end(function (error) {
    clearTimeout(pythonKiller);

    if (error) {
      inspection.analysis(error);
    }

    const report = inspection.report();
    response.json(report);
  });
});

module.exports = router;