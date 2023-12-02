const app = require('../src/index')
const chai = require('chai')
const chaiHttp = require('chai-http')
const db = require('../src/dbClient')
const userController = require('../src/controllers/user')

chai.use(chaiHttp)

describe('User REST API', () => {
  
    beforeEach(() => {
      // Clean DB before each test
      db.flushdb()
    })
    
    after(() => {
      app.close()
      db.quit()
    })

    describe('POST /user', () => {

        it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
    
        it('pass wrong parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
    });
    describe('GET /user', ()=> {
        it('get an user', (done) => {
            const user = {
                username: 'sergkudinov',
                firstname: 'Sergei',
                lastname: 'Kudinov'
            }
            userController.create(user, () => {
                chai.request(app)
                    .get('/user/' + user.username)
                    .then((res) => {
                        chai.expect(res).to.have.status(200)
                        chai.expect(res.body.status).to.equal('success')
                        chai.expect(res).to.be.json
                        done()
                    })
                    .catch((err) => {
                        done(err);
                    })
            })
        }),
        it('get an user that does not exist', (done) => {
            chai.request(app)
                .get('/user/invalid')
                .then((res) => {
                    chai.expect(res).to.have.status(400)
                    chai.expect(res.body.status).to.equal('error')
                    chai.expect(res).to.be.json
                    done()
                })
                .catch((err) => {
                    done(err);
                })
        })
    })
    describe('PUT /user', ()=> {
        it('update an user', (done) => {
            const user = {
                username: 'sergkudinov',
                firstname: 'Sergei',
                lastname: 'Kudinov'
            }
            userController.create(user, () => {
                chai.request(app)
                    .put('/user/' + user.username)
                    .send({
                        firstname: 'Guillaume',
                        lastname: 'Prevost'
                    })
                    .then((res) => {
                        chai.expect(res).to.have.status(200)
                        chai.expect(res.body.status).to.equal('success')
                        chai.expect(res).to.be.json
                        done()
                    })
                    .catch((err) => {
                        done(err);
                    })
            })
        }),
        it('update an user that does not exist', (done) => {
            chai.request(app)
                .put('/user/invalid')
                .send({
                    firstname: 'Guillaume',
                    lastname: 'Prevost'
                })
                .then((res) => {
                    chai.expect(res).to.have.status(400)
                    chai.expect(res.body.status).to.equal('error')
                    chai.expect(res).to.be.json
                    done()
                })
                .catch((err) => {
                    done(err);
                })
        })
    })
    describe('DELETE /user', ()=> {
        it('delete an user', (done) => {
            const user = {
                username: 'sergkudinov',
                firstname: 'Sergei',
                lastname: 'Kudinov'
            }
            userController.create(user, () => {
                chai.request(app)
                    .delete('/user/' + user.username)
                    .then((res) => {
                        chai.expect(res).to.have.status(200)
                        chai.expect(res.body.status).to.equal('success')
                        chai.expect(res).to.be.json
                        done()
                    })
                    .catch((err) => {
                        done(err);
                    })
            })
        }),
        it('delete an user that does not exist', (done) => {
            chai.request(app)
                .delete('/user/invalid')
                .then((res) => {
                    chai.expect(res).to.have.status(400)
                    chai.expect(res.body.status).to.equal('error')
                    chai.expect(res).to.be.json
                    done()
                })
                .catch((err) => {
                    done(err);
                })
        })
    })

})


