def factorial(n):
  total = 1
  for i in range(1, n+1):
    total = total * i
  return total

assert factorial(3) == 6, '>>> factorial(3)\n    # Error: expected\n    #     6\n    # but got\n    #     %s' % factorial(3)
assert factorial(1) == 1, '>>> factorial(1)\n    # Error: expected\n    #     1\n    # but got\n    #     %s' % factorial(1)
assert factorial(2) == 2, '>>> factorial(2)\n    # Error: expected\n    #     2\n    # but got\n    #     %s' % factorial(2)