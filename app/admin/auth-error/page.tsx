import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-red-600">Authentication Error</CardTitle>
          <CardDescription>There was an issue with your authentication. Please try logging in again.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p className="text-muted-foreground">
            This could be due to invalid credentials, an expired session, or insufficient permissions.
          </p>
          <Button asChild>
            <Link href="/admin/login">Go to Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
