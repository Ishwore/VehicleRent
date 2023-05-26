const bcrypt =require('bcryptjs');

const users = [
  {
    name: 'Admin',
    email: 'admin.admin@gmail.com',
    addres: 'parsa',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john.user@gmail.com',
    addres: 'parsa',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    email: 'jane.user@gmail.com',
    addres: 'parsa',
    password: bcrypt.hashSync('123456', 10),
  },
]

module.exports={users}