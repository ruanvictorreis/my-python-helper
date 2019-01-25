import os
import sys

student_id = sys.argv[1]
assignment = sys.argv[2]
parameters = sys.argv[3]
student_code = sys.argv[4]

file_name = student_id + '.py'
assignment_path = './assignment/{0}'.format(assignment)
attempt_path = '{0}/attempts/{1}'.format(assignment_path, file_name)

with open(attempt_path, 'w') as _file:
		_file.write(student_code)
		_file.close()

specs = '{0}/data/specs/*.py'.format(assignment_path)
repair_file = '{0}/repairs/{1}'.format(assignment_path, file_name)
clara_command = 'clara feedback {0} {1} --entryfnc {2} --args "{3}" --verbose 0 --feedtype "python"'
clara_command = clara_command.format(specs, attempt_path, assignment, parameters)

if os.path.isfile(repair_file):
    os.remove(repair_file)

os.system("{0} >> {1}".format(clara_command, repair_file))
