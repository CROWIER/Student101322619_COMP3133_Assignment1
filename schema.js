const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    gender: String!
    salary: Float!
  }

  type EmployeeResponse {
    success: Boolean!
    message: String!
    employee: Employee
  }

  type Query {
    getAllEmployees: [Employee]!
    getEmployeeById(id: ID!): Employee
  }

  type Mutation {
    createEmployee(firstName: String!, lastName: String!, email: String!, gender: String!, salary: Float!): EmployeeResponse!
    updateEmployeeById(id: ID!, firstName: String, lastName: String, email: String, gender: String, salary: Float): EmployeeResponse!
    deleteEmployeeById(id: ID!): EmployeeResponse!
  }
`);

module.exports = schema;