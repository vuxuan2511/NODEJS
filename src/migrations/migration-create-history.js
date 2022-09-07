'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('histories', {
            // patientId: DataTypes.INTEGER,
            // doctorId: DataTypes.INTEGER,
            // description: DataTypes.TEXT,
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },

            patientId: {
                type: Sequelize.INTEGER,
            },
            doctorId: {
                type: Sequelize.INTEGER,
            },
            description: {
                type: Sequelize.TEXT,
            },
            files: {
                type: Sequelize.TEXT,
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
        await queryInterface.dropTable('histories');
    },
};
