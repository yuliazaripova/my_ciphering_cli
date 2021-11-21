const spawn = require('child_process').spawn;

const MESSAGE = 'This is secret. Message about "_" symbol!'

afterAll(done => {
  done();
});

describe('my_ciphering_cli', () => {
  it('should correctly encode anf decode data (exp1)',  (done) => {
    const cp = spawn('node', ['my_ciphering_cli', '-c', 'C1-C1-R0-A']);
    cp.stdin.write(MESSAGE);
    cp.stdout.on('data', function (data) {
      expect(data.toString()).toEqual('Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!');
      done();
    });
  });
  it('should correctly encode anf decode data (exp2)', (done) => {
    const cp = spawn('node', ['my_ciphering_cli', '-c', 'C1-C0-A-R1-R0-A-R0-R0-C1-A']);
    cp.stdin.write(MESSAGE);
    cp.stdout.on('data', function (data) {
      expect(data.toString()).toEqual('Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!');
      done();
    });
  });
  it('should correctly encode anf decode data (exp3)', (done) => {
    const cp = spawn('node', ['my_ciphering_cli', '-c', 'A-A-A-R1-R0-R0-R0-C1-C1-A']);
    cp.stdin.write(MESSAGE);
    cp.stdout.on('data', function (data) {
      expect(data.toString()).toEqual('Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!');
      done();
    });
  });
  it('should correctly encode anf decode data (exp4)',  (done) => {
    const cp = spawn('node', ['my_ciphering_cli', '-c', 'C1-R1-C0-C0-A-R0-R1-R1-A-C1']);
    cp.stdin.write(MESSAGE);
    cp.stdout.on('data', function (data) {
      expect(data.toString()).toEqual('This is secret. Message about "_" symbol!');
      done();
    });
  });
});


