'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnterprisesSchema extends Schema {
  up () {
    this.create('enterprises', (table) => {
      table.increments()
      table.string('name').nullable()
      table.string('rfc').unique().nullable()
      table.string('state').nullable()
      table.integer('n_employees').nullable()
      table.integer('sector').nullable()
      table.integer('user_id').unsigned().nullable()
      table.integer('deleted').nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('enterprises')
  }
}

module.exports = EnterprisesSchema
