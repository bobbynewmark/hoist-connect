'use strict';
var ConnectorPipeline = require('hoist-connector-pipeline').Pipeline;
var Hoist = require('../../lib');
var sinon = require('sinon');
var expect = require('chai').expect;
var errors = require('hoist-errors');
var BBPromise = require('bluebird');

describe('Hoist', function () {
  describe('.connector', function () {
    var connector;
    var StubConnector = function () {
      this.get = sinon.stub();
      this.put = sinon.stub();
      this.post = sinon.stub();
    };
    var stubConnector = new StubConnector();
    before(function () {
      sinon.stub(ConnectorPipeline.prototype, 'loadConnector').returns(BBPromise.resolve(stubConnector));
      connector = Hoist.connector('xero', 'key');
    });
    it('loads the specified connector', function () {
      expect(ConnectorPipeline.prototype.loadConnector)
        .to.have.been.calledWith('xero', 'key');
    });
    it('rejects if no connector type specified', function () {
      expect(function () {
        Hoist.connector(null, 'key');
      }).to.throw(errors.connector.request.InvalidError);
    });
    it('rejects if no connector key specified', function () {
      expect(function () {
        Hoist.connector('xero');
      }).to.throw(errors.connector.request.InvalidError);
    });

    describe('#get', function () {
      var response;
      var _promise = BBPromise.resolve(true);
      before(function () {
        stubConnector.get.returns(_promise);
        response = connector.get('/path?query');
      });
      after(function () {
        stubConnector.get.reset();
      });
      it('calls pipeline#get', function () {
        expect(stubConnector.get)
          .to.have.been.calledWith('/path?query');
      });
    });
    describe('#put', function () {
      var response;
      var _promise = BBPromise.resolve(true);
      before(function () {
        stubConnector.put.returns(_promise);
        response = connector.put('/path?query', 'data');
      });
      after(function () {
        stubConnector.put.reset();
      });
      it('calls pipeline#put', function () {
        expect(stubConnector.put)
          .to.have.been.calledWith('/path?query', 'data');
      });
    });
    describe('#del', function () {

    });
    describe('#post', function () {
      var response;
      var _promise = BBPromise.resolve(true);
      before(function () {
        stubConnector.post.returns(_promise);
        response = connector.post('/path?query', 'data');
      });
      after(function () {
        stubConnector.post.reset();
      });
      it('calls pipeline#post', function () {
        expect(stubConnector.post)
          .to.have.been.calledWith('/path?query', 'data');
      });
    });
  });
});
