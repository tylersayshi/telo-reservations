'use client';
import { useRouter_UNSTABLE } from 'waku';
import { Input } from './ui/input';
import { useEffect, useState } from 'react';

export const SearchInput = ({ ids }: { ids: Set<string> }) => {
  const router = useRouter_UNSTABLE();
  const receipt = router.hash.split('#')[1];

  const [search, setSearch] = useState(receipt ?? '');

  useEffect(() => {
    if (ids.has(search) && search !== receipt) {
      router.replace(`#${search}`);
    }
  }, [search]);

  return (
    <Input
      className="mx-1"
      type="text"
      placeholder="Search for receipt..."
      onChange={(e) => setSearch(e.target.value)}
      value={search}
    />
  );
};
