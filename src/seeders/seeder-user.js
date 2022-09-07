'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Users', [
            //email: DataTypes.STRING,
            // password: DataTypes.STRING,
            // firstName: DataTypes.STRING,
            // lastName: DataTypes.STRING,
            // address: DataTypes.STRING,
            // gender: DataTypes.BOOLEAN,
            // roleid: DataTypes.STRING,
            {
                email: 'admin@gmail.com',
                password: '123456',
                firstName: 'vux',
                lastName: 'xuan',
                address: 'Ha Noi',
                gender: 1,
                typeRole: 'ROLE',
                keyRole: 'R1',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', null, {});
    },
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
};
