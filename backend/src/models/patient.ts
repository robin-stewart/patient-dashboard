import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../db';

export class Patient extends Model<InferAttributes<Patient>, InferCreationAttributes<Patient>> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare middleName: string | null;
  declare lastName: string;
  declare dob: Date;
  declare status: 'Inquiry' | 'Onboarding' | 'Active' | 'Churned';
  declare address: string;
}

Patient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: { type: DataTypes.STRING, allowNull: false },
    middleName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING, allowNull: false },
    dob: { type: DataTypes.DATE, allowNull: false },
    status: {
      type: DataTypes.ENUM('Inquiry', 'Onboarding', 'Active', 'Churned'),
      allowNull: false
    },
    address: { type: DataTypes.STRING, allowNull: false }
  },
  {
    sequelize,
    modelName: 'patient',
    tableName: 'patients'
  }
);