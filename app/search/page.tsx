import { redirect } from 'next/navigation';

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; hub?: string; type?: string };
}) {
  // Build redirect URL preserving query params
  const params = new URLSearchParams();
  if (searchParams.q) params.set('q', searchParams.q);
  if (searchParams.hub) params.set('hub', searchParams.hub);
  if (searchParams.type) params.set('type', searchParams.type);

  const redirectUrl = params.toString() ? `/?${params.toString()}` : '/';
  redirect(redirectUrl);
}
