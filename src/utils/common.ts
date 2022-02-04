import { AuthType } from 'types'

/**
 * Detect user agent is mobile or not
 *
 * @return Boolean
 */
export const isMobile = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

/**
 * Capitalize first letter in word
 * @param string
 * @returns
 */
export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * Capitalize each first letter of word in sentence
 * @param string
 * @returns
 */
export const capitalizeWords = (string: string) => {
  if (!string) return ''
  return string
    .split(' ')
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .reduce((x, y) => x + ' ' + y)
}

/**
 * Get user from local storage
 */
export const getUserLS = () => {
  const oldUser = localStorage.getItem('user') || '{}'
  let parsedUser
  try {
    parsedUser = JSON.parse(oldUser)
  } catch (e) {}
  return (parsedUser || {}) as AuthType
}

/**
 * Update user to local storage
 * @param user
 */
export const updateUserLS = (user: AuthType) => {
  const oldUser = getUserLS()
  localStorage.setItem('user', JSON.stringify({ ...oldUser, ...user }))
}

/**
 * Remove user from local storage
 * @param user
 */
export const removeUserLS = () => {
  localStorage.removeItem('user')
}

// Random id with 6 characters
export const randomId = () => Math.random().toString(36).substr(2, 6)

export const removeAccents = (name: string) => {
  return (
    name
      .trim()
      .toLowerCase()
      // Tách chữ có dấu thành 2 thành phần: chữ và dấu
      .normalize('NFD')
      // Chuyển đ thành d
      .replace(/đ/g, 'd')
      // Xóa toàn bộ dấu
      .replace(/([\u0300-\u036f]|[^0-9a-zA-Z ])/g, '')
  )
}

export const convertToId = (name: string) => {
  return (
    removeAccents(name)
      // Chuyển hết dấu cách thành gạch ngang
      .replace(/\s+/g, '-')
  )
}
