import database from '../index';
import { Q } from '@nozbe/watermelondb';

const accounts = () => database.get('accounts');

const AccountRepository = {
  async getAll() {
    return accounts().query(Q.sortBy('sort_order', Q.asc)).fetch();
  },

  async getByType(type) {
    return accounts()
      .query(Q.where('type', type), Q.sortBy('sort_order', Q.asc))
      .fetch();
  },

  async getPrimary(type) {
    const results = await accounts()
      .query(Q.where('type', type), Q.where('is_primary', true))
      .fetch();
    return results[0] ?? null;
  },

  async create({
    type,
    label,
    color,
    initials,
    balance = 0,
    isPrimary = false,
    sortOrder = 0,
  }) {
    return database.write(async () =>
      accounts().create(record => {
        record.type = type;
        record.label = label;
        record.color = color;
        record.initials = initials;
        record.balance = parseFloat(balance) || 0;
        record.isPrimary = isPrimary;
        record.sortOrder = sortOrder;
      }),
    );
  },

  async updateBalance(id, balance) {
    return database.write(async () => {
      const record = await accounts().find(id);
      await record.update(r => {
        r.balance = parseFloat(balance) || 0;
      });
    });
  },

  async delete(id) {
    return database.write(async () => {
      const record = await accounts().find(id);
      await record.markAsDeleted();
    });
  },

  /**
   * Called from onboarding — saves all accounts in one transaction.
   * accountsData: Array<{ type, label, color, initials, balance, isPrimary, sortOrder }>
   */
  async seedFromOnboarding(accountsData) {
    return database.write(async () => {
      await Promise.all(
        accountsData.map((data, idx) =>
          accounts().create(record => {
            record.type = data.type;
            record.label = data.label;
            record.color = data.color;
            record.initials = data.initials;
            record.balance = parseFloat(data.balance) || 0;
            record.isPrimary = data.isPrimary ?? idx === 0;
            record.sortOrder = data.sortOrder ?? idx;
          }),
        ),
      );
    });
  },
};

export default AccountRepository;
