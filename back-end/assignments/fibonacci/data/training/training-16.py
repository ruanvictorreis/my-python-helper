def fibonacci(n):
  if n == 0:
    return 0
  
  if n == 1:
    return 1

  atual = 0
  proximo = 1
  
  for i in range(n):
    temp = atual
    atual = proximo
    proximo = temp + proximo
  return atual