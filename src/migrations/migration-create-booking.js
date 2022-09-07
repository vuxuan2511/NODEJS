'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('bookings', {
            // statusId: DataTypes.STRING,
            // doctorId: DataTypes.INTEGER,
            // patientId: DataTypes.INTEGER,
            // date: DataTypes.DATE,
            // timetype: DataTypes.STRING,
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },

            statusId: {
                type: Sequelize.STRING,
            },
            doctorId: {
                type: Sequelize.INTEGER,
            },
            patientId: {
                type: Sequelize.INTEGER,
            },
            date: {
                type: Sequelize.DATE,
            },
            timetype: {
                type: Sequelize.STRING,
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },

            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('bookings');
    },
};
