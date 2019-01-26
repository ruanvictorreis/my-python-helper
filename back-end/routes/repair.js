let express = require('express');
let router = express.Router();
let FileSystem = require('fs');
let PythonShell = require('python-shell');
let unicode = 'utf-8';

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
  return FileSystem.readFileSync(path, unicode).trim();
}

function getRepairs(assignment, register) {
  const path = `./assignment/${assignment}/repairs/${register}.py`;
  return FileSystem.readFileSync(path, unicode).trim().split('\n')
}

module.exports = router;
