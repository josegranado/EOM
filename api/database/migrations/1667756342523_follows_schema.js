'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FollowsSchema extends Schema {
  up () {
    this.create('follows', (table) => {
      table.increments()
      table.integer('follower_id').nullable();
      table.integer('followed_id').nullable();
      table.integer('deleted').nullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('follows')
  }
}

module.exports = FollowsSchema
