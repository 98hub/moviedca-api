// Setup file untuk konfigurasi global testing
process.env.NODE_ENV = 'test';
process.env.DB_NAME = 'moviedca_db';
process.env.DB_USER = 'root';
process.env.DB_PASSWORD = 'root';
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '3306';
process.env.PORT = '3000';

// Mock console.log untuk testing yang lebih bersih
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};      