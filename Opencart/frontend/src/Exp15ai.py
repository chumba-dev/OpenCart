def count(predicate, lst):
 # Initialize count of elements satisfying the predicate
 result = 0
 # Traverse the list manually
 for x in lst:
    if predicate(x): # Apply the test
     result += 1 # Increment count if test is true
 return result