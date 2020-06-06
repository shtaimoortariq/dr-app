const Auth = {
  getAuth () {
    return !!localStorage.getItem('PAU')
  }
}

export default Auth
