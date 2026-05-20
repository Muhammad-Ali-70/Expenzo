import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'accounts',
      columns: [
        { name: 'type', type: 'string' }, // 'wallet' | 'bank' | 'digitalWallet'
        { name: 'label', type: 'string' },
        { name: 'color', type: 'string' },
        { name: 'initials', type: 'string' },
        { name: 'balance', type: 'number' },
        { name: 'is_primary', type: 'boolean' },
        { name: 'sort_order', type: 'number' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'transactions',
      columns: [
        { name: 'account_id', type: 'string', isIndexed: true },
        { name: 'type', type: 'string' }, // 'expense' | 'income'
        { name: 'amount', type: 'number' },
        { name: 'category', type: 'string' },
        { name: 'note', type: 'string', isOptional: true },
        { name: 'date', type: 'number' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
  ],
});
