'use client'
import { useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'


export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function signIn() {
    await authClient.signIn.email({
      email,
      password,
    }, {
      onSuccess: () => {
        router.push('/dashboard')
      },
      onError: (ctx) => {
        alert(ctx.error.message)
      }
    })
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="p-6 w-full max-w-sm space-y-4">
        <h1 className="text-xl font-bold">Login</h1>
        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button onClick={signIn} className="w-full">Sign In</Button>
      </Card>
    </div>
  )
}