def fibonacci(n):
  atual = 0
  proximo = 1
  
  for i in range(n):
    atual = proximo
    temp = atual
    proximo = temp + proximo
  return atual