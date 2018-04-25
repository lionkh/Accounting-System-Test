export const DOMAIN = '';
export const API_PREFIX = `${DOMAIN}/api/v1`;

export const URL = {
  transactions: {
    get: `${API_PREFIX}/chat/index`,
    byId: id => `${API_PREFIX}/chat/${id}`
  }
};