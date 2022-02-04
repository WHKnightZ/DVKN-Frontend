export const { REACT_APP_API_URL: API_URL } = process.env
// { REACT_APP_API_URL: 'http://localhost:5012' } || process.env //= process.env

export const apiUrls = {
  signIn: () => '/api/v1/auth/sign-in',
  signUp: () => '/api/v1/auth/sign-up',
  recovery: () => '/api/v1/auth/recovery',
  forceChange: () => '/api/v1/auth/password/force-change',
  refresh: () => '/api/v1/auth/token/refresh',
  users: () => '/api/v1/users',
  battle: () => '/api/v1/battle',

  // Manage
  cards: (id?: string) => `/api/v1/manage/cards${id ? `/${id}` : ''}`,
}
