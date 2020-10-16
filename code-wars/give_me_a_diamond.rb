# You need to return a string that looks like a diamond shape when printed on the screen, using asterisk (*) characters. Trailing spaces should be removed, and every line must be terminated with a newline character (\n).

# Return null/nil/None/... if the input is an even number or negative, as it is not possible to print a diamond of even or negative size.

def diamond(n)
  return if (n%2==0 || n<1)

  girdle = "#{'*'*n}\n"
  pavilion = []

  stars = 1
  spaces = (n-1)/2
  while stars < n
      line = "#{' '*spaces}#{'*'*stars}\n"
      pavilion.push(line)
      stars += 2
      spaces -= 1
  end

  [*pavilion, girdle, *pavilion.reverse()].join()
end

# def diamond(n)
#   return if (n%2==0 || n<1)

#   str = ''

#   stars = 1
#   spaces = (n-1)/2
#   while stars < n
#       line = "#{' '*spaces}#{'*'*stars}\n"
#       str += line
#       stars += 2
#       spaces -= 1
#   end
#   while stars >= 1
#     line = "#{' '*spaces}#{'*'*stars}\n"
#     str += line
#     stars -= 2
#     spaces += 1
#   end

#   str
# end

def assert_equals(a, b)
  if (a === b)
    return true
  else
    print "Expected: #{b},\nReceived: #{a}"
    return false
  end
end

if (assert_equals(diamond(1), "*\n") &&
  assert_equals(diamond(3), " *\n***\n *\n") &&
  assert_equals(diamond(5), "  *\n ***\n*****\n ***\n  *\n") &&
  assert_equals(diamond(0), nil) &&
  assert_equals(diamond(-3), nil) &&
  assert_equals(diamond(2), nil))
  print "All tests pass."
end
