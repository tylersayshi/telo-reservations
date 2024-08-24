'use client';
import { useRouter_UNSTABLE } from 'waku';
import { Input } from './ui/input';

export const SearchInput = () => {
  const router = useRouter_UNSTABLE();
  const receipt = router.hash.split('#')[1];

  return (
    <Input
      type="text"
      placeholder="Search for receipt..."
      onChange={(e) => router.replace(`#${e.target.value}`)}
      value={receipt ?? ''}
    />
  );
};
