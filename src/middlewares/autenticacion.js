import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../../config.js'
import { error } from '../utils/responses.js'

export const Autenticacion = (req, res, next) => {
  const authorization = req.get('authorization')
  let token = ''

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY)
    if (!token || !decodedToken.ID) {
      throw Error
    }
    next()
  } catch (e) {
    error(req, res, e, 401)
  }
}
