'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Users', [
            // email: DataTypes.STRING,
            // password: DataTypes.STRING,
            // firstName: DataTypes.STRING,
            // lastName: DataTypes.STRING,
            // address: DataTypes.STRING,
            // phoneNumber: DataTypes.STRING,
            // gender: DataTypes.BOOLEAN,
            // image: DataTypes.STRING,
            // roleId: DataTypes.STRING,
            // positionId: DataTypes.STRING,
            {
                email: 'admin@gmail.com',
                password: '123456',
                firstName: 'vux',
                lastName: 'xuan',
                address: 'Ha Noi',
                phoneNumber: '0334665050',
                gender: 1,
                image: 'bac',
                roleId: '1',
                positionId: 'bzz',
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
