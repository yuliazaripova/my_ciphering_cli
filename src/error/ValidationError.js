class ValidationError extends Error {
    constructor(message) {
      super(message); 
      this.name = "ValidationError"; 
    }
}
class ConfigRequiredError extends ValidationError {
    constructor() {
      super("Проверьте правильность ввода. Аргумент config отсутствует");
      this.name = "CongigRequiredError";
    }
}
class ConfigNotValidError extends ValidationError {
  constructor() {
    super("Проверьте правильность ввода. Аргумент config невалиден");
    this.name = "ConfigNotValidError";
  }
}
class ArgsDuplicatedError extends ValidationError {
  constructor() {
    super("Проверьте правильность ввода. Аргументы дублируются");
    this.name = "ArgsDuplicatedError";
  }
}
class FileMissingError extends ValidationError {
  constructor(file) {
    super(`Файл ${file} недоступен`);
    this.name = "FileMissingError";
    this.file = file
  }
}
  
module.exports = {
    ValidationError,
    ConfigRequiredError,
    ConfigNotValidError,
    ArgsDuplicatedError,
    FileMissingError
}