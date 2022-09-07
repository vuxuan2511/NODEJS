'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('allcodes', {
            // key: DataTypes.STRING,
            // type: DataTypes.STRING,
            // value_en: DataTypes.STRING,
            // value_vi: DataTypes.STRING,
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },

            key: {
                type: Sequelize.STRING,
            },
            type: {
                type: Sequelize.STRING,
            },
            valueEN: {
                type: Sequelize.STRING,
            },
            valueVI: {
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
        await queryInterface.dropTable('allcodes');
    },
};
