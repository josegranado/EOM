'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServicesSchema extends Schema {
  up () {
    this.create('services', (table) => {
      table.increments()
      table.string('title').nullable()
      table.integer('duration').nullable()
      table.string('ubication').nullable()
      table.string('thumbnail').nullable()
      table.text('gallery').nullable()
      table.string('uuid').unique().nullable()
      table.integer('user_id').nullable()
      table.integer('deleted').nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('services')
  }
}

module.exports = ServicesSchema
