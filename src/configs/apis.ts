export const { REACT_APP_API_URL: API_URL } = { REACT_APP_API_URL: 'http://localhost:5012' }
// { REACT_APP_API_URL: 'http://localhost:5012' } || process.env //= process.env

const urlId = (id?: string) => (id ? `/${id}` : '')

export const apiUrls = {
  signIn: () => '/api/v1/auth/sign-in',
  signUp: () => '/api/v1/auth/sign-up',
  refresh: () => '/api/v1/auth/refresh',
  battlePlayers: () => '/api/v1/battle/players',
  battle: () => '/api/v1/battle',
  profile: () => '/api/v1/profile',
  cards: (id?: string) => `/api/v1/cards${urlId(id)}`,
  deck: () => '/api/v1/cards/deck',
  upgradeCard: (id: string) => `/api/v1/cards/${id}/upgrade`,

  // Manage
  adminCards: (id?: string) => `/api/v1/manage/cards${urlId(id)}`,
  adminAccounts: (id?: string) => `/api/v1/manage/users${urlId(id)}`,
  adminAccountAddCard: (id?: string) => `/api/v1/manage/users${urlId(id)}/add-card`,
}
