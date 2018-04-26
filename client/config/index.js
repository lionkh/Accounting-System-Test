export const DOMAIN = 'http://localhost:3000';
export const API_PREFIX = `${DOMAIN}/api/v1`;

export const URL = {
  transactions: {
    get: `${API_PREFIX}/transactions`,
    getById: id => `${API_PREFIX}/transactions/${id}`
  }
};