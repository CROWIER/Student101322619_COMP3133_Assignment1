const Employee = require('./Employee');

const resolvers = {
    getAllEmployees: async () => {
        const employees = await Employee.find();
        return employees;
    },
    getEmployeeById: async ({ id }) => {
        const employee = await Employee.findById(id);
        if (!employee) {
            throw new Error('Employee not found');
        }
        return employee;
    },
    createEmployee: async ({ firstName, lastName, email, gender, salary }) => {
        try {
            // Check if employee with the same email already exists
            const existEmail = await Employee.findOne({ email });
            if (existEmail) {
                throw new Error('This email is already taken');
            }
            if (!firstName || !lastName || !email || !gender || !salary) {
                throw new Error('Invalid data');
            }
            const employee = new Employee({ firstName, lastName, email, gender, salary });
            await employee.save();
            return {
                success: true,
                message: 'Employee was created',
                employee: employee
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
                employee: null
            };
        }
    },
    updateEmployeeById: async ({ id, firstName, lastName, email, gender, salary }) => {
        const emailExists = await Employee.findOne({ email });
        if (emailExists && emailExists._id != id) {
            throw new Error('This email is already taken');
        }
        const employee = await Employee.findByIdAndUpdate(id, { firstName, lastName, email, gender, salary }, { new: true });
        if (!employee) {
            throw new Error('Employee not found');
        }
        try {
            await employee.validate();
            return {
                success: true,
                message: 'Employee was updated',
                employee: employee
            };
        } catch (error) {
            return {
                success: false,
                message: 'Invalid data',
                employee: null
            };
        }
    },
    deleteEmployeeById: async ({ id }) => {
        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) {
            throw new Error('Employee not found');
        }
        return {
            success: true,
            message: 'Employee was deleted',
            employee: employee
        };
    },
};

module.exports = resolvers;