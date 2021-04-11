import Vue from 'vue'

const localBus = new Vue()

const REGISTRATIONS = 'registrations'
function registeredUsers () {
  const item = sessionStorage.getItem(REGISTRATIONS)
  if (!item) {
    return []
  }
  return JSON.parse(item)
}

function saveRegistrations (registers) {
  sessionStorage.setItem(REGISTRATIONS, JSON.stringify(registers))
}

class Guard {
  constructor (redirect) {
    this.redirect = redirect
  }

  onAuthentication (callback) {
    localBus.$on('authentication', callback)
    this.fireAuthentication()
  }

  fireAuthentication () {
    localBus.$emit('authentication', this.isAuthenticated())
  }

  isAuthenticated () {
    if (sessionStorage.getItem('auth')) {
      return this.getUser() !== null
    }
  }

  register (email, name, surname) {
    const registered = registeredUsers()

    if (registered.map(el => el.email).includes(email)) {
      return false
    }

    saveRegistrations([
      ...registered,
      {
        uuid: btoa(new Date()),
        email,
        name,
        surname
      }
    ])
    return true
  }

  login (email) {
    const registered = registeredUsers()
    const user = registered.find(u => u.email === email)
    if (!user) {
      return false
    }

    sessionStorage.setItem('auth', user.uuid)
    this.fireAuthentication()
    return this.redirect('/')
  }

  logout () {
    sessionStorage.removeItem('auth')
    this.fireAuthentication()
    return this.redirect('/login')
  }

  getUser () {
    const uuid = sessionStorage.getItem('auth')
    if (uuid) {
      const registered = registeredUsers()
      return registered.find(u => u.uuid === uuid)
    }

    return null
  }
}

export default ({ app, redirect }, inject) => {
  inject('guard', new Guard(redirect))
}
