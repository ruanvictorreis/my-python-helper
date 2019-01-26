class Status {
  constructor() {
    this.errorMsg = '';
    this.failedTest = [];
    this.expected = 0;
    this.obtained = 0;
    this.isCorrect = true;
    this.syntaxError = false;
  }

  errorBuild(error) {
    this.isCorrect = false;
    this.syntaxError = this.foundSyntaxError(error);
    this.errorMsg = this.getErrorMsg(error);

    if (!this.syntaxError) {
      this.loadTestCase();
    }
  }

  getErrorMsg(error) {
    const stackError = error.stack;
    const resultMsg = error.message;
    const errorIndex = stackError.indexOf('AssertionError');

    if (errorIndex == -1) {
      return resultMsg.trim()
    } else {
      return stackError.substring(errorIndex) + '  \n  ' + resultMsg;
    }
  }

  loadTestCase() {
    let splited = this.errorMsg.split(/>>>|#/);
    let failedTest = splited[1].trim();
    let expected = splited[3].trim();
    let obtained = splited[5].trim();

    if (!isNaN(parseInt(expected))) {
      expected = parseInt(expected)
    }

    if (!isNaN(parseInt(obtained))) {
      obtained = parseInt(obtained)
    }

    this.expected = expected;
    this.obtained = obtained;
    this.failedTest = failedTest;
  }

  foundSyntaxError(error) {
    return error.stack.indexOf('AssertionError') == -1;
  }
}

module.exports = Status;