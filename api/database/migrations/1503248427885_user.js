'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).nullable().unique()
      table.string('email', 254).notNullable().unique()
      table.integer('role').notNullable()
      
      table.integer('is_approved').notNullable()
      table.integer('type').notNullable()
      table.string('password', 60).notNullable()

      table.boolean('notifications').nullable()
      table.boolean('offers').nullable()
      table.boolean('terms').nullable()
      table.boolean('terms_and_privacity').nullable()

      table.integer('deleted').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
