import moment from 'moment'

/**
 * Get current time
 */
export const getCurrentTime = () => {
  console.log('Current time', moment().format('YYYY-MM-DD'))
}
