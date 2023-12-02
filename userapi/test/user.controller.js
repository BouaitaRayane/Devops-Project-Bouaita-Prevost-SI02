const { expect } = require('chai')
const userController = require('../src/controllers/user')
const db = require('../src/dbClient')

describe('User', () => {
  
  beforeEach(() => {
    db.flushdb()
  })

  describe('Create', () => {
    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        done()
      })
    })

    it('passing wrong user parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

    it('avoid creating an existing user', (done)=> {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      };
      userController.create (user, ()=> {
        userController.create (user, (err, result)=> {
          expect(err).to.not.be.equal(null)
          expect(result).to.be.equal(null)
          done()
        })
      })
     })

    it('only give username input for userr', (done) => {
        const user = {
            username: 'sergkudinov',
        }
        userController.create(user, (err, result) => {
            expect(err).to.not.be.equal(null)
            expect(result).to.be.equal(null)
            done()
        })
    })
  })

  describe('Get', ()=> {

    it('get a user by username', (done) => {
      // 1. First, create a user to make this unit test independent from the others
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      };
        // 2. Then, check if the result of the get method is correct
        userController.create(user, () => {
          userController.get(user.username, (err, result) => {
            expect(err).to.be.equal(null)
            expect(result).to.be.deep.equal(
                {
                    firstname: "Sergei",
                    lastname: "Kudinov",
                })
            done()
          })
        })
    })

     it('cannot get a user when it does not exist', (done) => {
       userController.get('notexist', (err, result) => {
            expect(err).to.not.be.equal(null)
            expect(result).to.be.equal(null)
            done()
       })
     })
   })

  describe('Update', () => {
    it('update a user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      };
      const updatedUser = {
        firstname: 'Sergey',
        lastname: 'Kudinov'
      };
      userController.create(user, () => {
        userController.update(user.username, updatedUser, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.be.equal('OK')
          done()
        })
      })
    })

    it('cannot update a user when it does not exist', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      };
      userController.update('notexist', user, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })
  })

    describe('Delete', () => {
        it('delete a user', (done) => {
        const user = {
            username: 'sergkudinov',
            firstname: 'Sergei',
            lastname: 'Kudinov'
        };
        userController.create(user, () => {
            userController.delete(user.username, (err, result) => {
            expect(err).to.be.equal(null)
            expect(result).to.be.equal(1)
            done()
            })
        })
        })

        it('cannot delete a user when it does not exist', (done) => {
        userController.delete('notexist', (err, result) => {
            expect(err).to.not.be.equal(null)
            expect(result).to.be.equal(null)
            done()
        })
        })
    })
})
