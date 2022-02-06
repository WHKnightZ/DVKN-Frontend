export const { REACT_APP_API_URL: API_URL } = { REACT_APP_API_URL: 'http://localhost:5012' }
// { REACT_APP_API_URL: 'http://localhost:5012' } || process.env //= process.env

export const apiUrls = {
  signIn: () => '/api/v1/auth/sign-in',
  signUp: () => '/api/v1/auth/sign-up',
  recovery: () => '/api/v1/auth/recovery',
  forceChange: () => '/api/v1/auth/password/force-change',
  refresh: () => '/api/v1/auth/token/refresh',
  battlePlayers: () => '/api/v1/battle/players',
  battle: () => '/api/v1/battle',
  profile: () => '/api/v1/profile',
  cards: (id?: string) => `/api/v1/cards${id ? `/${id}` : ''}`,
  deck: () => '/api/v1/cards/deck',
  upgradeCard: (id: string) => `/api/v1/cards/${id}/upgrade`,

  // Manage
  adminCards: (id?: string) => `/api/v1/manage/cards${id ? `/${id}` : ''}`,
}
