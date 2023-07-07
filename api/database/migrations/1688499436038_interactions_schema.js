'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InteractionsSchema extends Schema {
  up () {
    this.create('interactions', (table) => {
      table.increments()
      table.integer('user_id').nullable();
      table.integer('product_id').nullable();
      table.integer('type').nullable();
      table.integer('deleted').nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('interactions')
  }
}

module.exports = InteractionsSchema
