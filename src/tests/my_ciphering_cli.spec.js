const spawn = require('child_process').spawn;
const fs = require('fs')

const MESSAGE = 'This is secret. Message about "_" symbol!'

afterAll(done => {
  done();
});

describe('my_ciphering_cli success scenarios', () => {
  it('should correctly encode and decode data (exp1)',  (done) => {
    const cp = spawn('node', ['my_ciphering_cli', '-c', 'C1-C1-R0-A']);
    cp.stdin.write(MESSAGE);
    cp.stdout.on('data', function (data) {
      expect(data.toString()).toEqual('Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!');
      done();
    });
  });
  it('should correctly encode and decode data (exp2)', (done) => {
    const cp = spawn('node', ['my_ciphering_cli', '-c', 'C1-C0-A-R1-R0-A-R0-R0-C1-A']);
    cp.stdin.write(MESSAGE);
    cp.stdout.on('data', function (data) {
      expect(data.toString()).toEqual('Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!');
      done();
    });
  });
  it('should correctly encode and decode data (exp3)', (done) => {
    const cp = spawn('node', ['my_ciphering_cli', '-c', 'A-A-A-R1-R0-R0-R0-C1-C1-A']);
    cp.stdin.write(MESSAGE);
    cp.stdout.on('data', function (data) {
      expect(data.toString()).toEqual('Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!');
      done();
    });
  });
  it('should correctly encode and decode data (exp4)',  (done) => {
    const cp = spawn('node', ['my_ciphering_cli', '-c', 'C1-R1-C0-C0-A-R0-R1-R1-A-C1']);
    cp.stdin.write(MESSAGE);
    cp.stdout.on('data', function (data) {
      expect(data.toString()).toEqual('This is secret. Message about "_" symbol!');
      done();
    });
  });
});


jest.mock('fs')

describe("my_ciphering_cli error scenarios", () => {
  it("should show error if input file doesn't exist",  (done) => {
    const cp = spawn('node', ['my_ciphering_cli', '-c', 'C1-C1-R0-A', '-i', 'input.txt']);
    fs.existsSync.mockReturnValue(false);
    cp.stderr.on('data', function (data) {
      expect(data.toString().trim()).toEqual(`Error: "Файл input.txt недоступен"`);
      done();
    });
  });
  it("should show error if output file doesn't exist",  (done) => {
    const cp = spawn('node', ['my_ciphering_cli', '-c', 'C1-C1-R0-A', '-o', 'output.txt']);
    fs.existsSync.mockReturnValue(false);
    cp.stderr.on('data', function (data) {
      expect(data.toString().trim()).toEqual(`Error: "Файл output.txt недоступен"`);
      done();
    });
  });
  it('should show error if arg for config is missed',  (done) => {
    const cp = spawn('node', ['my_ciphering_cli', '-o', 'output.txt']);
    cp.stderr.on('data', function (data) {
      expect(data.toString().trim()).toEqual(`Error: "Проверьте правильность ввода. Аргумент config отсутствует"`);
      done();
    });
  });
  it('should show error if any args are dublicated',  (done) => {
    const cp = spawn('node', ['my_ciphering_cli', '-c', 'C1-C1-R0-A1', "-c", "A"]);
    cp.stderr.on('data', function (data) {
      expect(data.toString().trim()).toEqual(`Error: "Проверьте правильность ввода. Аргументы дублируются"`);
      done();
    });
  });
    it('should show error if config is not valid',  (done) => {
      const cp = spawn('node', ['my_ciphering_cli', '-c', 'C1-C1-R0-A1']);
      cp.stderr.on('data', function (data) {
        expect(data.toString().trim()).toEqual(`Error: "Проверьте правильность ввода. Аргумент config невалиден"`);
        done();
      });
    });
})


