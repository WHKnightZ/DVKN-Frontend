/**
 * Highlight keyword
 *
 * @param text Text wanna check
 * @param keyword Keyword
 */
export const highlightKeyword = (text = '', keyword = '') => {
  return text.replace(new RegExp(keyword, 'g'), '<strong>' + keyword + '</strong>')
}
