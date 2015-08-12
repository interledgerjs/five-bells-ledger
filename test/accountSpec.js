/*global describe, it*/
'use strict'
const _ = require('lodash')
const expect = require('chai').expect
const app = require('../app')
const db = require('../services/db')
const logger = require('../services/log')
const dbHelper = require('./helpers/db')
const appHelper = require('./helpers/app')
const logHelper = require('@ripple/five-bells-shared/testHelpers/log')

describe('Accounts', function () {
  logHelper(logger)

  beforeEach(function *() {
    appHelper.create(this, app)

    // Define example data
    this.exampleAccounts = _.cloneDeep(require('./data/accounts'))
    this.existingAccount = this.exampleAccounts.alice

    // Reset database
    yield dbHelper.reset()

    // Store some example data
    yield dbHelper.addAccounts([this.existingAccount])
  })

  describe('GET /accounts', function () {
    it('should return 200', function *() {
      const account = this.existingAccount
      yield this.request()
        .get('/accounts')
        .expect(200)
        .expect([account])
        .end()
    })

    it('should return 200 with an empty array if there are no accounts', function *() {
      yield db.remove(['accounts'])
      yield this.request()
        .get('/accounts')
        .expect(200)
        .expect([])
        .end()
    })
  })

  describe('GET /accounts/:uuid', function () {
    it('should return 200 for an account that exists', function *() {
      yield this.request()
        .get(this.existingAccount.id)
        .expect(200)
        .end()
    })

    it('should return 404 when the account does not exist', function *() {
      yield this.request()
        .get(this.exampleAccounts.bob.id)
        .expect(404)
        .end()
    })

    it('should strip out the password field', function *() {
      const account = this.existingAccount
      const accountWithoutPassword = _.clone(account)
      delete accountWithoutPassword.password
      yield this.request()
        .get(this.existingAccount.id)
        .expect(200)
        .expect(accountWithoutPassword)
        .end()
    })

    it('should return the balance as a string', function *() {
      yield this.request()
        .get(this.existingAccount.id)
        .expect(200)
        .expect(function (res) {
          if (typeof res.body.balance !== 'string') {
            throw new Error('Balance should be a string')
          }
        })
        .end()
    })
  })

  describe('PUT /accounts/:uuid', function () {
    it('should return 201', function *() {
      const account = this.exampleAccounts.bob
      yield this.request()
        .put(account.id)
        .send(account)
        .expect(201)
        .expect(account)
        .end()

      // Check balances
      expect((yield dbHelper.getAccount('bob')).getData()).to.deep.equal(this.exampleAccounts.bob)
    })

    it('should return 200 if the account already exists', function *() {
      const account = this.existingAccount
      account.balance = '90'
      yield this.request()
        .put(this.existingAccount.id)
        .send(account)
        .expect(200)
        .expect(account)
        .end()

      // Check balances
      expect(yield db.get(['accounts', 'alice', 'balance'])).to.equal('90')
    })
  })
})
