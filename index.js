// Abstract class Person
class Person {
  constructor(name, age) {
    if (this.constructor === Person) {
      throw new Error("class cannot be instantiated");
    }
    this.name = name;
    this.age = age;
  }

  getDetails() {
    return `\nID: ${this.id}\nName: ${this.name}\nAge: ${this.age}`;
  }
}

// Inherited class Student of Person (Inheritance)
// with a private method (Encalsulation)
// and Overriding the getDetails method (Polymorphism)
class Student extends Person {
  grades;

  constructor(name, age) {
    super(name, age);
    this.id = Math.floor(1000 + Math.random() * 9000);
    this.grades = {};
  }

  addGrade(subject, score) {
    this.grades[subject] = score;
  }

  removeGrade(subject) {
    delete this.grades[subject];
  }

  updateGrade(subject, score) {
    this.grades[subject] = score;
  }

  // Private method to get all results
  #getAllResults() {
    let result;

    if (Object.keys(this.grades).length === 0) {
      result = { Error: "No scores available" };
    } else {
      result = this.grades;
    }
    return Object.entries(result).map(([subject, score]) => {
      return `${subject}: ${score}`;
    });
  }

  // Overriding the getDetails method
  getDetails() {
    return `${super.getDetails()}\nGrades  => [\n    ${this.#getAllResults().join(
      "\n    "
    )}\n   ]`;
  }
}

// Undergraduate class that extends Students (Inheritance)
// and Overriding the getDetails method (Polymorphism)
// with a private methods and field (Encapsulation)
class Undergraduate extends Student {
  // Private field
  #projectTopic;
  constructor(name, age) {
    super(name, age);
  }

  addProjectTopic(topic) {
    this.#projectTopic = topic;
  }

  // Private method to get the total score
  #TotalScore() {
    return Object.values(this.grades).reduce((acc, score) => acc + score, 0);
  }

  // Private method to get the average grade
  #getAverageGrade() {
    if (Object.keys(this.grades).length === 0) return 0;
    return this.#TotalScore() / Object.keys(this.grades).length;
  }

  // Overriding the getDetails method
  getDetails() {
    return `${super.getDetails()}\nProject Topic: ${
      this.#projectTopic
    }\nTotal Score: ${this.#TotalScore()}\nAverage Score: ${this.#getAverageGrade()}`;
  }
}

//demo of the classes

//creating an instance of the Undergraduate class for graduate student
const graduateStudent = new Undergraduate("John Doe", 24);

//adding grades to the graduate student
graduateStudent.addGrade("Intro to Programming", 95);
graduateStudent.addGrade("Git and Version control", 85);
graduateStudent.addGrade("Intro to JavaScript ", 90);

//adding project topic to the graduate student
graduateStudent.addProjectTopic("Backend Development");

//creating an instance of the Student class for secondary school student
const student = new Student("Jane Doe", 16);

//adding grades to the student
student.addGrade("Mathematics", 85);
student.addGrade("English", 75);
student.addGrade("Physics", 90);

//displaying the details of the undergraduate student
console.log(
  "--------------------Undergraduate Student Details-------------------"
);
console.log(graduateStudent.getDetails());

//displaying the details of the secondary school student
console.log(
  "\n--------------------Secondary School Student Details-------------------"
);
console.log(student.getDetails());
