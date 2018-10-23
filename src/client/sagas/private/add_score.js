export default function* addScore({ score }) {
  const jwt = yield localStorage.getItem('jwt')

  try {
    yield fetch('/private/score', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${jwt}`,
      },
      body: JSON.stringify(score),
    })
    // .then(response => response.json())
  } catch (error) {
    console.log(error)
  }
}
