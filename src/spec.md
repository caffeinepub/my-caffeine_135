# Specification

## Summary
**Goal:** Fix the blank page rendering issue in production by investigating and resolving runtime errors, component imports, routing configuration, and adding error boundaries.

**Planned changes:**
- Investigate and fix root cause of blank page by checking for runtime errors, import resolution, and DOM mounting
- Verify TanStack Router configuration with home and admin routes and QueryClientProvider wrapper
- Ensure all component imports in HomePage and AdminDashboard resolve correctly without circular dependencies
- Verify backend actor initialization doesn't block rendering and handle loading/error states properly
- Add error boundary component to catch rendering errors and display user-friendly fallback UI in Hindi and English

**User-visible outcome:** The website loads successfully with all sections visible, the admin dashboard is accessible, and if any errors occur, users see a friendly error message instead of a blank page.
