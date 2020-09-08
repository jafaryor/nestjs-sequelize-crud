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
        createdAt: '2020-09-06 20:23:32.388',
        updatedAt: '2020-09-06 20:23:32.388',
      },
      {
        id: 2,
        name: 'Alano Voss',
        email: 'avoss1@webmd.com',
        password: 'OwpfXZw4ZH',
        gender: 'male',
        createdAt: '2020-09-06 20:24:25.330',
        updatedAt: '2020-09-06 20:23:32.330',
      },
      {
        id: 3,
        name: 'Priscilla Beyn',
        email: 'pbeyn2@artisteer.com',
        password: 'InPUO8fY',
        gender: 'female',
        createdAt: '2020-09-06 20:24:41.971',
        updatedAt: '2020-09-06 20:24:41.971',
      },
      {
        id: 4,
        name: 'Goldia McKibbin',
        email: 'gmckibbin3@paginegialle.it',
        password: 'VPvwNK35Smee',
        gender: 'female',
        createdAt: '2020-09-06 20:25:00.160',
        updatedAt: '2020-09-06 20:25:00.160',
      },
      {
        id: 5,
        name: 'Rhodie Mettrick',
        email: 'rmettrick4@google.fr',
        password: 'zOtoxuji',
        gender: 'female',
        createdAt: '2020-09-06 20:25:15.939',
        updatedAt: '2020-09-06 20:25:15.939',
      },
    ]);

    await queryInterface.bulkInsert('Posts', [
      {
        title: 'Sink or Swim',
        body: 'Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit.',
        userId: 1,
        createdAt: '2020-09-06 20:28:13.763',
        updatedAt: '2020-09-06 20:28:13.763',
      },
      {
        title: 'Merchant of Venice, The',
        body: 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam.',
        userId: 2,
        createdAt: '2020-09-06 20:28:44.939',
        updatedAt: '2020-09-06 20:28:44.939',
      },
      {
        title: 'Free Radicals (Böse Zellen)',
        body: 'Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum.',
        userId: 3,
        createdAt: '2020-09-06 20:29:01.150',
        updatedAt: '2020-09-06 20:29:01.150',
      },
      {
        title: 'Cinderella',
        body: 'Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.',
        userId: 3,
        createdAt: '2020-09-06 20:29:14.797',
        updatedAt: '2020-09-06 20:29:14.797',
      },
      {
        title: 'Belle comme la femme dun autre',
        body: 'Aliquam sit amet diam in magna bibendum imperdiet. Anatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.',
        userId: 5,
        createdAt: '2020-09-06 20:29:32.806',
        updatedAt: '2020-09-06 20:29:32.806',
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

