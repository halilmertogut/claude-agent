# Project Rules

## Code Standards
- Use TypeScript strict mode
- All functions must have explicit return types
- Handle edge cases (null, undefined, empty arrays, division by zero, etc.)

## React (when applicable)
- Eliminate render waterfalls — fetch data in parallel, not sequentially
- Use React Server Components where possible
- Prefer named exports over default exports
- Use Suspense boundaries with proper fallbacks
- Avoid useEffect for data fetching — use server components or React Query

## Testing
- Write tests for all new functions
- Cover edge cases in tests

## Git
- Write clear, descriptive commit messages
- One logical change per commit
