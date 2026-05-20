import database from '../index';
import { Q } from '@nozbe/watermelondb';

const transactions = () => database.get('transactions');

const TransactionRepository = {
  async getAll() {
    return transactions().query(Q.sortBy('date', Q.desc)).fetch();
  },

  async getByAccount(accountId) {
    return transactions()
      .query(Q.where('account_id', accountId), Q.sortBy('date', Q.desc))
      .fetch();
  },

  async getByDateRange(from, to) {
    return transactions()
      .query(
        Q.where('date', Q.gte(from)),
        Q.where('date', Q.lte(to)),
        Q.sortBy('date', Q.desc),
      )
      .fetch();
  },

  async getByCategory(category) {
    return transactions()
      .query(Q.where('category', category), Q.sortBy('date', Q.desc))
      .fetch();
  },

  async create({ accountId, type, amount, category, note = '', date }) {
    return database.write(async () =>
      transactions().create(record => {
        record.accountId = accountId;
        record.type = type;
        record.amount = parseFloat(amount);
        record.category = category;
        record.note = note;
        record.date = date ?? Date.now();
      }),
    );
  },

  async update(id, fields) {
    return database.write(async () => {
      const record = await transactions().find(id);
      await record.update(r => {
        if (fields.amount !== undefined) r.amount = parseFloat(fields.amount);
        if (fields.category !== undefined) r.category = fields.category;
        if (fields.note !== undefined) r.note = fields.note;
        if (fields.date !== undefined) r.date = fields.date;
      });
    });
  },

  async delete(id) {
    return database.write(async () => {
      const record = await transactions().find(id);
      await record.markAsDeleted();
    });
  },

  async getTotalByType(type) {
    const results = await transactions().query(Q.where('type', type)).fetch();
    return results.reduce((sum, t) => sum + t.amount, 0);
  },
};

export default TransactionRepository;
