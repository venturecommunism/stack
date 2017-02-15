import {KJUR, KEYUTIL, b64utoutf8} from 'jsrsasign'
import publickey from '../../../configs/publickey'

export default {
  inputcredentials({conn, transact, log, meta}, ref, result) {
    const pubkey = KEYUTIL.getKey(publickey)
    const isValid = KJUR.jws.JWS.verifyJWT(ref, pubkey, {alg: ['RS256']})

    if (!isValid) {
      console.log('unauthorized attempt')
      return
    } else {
      console.log('verified')
    }

    transact(conn, [{':db/add': -1, 'name': 'Credentials', 'app/credentials': ref }], {'secrets': 'true'})
  },
}
