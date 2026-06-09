import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-hanse-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-caslon text-3xl font-bold text-ink tracking-tight">Hanse</h1>
          <p className="mt-1 text-sm text-hanse-muted font-grotesk">Consumer Intelligence Platform</p>
        </div>
        <SignIn routing="path" path="/sign-in" fallbackRedirectUrl="/dashboard" />
      </div>
    </main>
  );
}
