'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReportsSchema extends Schema {
  up () {
    this.create('reports', (table) => {
      table.increments()
      table.integer('user_id').nullable();
      table.integer('product_id').nullable();
      table.integer('type').nullable();
      table.text('message').nullable();
      table.integer('deleted').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('reports')
  }
}

module.exports = ReportsSchema
