def fibonacci(n):
  atual = 1
  proximo = 1
  
  for i in range(n):
    new_temp = atual
    atual = proximo
    proximo = new_temp + proximo
  return atual