import { sequelize } from './db';
import { Patient } from './models/patient';

async function seed() {
  await sequelize.sync({ force: true });

  await Patient.bulkCreate([
    {
      firstName: 'Pocahontas',
      middleName: 'Wind',
      lastName: 'Riverbend',
      dob: new Date('1595-06-04'),
      status: 'Active',
      address: 'Forest Path, Virginia Territory',
    },
    {
      firstName: 'Mulan',
      middleName: '',
      lastName: 'Fa',
      dob: new Date('1998-06-19'),
      status: 'Onboarding',
      address: 'Northern Wei, China',
    },
    {
      firstName: 'Ariel',
      middleName: '',
      lastName: 'Seawind',
      dob: new Date('1989-11-17'),
      status: 'Churned',
      address: 'Under the Sea, Atlantica',
    },
    {
      firstName: 'Tiana',
      middleName: '',
      lastName: 'Green',
      dob: new Date('2009-12-11'),
      status: 'Inquiry',
      address: 'New Orleans, Louisiana',
    },
    {
      firstName: 'Belle',
      middleName: '',
      lastName: 'Beaumont',
      dob: new Date('1991-11-22'),
      status: 'Active',
      address: 'Village Road, France',
    },
  ]);

  console.log('✨ Princess patients seeded ✨');
  const patients = await Patient.findAll();
  console.log(patients.map((p) => p.toJSON()));

  process.exit();
}

seed();
