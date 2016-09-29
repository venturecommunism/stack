import React from 'react'

import jwt from '../jwt'

console.log(jwt)

var joeStr = "{\"iss\":\"joe\",\r\n \"exp\":1300819380,\r\n \"http://example.com/is_root\":true}";
var hs256 = "{\"typ\":\"JWT\",\r\n \"alg\":\"HS256\"}"
var hmacKey = "secret"

var token = new jwt.WebToken(joeStr, hs256)
var signed = token.serialize(hmacKey)
var split = signed.split(".")
console.log(token)
console.log(signed)
console.log(split.length)
console.log(split[0])
console.log(split[1])
console.log(split[2])

export default () => (
  <div>JWT component</div>
)
