var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');
var FileUtils = require('../util/fileUtils');

router.post('/python/', function (request, response) {
  const attempt = request.body;
  const register = attempt.register;
  const assignment = attempt.assignment;
  const studentCode = attempt.studentCode;
  const parameters = getParameters(assignment);

  let result = attempt;
  const args = [register, assignment, parameters, studentCode];

  PythonShell.run('./scripts/repair_script.py', { args: args }, (error) => {
    if (error) {
      result.repaired = false;
      result.repairs = [];
      response.json(result);
      return;
    }

    result.repairs = getRepairs(assignment, register);
    result.repaired = true;
    response.json(result);
  });
});

function getParameters(assignment) {
  const path = `./assignment/${assignment}/input`;
  return FileUtils.readContent(path);
}

function getRepairs(assignment, register){
  const path = `./assignment/${assignment}/repairs/${register}.py`;
  return FileUtils.readLines(path);
}

module.exports = router;
