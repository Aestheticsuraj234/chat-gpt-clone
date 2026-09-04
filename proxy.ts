import { clerkMiddleware } from '@clerk/nextjs/server';

function isPublicRoute(pathname:string)
{
  return pathname.startsWith('/sign-in')
}


export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req.nextUrl.pathname)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for Clerk's auto-proxy path
    '/__clerk/:path*',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};