import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// [x] TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) =>{ 

  // create a conx to the database and version we want to sue
  const jateDb = await openDB('jate', 1);

  // create a new transaction and specify the database and privileges
  const tx = jateDb.transaction('jate', 'readwrite');

  // open the desired object store
  const store = tx.objectStore('jate');

  // use the .add() method on the store and pass in the content
  const request = store.put({ jate: content });

  // get confirmation of the request
  const result = await request;
  // console log this
  console.log('Text saved to database', result);

  console.error('putDb not implemented');

};

// [x] TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  console.error('getDb not implemented');
  return result;

};

initdb();
