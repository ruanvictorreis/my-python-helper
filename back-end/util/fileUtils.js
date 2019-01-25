let fs = require('fs');
let unicode = 'utf-8';

class FileUtils {

	static readContent(filePath) {
		return fs.readFileSync(filePath, unicode).trim();
	}

	static readLines(filePath) {
		return fs.readFileSync(filePath, unicode).trim().split('\n');
	}

	static writeContent(filePath, content) {
		fs.writeFileSync(filePath, content, unicode);
	}
}

module.exports = FileUtils;