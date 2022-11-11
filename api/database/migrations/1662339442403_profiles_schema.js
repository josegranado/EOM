'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfilesSchema extends Schema {
  up () {
    this.create('profiles', (table) => {
      table.increments()
      table.string('first_name').nullable()
      table.string('last_name').nullable()
      table.string('ocupation').nullable()
      table.integer('departament').nullable()
      table.string('phone_number').nullable()
      table.string('phone_local_number').nullable()
      table.integer('postal_code').nullable()
      table.integer('state').nullable()
      table.string('birthday').nullable()
      table.integer('gender').nullable()
      table.integer('deleted').nullable()
      table.string('avatar').nullable()
      table.string('cover').nullable();
      //FIELDS AGREGADOS EN LA ACTUALIZACIÓN DEL PERFIL.
      table.string('description').nullable()
      table.string('ubication').nullable();

      table.integer('user_id').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('profiles')
  }
}

module.exports = ProfilesSchema
