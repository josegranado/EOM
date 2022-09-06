'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SurveysSchema extends Schema {
  up () {
    this.create('surveys', (table) => {
      table.increments()
      table.string('broker_name').nullable()
      table.text('question_2').nullable()
      table.text('question_1').nullable()
      table.integer('user_id').unsigned()
      table.integer('deleted').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('surveys')
  }
}

module.exports = SurveysSchema
