'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('title', 90).nullable()
      table.string('thumbnail').nullable()
      table.integer('user_id').unsigned().nullable()
      table.text('uuid').nullable()
      table.integer('category_id').unsigned().nullable()
      table.text('description').nullable()
      table.integer('is_used').nullable()
      table.float('price', 25, 2).nullable()
      table.integer('duration').unsigned().nullable()
      table.text('gallery').nullable()
      table.integer('ubication').nullable();
      table.integer('deleted').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductsSchema
