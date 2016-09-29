import React from 'react'

import {KJUR, KEYUTIL} from 'jsrsasign'

/*
// Header
var oHeader = {alg: 'HS256', typ: 'JWT'}
// Payload
var oPayload = {}
var tNow = KJUR.jws.IntDate.get('now')
var tEnd = KJUR.jws.IntDate.get('now + 1day')
oPayload.iss = 'http://foo.com'
oPayload.sub = 'mailto:mike@foo.com'
oPayload.nbf = tNow
oPayload.iat = tNow
oPayload.exp = tEnd
oPayload.jti = 'id123456'
oPayload.aud = 'http://foo.com/employee'
// Sign JWT, password=secret
var sHeader = JSON.stringify(oHeader)
var sPayload = JSON.stringify(oPayload)
var sJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, {utf8: 'secret'})
*/

// Header
var oHeader = {alg: 'RS256', typ: 'JWT'}
// Payload
var oPayload = {}
var tNow = KJUR.jws.IntDate.get('now')
var tEnd = KJUR.jws.IntDate.get('now + 1day')
oPayload.iss = 'http://foo.com'
oPayload.sub = 'mailto:mike@foo.com'
oPayload.nbf = tNow
oPayload.iat = tNow
oPayload.exp = tEnd
oPayload.jti = 'id123456'
oPayload.aud = 'http://foo.com/employee'
// Sign JWT with RSA
var sHeader = JSON.stringify(oHeader)
var sPayload = JSON.stringify(oPayload)

// to create this pem key from an ssh-keygen RSA private key:
// openssl rsa -in id_rsa -outform pem > id_rsa.pem

// DO NOT USE THIS PUBLIC-PRIVATE KEY PAIR. GENERATE YOUR OWN WITH ssh-keygen

var strVar = ''
strVar += '-----BEGIN RSA PRIVATE KEY-----'
strVar += 'MIIEogIBAAKCAQEApwcONliJk7t7gU5+0V+2rh8ubQ40nhj83G1kuh+7sLWRjrvg'
strVar += 'JFziUspCDVSOpyEOT7+ZOsJauCqQpV1NyaXVppd6FhezmizjNMJ06DU3tzD3RcKX'
strVar += 'BBIYJm3n8+jwgMvYperGAIVMMEBWPTBYy+HA5KcxOK85JGKoPtVFD/IAtpSAudOV'
strVar += 'ddNsi/Lg383Zm+Dn859kXZXI40q7o7vHhvFKK4yI6NF3phakxIJz8ffs+ceWzPAK'
strVar += 'FyAqqcViKynRVoZS5zRNA+AJpN5aalX2tQsRYQ8Ok0G0yLt4iBnP8KYVK53nxNKW'
strVar += 'girXWdDxz9YnJecMH4VjS2Qxv2nouisSQ2FhlwIDAQABAoIBAHqCNU1tMTOXbuYP'
strVar += '8fqWDoK2QjIhGjzfrQ/seNX/koXxFxsu+B8TtbjtuvbWD2/MUhfyO2yawzmTltaD'
strVar += 'khuWNBflwNlVdxldVSUMf/0Vk5EdLDERofyNXQNK17fSIh0F5xkDE0mse45kkhx9'
strVar += 'SpP4OKg9bV/bPblPV4IGoYopgZZoM91nRAnaInFs0Exrjkz0dgzPpLGybFI4+pqY'
strVar += 'QnEKYN/8PNvVUBPkcHx3wwUa3wYlb776zF8Dl7jLhAQH+qKls77nMO/98VBUN6Iq'
strVar += 'kaJyiuspHtOyZzr3rf67NX7W+TqT+ItcUEb8CfYVRTz1BwPjEjJHeyDDcLfZ8H63'
strVar += 'jS7FVWkCgYEA3UaIR7ij9F2WVM7zycIJS5n4Hs8ik1QZDYB18cjoAMnYV8Wmm8X8'
strVar += '52YeAc6vX8uGqU54cNCX0N4rKRhwUh+jyQwVnVSP+YmaKg21zgHDVgT4PMt7jgfj'
strVar += 'f1c7PjpIc3KfHbS0MMSybzB2+G8mYlGrFtIy84CmdebGZWd9GG0J77UCgYEAwT0t'
strVar += '4zmOGDLhs4GtU+T4BdWe7zAohZW6IV3NfufSj3iRAC2UBStrOdSOo3se0Zw3PE0Z'
strVar += 'v23+/2PPHP5GJlzfBX5fn4Pcdk4IgRYeLnqEp9p05G0xlNKKlg/WphEc4F74DTqI'
strVar += 'f1xA9Mps46Ry+JhXV6egPMKQLkGX+yWwIiPpo5sCgYAgqaqwO5coGTB5sFrYK2ZH'
strVar += '3KB9m8HU0ZMpJQ9D844bn6/ptOlVETK1zaMcTTAiCd8E2up4bLIcSM9CL7NUzArX'
strVar += 'QItoP/VItoElOATgNe5poi4qezbvzkZMo8nA88WCFSdbsTLwB/j25MaLAY0+8iM5'
strVar += 'KSoQO6tWuAwNJ+uVUXMoCQKBgF/EERy+JlSJyt8qUhr0q5JApw6FAGALrv3gPfo5'
strVar += 'q1lc+AdtjyDsvqwfUj1kxAY/dARXdX4wZiJtdXQ588wJVKGlWoB0Werriz1mF7kT'
strVar += 'EPEay7l1ABBwMyxhVxBgBL6Rcj8kFgeAUdS/CS3cDvpyjT6snTXfepLiAQ7/Q4X3'
strVar += '5E8nAoGAPxCeVY7mJfN0sI5rQJwzwbG18t41gVzAKc3oxj7r+0wJFxaWSDEJCdeg'
strVar += 'QxS3Ae2qhKDQYRrLcqbp9uy/k+qNxvozTZtJU2Rhi8EGstckbQRKF7iAZp6Xp+hf'
strVar += '3o+j66qTHR32B7FXLOiW4LDaxVhJ5U9rtQVDsP3/X6rZz24i4TM='
strVar += '-----END RSA PRIVATE KEY-----'

// to convert the public key to pem for verification:
// openssl rsa -in id_rsa -pubout -out id_rsa.pub.pem

/*
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApwcONliJk7t7gU5+0V+2
rh8ubQ40nhj83G1kuh+7sLWRjrvgJFziUspCDVSOpyEOT7+ZOsJauCqQpV1NyaXV
ppd6FhezmizjNMJ06DU3tzD3RcKXBBIYJm3n8+jwgMvYperGAIVMMEBWPTBYy+HA
5KcxOK85JGKoPtVFD/IAtpSAudOVddNsi/Lg383Zm+Dn859kXZXI40q7o7vHhvFK
K4yI6NF3phakxIJz8ffs+ceWzPAKFyAqqcViKynRVoZS5zRNA+AJpN5aalX2tQsR
YQ8Ok0G0yLt4iBnP8KYVK53nxNKWgirXWdDxz9YnJecMH4VjS2Qxv2nouisSQ2Fh
lwIDAQAB
-----END PUBLIC KEY-----
*/

var prvKey = KEYUTIL.getKey(strVar, 'passphrase')

var sJWT = KJUR.jws.JWS.sign('RS256', sHeader, sPayload, prvKey)

console.log(sJWT)

export default () => (
  <div>JWT component</div>
)
