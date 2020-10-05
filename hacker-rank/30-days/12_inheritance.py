# You are given two classes, Person and Student, where Person is the base class and Student is the derived class. 
# Complete the Student class by writing the following:
# A Student class constructor,
# A char calculate() method that calculates a Student object's average and returns the grade character representative of their calculated average

sampleInput = "Heraldo Memelli 8135627
2
100 80"

sampleOutput = "Name: Memelli, Heraldo
 ID: 8135627
 Grade: O"

class Person:
  def __init__(self, firstName, lastName, idNumber):
    self.firstName = firstName
    self.lastName = lastName
    self.idNumber = idNumber
  ;

  def printPerson(self):
    print("Name:", self.lastName + ",", self.firstName)
    print("ID:", self.idNumber)
  ;
;

class Student(Person):
  def __init__(self, firstName, lastName, idNumber, scores):
    self.firstName = firstName
    self.lastName = lastName
    self.idNumber = idNumber
    self.scores = scores
  ;

  def calculate(self):
    gradeAvg = sum(self.scores) / len(self.scores)
    if 90 <= gradeAvg <= 100: 
        return "O"
    elif gradeAvg >= 80: 
        return "E"
    elif gradeAvg >= 70: 
        return "A"
    elif gradeAvg >= 55: 
        return "P"
    elif gradeAvg >= 40:
        return "D"
    else:
        return "T"
  ;
;

line = input().split()
firstName = line[0]
lastName = line[1]
idNum = line[2]
scores = list( map(int, input().split()) )

s = Student(firstName, lastName, idNum, scores)
s.printPerson()
print("Grade:", s.calculate())