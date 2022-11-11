'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionsSchema extends Schema {
  up () {
    this.create('transactions', (table) => {
      table.increments()
      table.integer('buyer_id').nullable();
      table.integer('saler_id').nullable();
      table.integer('amount').nullable();
      table.integer('deleted').nullable();
      table.integer('account_id').nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('transactions')
  }
}

module.exports = TransactionsSchema
