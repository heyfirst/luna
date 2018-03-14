export const sendCompile = (req, res) => {
  let code = req.body.code
  console.log(code)
  res.send('data')
}
