'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CalificationsSchema extends Schema {
  up () {
    this.create('califications', (table) => {
      table.increments()
      table.integer('buyer').nullable();
      table.integer('saler').nullable();
      table.integer('buyer_id').nullable();
      table.integer('saler_id').nullable();
      table.integer('product_id').nullable();
      table.string('buyer_comment').nullable();
      table.string('saler_comment').nullable();
      table.integer('deleted').nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('califications')
  }
}

module.exports = CalificationsSchema
