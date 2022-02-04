export const validateEmail = () => /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
export const validatePassword = () =>
  /(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9!@#$%^&*()\\-_=+{}|?>.<,:;]{8,16}/
export const validateName = () => /^([A-Za-z ']+\s?)*$/
export const validatePhone = () => /^[+0-9]{0,1}[0-9]{0,18}[0-9]$/

export const validateTypingPhone = (e: any) => /^[+0-9][0-9]*$/.test(e.target.value)
export const validateTypingNumber = (e: any) => /^[0-9]*$/.test(e.target.value)

export const validateTypingName = (e: any) => {
  const value = e.target.value
  if (value.trim() === '') return false
  if (value.includes('  ')) return false
  if (
    // eslint-disable-next-line no-useless-escape
    /[0-9`~!@#$%^&*(),.?'":;{}+=|<>_\-\\\/\[\]]/.test(value)
  )
    return false
  return true
}
