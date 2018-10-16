export default function* difficulty({ _id, correct }) {
  console.log('Difficulty saga')
  const data = {
    _id,
    correct,
  }

  try {
    const request = yield fetch('/public/difficulty', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    console.log(request)
  } catch (error) {
    console.log(error)
  }
}
