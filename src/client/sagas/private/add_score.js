export default function* addScore({ score }) {
  const jwt = yield localStorage.getItem('jwt')
  // const data = {
  //   quizId: score.quizId,
  //   score: score.score,
  // }
  console.log('Saga')
  console.log(score)

  try {
    const request = yield fetch('/private/score', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${jwt}`,
      },
      body: JSON.stringify(score),
    })
    // .then(response => response.json())

    console.log(request)
  } catch (error) {
    console.log(error)
  }
}
