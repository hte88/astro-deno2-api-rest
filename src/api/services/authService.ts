import { hash, compare } from "https://deno.land/x/bcrypt/mod.ts";
import database from '../config/database.ts'

export class AuthService {

  static async register(email: string, password: string): Promise<boolean> {
    const existingUser = database.findUserByEmail(email)

    if (existingUser) {
      return true
    }

    const hashedPassword = await hash(password);

    await database.addUser(email, hashedPassword)

    return false
  }

  static async login(email: string, password: string):Promise<boolean> {

    const user = database.findUserByEmail(email)

    if (!user) {
      return false
    }

    const isValidPassword = await compare(password, user[2]);
    if (!isValidPassword) {
      return false
    }

    return true
  }
}
