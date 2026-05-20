import { Model } from '@nozbe/watermelondb';
import {
  field,
  relation,
  readonly,
  date,
} from '@nozbe/watermelondb/decorators';

export default class Transaction extends Model {
  static table = 'transactions';
  static associations = {
    accounts: { type: 'belongs_to', key: 'account_id' },
  };

  @field('account_id') accountId;
  @field('type') type;
  @field('amount') amount;
  @field('category') category;
  @field('note') note;
  @field('date') date;
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;

  @relation('accounts', 'account_id') account;
}
