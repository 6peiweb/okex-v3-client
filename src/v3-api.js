const { AuthenticatedClient } = require('@okfe/okex-node')

const auth = new AuthenticatedClient('f3a5860b-e5f6-4d6e-8477-78690024e47f', 'DE5704A86D042DB3662F79C626629140', 'lp19970127', 'https://www.okex.me')

const result = async () => {
  const data = await auth.spot().getAccounts()
  return data
}

console.log('*********************************')
console.log(result())
console.log('*********************************')