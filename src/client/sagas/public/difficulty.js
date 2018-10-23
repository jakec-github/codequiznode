export default function* difficulty({ _id, correct }) {
  const data = {
    _id,
    correct,
  }

  try {
    yield fetch('/public/difficulty', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  } catch (error) {
    console.log(error)
  }
}
