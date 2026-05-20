import { Model } from '@nozbe/watermelondb';
import { field, readonly, date, writer } from '@nozbe/watermelondb/decorators';

export default class Account extends Model {
  static table = 'accounts';
  static associations = {
    transactions: { type: 'has_many', foreignKey: 'account_id' },
  };

  @field('type') type;
  @field('label') label;
  @field('color') color;
  @field('initials') initials;
  @field('balance') balance;
  @field('is_primary') isPrimary;
  @field('sort_order') sortOrder;
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;
}
