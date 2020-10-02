#!/bin/ruby

# Given a 6x6 2D Array, we define an hourglass to be a subset of values with indices falling in this pattern :

# x, x, x,
#   x, 
# x, x, x

# Calculate the hourglass sum for every hourglass then print the maximum hourglass sum.

require 'json'
require 'stringio'

sample_input = "1 1 1 0 0 0
0 1 0 0 0 0
1 1 1 0 0 0
0 0 2 4 4 0
0 0 0 2 0 0
0 0 1 2 4 0"

expected_output = 19

# arr = Array.new(6)

# 6.times do |i|
#     arr[i] = gets.rstrip.split(' ').map(&:to_i)
# end

# begin
input_to_array = sample_input.split('\n').map {|line| line.split(' ')}

def make_hourglass_from_top_left(arr, y=0, x=0)
  [ arr[y][x], arr[y][x+1], arr[y][x+2],
            arr[y+1][x+1],
    arr[y+2][x], arr[y+2][x+1], arr[y+2][x+2] ]
end

def find_hourglasses(arr)
  hourglasses = Array.new()

  arr.each.with_index do |row, y|

    if y <= (arr.length - 3)
      row.each.with_index do |num, x|

        if x <= (row.length - 3)
          hourglasses.push(make_hourglass_from_top_left(arr, y, x))
        end

      end
    end

  end

  hourglasses
end

hourglasses = find_hourglasses(input_to_array)

sums = hourglasses.map {|glass| glass.reduce(0, :+)}

print sums.max
