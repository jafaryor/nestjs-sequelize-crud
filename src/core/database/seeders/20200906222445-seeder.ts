import { QueryInterface } from 'sequelize';


/**
 * db:seed:all
 * Fills the tables with a random data.
 */
export async function up(queryInterface: QueryInterface) {
  try {
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        name: 'Candie Willmont',
        email: 'cwillmont0@nsw.gov.au',
        password: 'BzhJ7UZRfOOS',
        gender: 'female',
      },
      {
        id: 2,
        name: 'Alano Voss',
        email: 'avoss1@webmd.com',
        password: 'OwpfXZw4ZH',
        gender: 'male',
      },
      {
        id: 3,
        name: 'Priscilla Beyn',
        email: 'pbeyn2@artisteer.com',
        password: 'InPUO8fY',
        gender: 'female',
      },
      {
        id: 4,
        name: 'Goldia McKibbin',
        email: 'gmckibbin3@paginegialle.it',
        password: 'VPvwNK35Smee',
        gender: 'female',
      },
      {
        id: 5,
        name: 'Rhodie Mettrick',
        email: 'rmettrick4@google.fr',
        password: 'zOtoxuji',
        gender: 'female',
      },
    ]);

    await queryInterface.bulkInsert('Posts', [
      {
        title: 'Sink or Swim',
        body: 'Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit.',
        userId: 1,
      },
      {
        title: 'Merchant of Venice, The',
        body: 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam.',
        userId: 2,
      },
      {
        title: 'Free Radicals (Böse Zellen)',
        body: 'Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum.',
        userId: 3,
      },
      {
        title: 'Cinderella',
        body: 'Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.',
        userId: 3,
      },
      {
        title: 'Belle comme la femme dun autre',
        body: 'Aliquam sit amet diam in magna bibendum imperdiet. Anatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.',
        userId: 5,
      }
    ]);
  } catch(e) {
    return Promise.reject(e);
  }
}

/**
 * db:seed:undo:all
 * Erases all data from he tables.
 */
export async function down(queryInterface: QueryInterface) {
  try {
    await queryInterface.bulkDelete('Posts', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  } catch (e) {
    return Promise.reject(e);
  }
}

