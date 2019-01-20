module.exports = (sequelize, DataType)=>{
    let content = sequelize.define("Content",{
        id:{
            type: DataType.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title:{
            type: DataType.STRING(45),
            allowNull: false
        },
        url: {
            type: DataType.STRING(255),
            allowNull: false
        }
    });
    return content;
}