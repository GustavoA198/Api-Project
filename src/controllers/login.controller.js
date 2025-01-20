import jwt from 'jsonwebtoken'
import { UsuarioModel } from '../models/usuario.model.js'
import { SECRET_KEY } from '../../config.js'

export class Login {
  static async login (req, res) {
    console.log('body', req.body)
    const { Email, Contrasena } = req.body

    // Verificar si el usuario existe
    const [usuario] = await UsuarioModel.getUsuarioByEmail(Email)
    console.log(usuario)
    if (usuario === undefined || usuario.length === 0 || usuario[0].length === 0) {
      return res.status(400).json({ error: 'Invalid email' })
    } else if (Contrasena === undefined || Contrasena === null || Contrasena !== usuario[0].Contrasena) {
      return res.status(400).json({ error: 'Invalid password' })
    }

    // Generar el token JWT
    const token = jwt.sign(usuario[0], SECRET_KEY)
    res.json({ token })
  }
}
