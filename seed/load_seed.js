const seedData = require('./seed.json'),
    users = seedData.users,
    records = seedData.records;

const postUsersData = {
    users: users
};

const postRecordsData = {
    records: records
};

fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(data => {
        if (data.length === 0) {
            postUsersData.users.forEach(async (user) => {
                const response = await fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                });

                if (response.ok) {
                    console.log(`Record with id ${user.id} has been successfully added`);
                } else {
                    console.error(`Failed to add record with id ${user.id}`);
                }
            });
        }
    })
    .catch(error => console.error('Error:', error));

fetch('http://localhost:3000/records')
    .then(response => response.json())
    .then(data => {
        if (data.length === 0) {
            postRecordsData.records.forEach(async (record) => {
                const response = await fetch('http://localhost:3000/records', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(record),
                });

                if (response.ok) {
                    console.log(`Record with id ${record.id} has been successfully added`);
                } else {
                    console.error(`Failed to add record with id ${record.id}`);
                }
            });
        }
    })
    .catch(error => console.error('Error:', error));