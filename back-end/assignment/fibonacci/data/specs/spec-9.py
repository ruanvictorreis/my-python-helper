def fibonacci(n):
  atual = 0
  proximo = 1
  
  for i in range(n):
    temp = atual + proximo
    atual = proximo
    proximo = temp
  return atual

assert fibonacci(0) == 0
assert fibonacci(1) == 1
assert fibonacci(2) == 1
assert fibonacci(3) == 2
assert fibonacci(4) == 3
assert fibonacci(5) == 5
assert fibonacci(6) == 8
assert fibonacci(7) == 13

