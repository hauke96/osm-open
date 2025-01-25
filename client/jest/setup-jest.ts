import 'jest-preset-angular/setup-jest';

window.URL.createObjectURL = () => '';

window.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
