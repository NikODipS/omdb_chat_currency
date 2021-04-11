const PREFIX = 'history_'
function getAll (userId) {
  return JSON.parse(sessionStorage.getItem(`${PREFIX}${userId}`)) || []
}

function addSearch (userId, searchQuery) {
  const history = getAll(userId)
  sessionStorage.setItem(
    `${PREFIX}${userId}`,
    JSON.stringify([...history, searchQuery])
  )
}

function deleteAll (userId) {
  sessionStorage.removeItem(`${PREFIX}${userId}`)
}

function deleteOne (userId, posIdx) {
  const history = getAll(userId)
  sessionStorage.setItem(
    `${PREFIX}${userId}`,
    JSON.stringify([...history.filter((el, idx) => idx !== posIdx)])
  )
}

export default (context, inject) => {
  const history = {
    getAll,
    addSearch,
    deleteAll,
    deleteOne
  }
  inject('history', history)
}
