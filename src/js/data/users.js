var initUsers = [
    {
        name: 'name',
        email: 'name@bu.com',
        role: 'user',
        pass: 'pass',
        result: "0/0"
    }
    ,{
        name: 'user',
        email: 'user@bu.com',
        role: 'user',
        pass: 'user',
        result: "0/0"
    }
    ,{
        name: 'admin',
        email: 'admin@bu.com',
        role: 'admin',
        pass: 'admin',
        result: "0/0"
    }
];

var admin = localStorage.getItem('admin');
admin = admin ? JSON.parse(admin) : {users:initUsers};
localStorage.setItem('admin', JSON.stringify(admin));

module.exports = admin.users;