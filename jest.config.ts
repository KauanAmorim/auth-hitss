import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node', // Usando o ambiente Node.js para testes
  globals: {
    'ts-jest': {
      isolatedModules: true, // Acelera os testes compilando arquivos individualmente
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'], // Adiciona suporte a tsx
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest', // Transforma arquivos TypeScript e TSX com ts-jest
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'], // Padrão para encontrar os testes
  coverageDirectory: './coverage', // Define onde os relatórios de cobertura serão gerados
  collectCoverage: true, // Habilita a coleta de cobertura de código
};

export default config;
