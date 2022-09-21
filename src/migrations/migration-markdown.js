'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('markdowns', {
            //  contentHTML: DataTypes.TEXT('long'),
            // contentMarkdown: DataTypes.TEXT('long'),
            // description: DataTypes.TEXT('long'),
            // doctorId: DataTypes.INTERGER,
            // specialtyId: DataTypes.INTERGER,
            // clinicId: DataTypes.INTERGER,
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            contentHTML: {
                allowNull: false,
                type: Sequelize.TEXT('long'),
            },
            contentMarkdown: {
                allowNull: false,
                type: Sequelize.TEXT('long'),
            },
            description: {
                allowNull: true,
                type: Sequelize.TEXT('long'),
            },
            doctorId: {
                type: Sequelize.INTEGER,
            },
            specialtyId: {
                type: Sequelize.INTEGER,
            },
            clinicId: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable('markdowns');
    },
};
