import React from 'react'

import logo from '../../layout/components/images/fivepetal.svg'
import '../../layout/components/styles/app.css'
import '../../layout/components/styles/index.css'

import credentialsQuery from '../../layout/queries/credentials'
import CredentialsContainer from '../../clientjwt/components/index'

import QueryBuilder from '../../querybuilder/components/index'
import TwitterPlus from '../../twitterplus/components/index'
//import CartScape from '../../cartscape/components/index'
import Dashboard from '../../ec_dashboard/components/dashboard'
import Checkout from '../../ec_checkout/components/index'
import Demo from '../../demo/components/index'

const Root = ({result}) => (
  <div>{ result && result.length !== 0 ? <div>
    <div className='App-header'>
      <img src={logo} className='App-logo' alt='logo' />
      <h2>Under Construction</h2>
    </div>
    <p className='App-intro'>
      To get started, edit <code>src/modules/core/components/index.js</code> and save to reload.
    </p>
    <Demo />
    <QueryBuilder />
    <TwitterPlus />
    {/* <CartScape /> */}
    <Dashboard />
    <Checkout />
    <CredentialsContainer />
    <p>
     {/* Credentials: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vZm9vLmNvbSIsInN1YiI6Im1haWx0bzptaWtlQGZvby5jb20iLCJuYmYiOjE0ODcxMTE2NjQsImlhdCI6MTQ4NzExMTY2NCwiZXhwIjoxNDg3MTk4MDY0LCJqdGkiOiJpZDEyMzQ1NiIsImF1ZCI6Imh0dHA6Ly9mb28uY29tL2VtcGxveWVlIn0.pqcMDbUSeSX04fSwaOXqb7it6cBy6QaJhB_Ee7IrlJZtMYlVML7zmfB3FU7O494Qkh8n1luXKFSlEeytCNx5HHBSCCtOsBIG6aaqSmW-u2awwQgpzMFFD5MUTNqnOFnjw3DjPubNIQqMbC9Y5c7xvWlz6GFwP7YEOwjCVTitf1wEhN3b2iNBUF5DtUukFMnEMv2pEPi9PAzY0LzJHzJRg9Ntc7jqKi060ELppOcjOV1GSs-ofF1Z--xNXZbi5vULaYEyh6inN0wFDdoEz1lq6xSJUSFRMgCbULXRCqhtaK1A2Fhqg3aTRPInavXnJutozlgUYI7sbyXtVKbNSEWUyA */}
    </p>
 </div> : <div>

    <div className='App-header'>
      <img src={logo} className='App-logo' alt='logo' />
    </div>
    <p className='App-intro'>
      {/* Credentials: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vZm9vLmNvbSIsInN1YiI6Im1haWx0bzptaWtlQGZvby5jb20iLCJuYmYiOjE0ODcxMTE2NjQsImlhdCI6MTQ4NzExMTY2NCwiZXhwIjoxNDg3MTk4MDY0LCJqdGkiOiJpZDEyMzQ1NiIsImF1ZCI6Imh0dHA6Ly9mb28uY29tL2VtcGxveWVlIn0.pqcMDbUSeSX04fSwaOXqb7it6cBy6QaJhB_Ee7IrlJZtMYlVML7zmfB3FU7O494Qkh8n1luXKFSlEeytCNx5HHBSCCtOsBIG6aaqSmW-u2awwQgpzMFFD5MUTNqnOFnjw3DjPubNIQqMbC9Y5c7xvWlz6GFwP7YEOwjCVTitf1wEhN3b2iNBUF5DtUukFMnEMv2pEPi9PAzY0LzJHzJRg9Ntc7jqKi060ELppOcjOV1GSs-ofF1Z--xNXZbi5vULaYEyh6inN0wFDdoEz1lq6xSJUSFRMgCbULXRCqhtaK1A2Fhqg3aTRPInavXnJutozlgUYI7sbyXtVKbNSEWUyA */}
    </p>
    <CredentialsContainer />
    </div>
    }
  </div>
)

export default credentialsQuery(Root)
