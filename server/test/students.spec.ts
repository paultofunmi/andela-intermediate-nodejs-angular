import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';
import { app } from '../app';
import Student from '../models/student';

const should = chai.use(chaiHttp).should();

describe('Students', () => {

  beforeEach(done => {
    Student.remove({}, err => {
      done();
    });
  });

  describe('Backend tests for students', () => {

    it('should get all the students', done => {
      chai.request(app)
        .get('/api/students')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get students count', done => {
      chai.request(app)
        .get('/api/students/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('should create new student', done => {
      const student = { firstName: 'Paul', lastName: 'Tofunmi', program: 'Comp. Sci Major', address: 'Lagos Nigeria', phone: '081111111111' , age: 26 };
      chai.request(app)
        .post('/api/student')
        .send(student)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('firstName');
          res.body.should.have.a.property('lastName');
          res.body.should.have.a.property('program');
          res.body.should.have.a.property('address');
          res.body.should.have.a.property('phone');
          res.body.should.have.a.property('age');
          done();
        });
    });

    it('should get a student by its id', done => {
      const student = new Student({ firstName: 'Paul', lastName: 'Tofunmi', program: 'Comp. Sci Major', address: 'Lagos Nigeria', phone: '081111111111' , age: 26 });
      student.save((error, newStudent) => {
        chai.request(app)
          .get(`/api/student/${newStudent.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.a.property('firstName');
          res.body.should.have.a.property('lastName');
          res.body.should.have.a.property('program');
          res.body.should.have.a.property('address');
          res.body.should.have.a.property('phone');
          res.body.should.have.a.property('age');
            res.body.should.have.property('_id').eql(newStudent.id);
            done();
          });
      });
    });

    it('should update a student by its id', done => {
      const student = new Student({ firstName: 'Paul', lastName: 'Tofunmi', program: 'Comp. Sci Major', address: 'Lagos Nigeria', phone: '081111111111' , age: 26 });
      student.save((error, newStudent) => {
        chai.request(app)
          .put(`/api/student/${newStudent.id}`)
          .send({ age: 29 })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should delete a student by its id', done => {
      const student = new Student({ firstName: 'Paul', lastName: 'Tofunmi', program: 'Comp. Sci Major', address: 'Lagos Nigeria', phone: '081111111111' , age: 26 });
      student.save((error, newStudent) => {
        chai.request(app)
          .delete(`/api/student/${newStudent.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

});


