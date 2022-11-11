'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AccountsSchema extends Schema {
  up () {
    this.create('accounts', (table) => {
      table.increments()
      table.integer('user_id').unique().nullable();
      table.float('balance').nullable();
      table.integer('deleted').nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('accounts')
  }
}

module.exports = AccountsSchema
