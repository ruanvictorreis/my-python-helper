def sum_of_squares_base(base, n):
  total = 0
  for i in range(1, n+1):
    total = total + i**2
  return total
