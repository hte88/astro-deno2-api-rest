import type { UserAuth } from '@/models/authModel'

const dummy:UserAuth[] = [
    { email: 'olivier@gmail.com', password: '123456789' },
    { email: 'olivier1@gmail.com', password: '1' },
    { email: 'olivier2@gmail.com', password: '2' },
    { email: 'olivier3@gmail.com', password: '3' }
]

export class AuthService {
    static register(email: string, password: string):boolean {
      const existingUser = dummy.find((dummy) => dummy.email === email)
      return Boolean(existingUser)
    }
}
