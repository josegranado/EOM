'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TwinsSchema extends Schema {
  up () {
    this.create('twins', (table) => {
      table.increments()
      table.integer('from').nullable();
      table.integer('to').nullable();
      table.integer('deleted').nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('twins')
  }
}

module.exports = TwinsSchema
