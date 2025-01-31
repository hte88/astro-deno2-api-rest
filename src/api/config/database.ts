// database.ts
import { DB } from 'https://deno.land/x/sqlite/mod.ts'

class DatabaseManager {
  private db: DB

  constructor(dbPath: string = './app.db') {
    this.db = new DB(dbPath)
    this.initializeDatabase()
  }

  private initializeDatabase() {
    this.db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )
    `)
  }

  addUser(email: string, password: string) {
    try {
      const query = `
        INSERT INTO users (email, password)
        VALUES (?, ?)
      `
      this.db.query(query, [email, password])
      return true
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur:", error)
      return false
    }
  }

  findUserByEmail(email: string) {
    const query = `SELECT * FROM users WHERE email = ?`
    const result = this.db.query(query, [email])
    return result.length > 0 ? result[0] : null
  }

  getAllUsers() {
    return this.db.query('SELECT id, email FROM users')
  }
}

const database = new DatabaseManager()
export default database
