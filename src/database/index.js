import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import schema from './schema';
import migrations from './migrations';
import Account from './models/Account';
import Transaction from './models/Transaction';

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: 'expenzo',
  jsi: true,
  onSetUpError: error => console.error('DB setup error:', error),
});

const database = new Database({
  adapter,
  modelClasses: [Account, Transaction],
});

export default database;
