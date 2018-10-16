export default function* logOut() {
  yield localStorage.removeItem('jwt')
}
