'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useData } from '@/app/context/DataContext';
import { Button } from '@/components/ui/button';
import { MoveLeft } from 'lucide-react';


export default function DetailsPage() {
  const params = useSearchParams();
  const router = useRouter();
  const id: string | null = params.get('id');
  const type: string | null = params.get('type');
  const { imageArr } = useData();

  return (
    <div className='p-5'>
        <Button onClick={() => router.back()}><MoveLeft/></Button>
      <p>ID: {id}</p>
      <p>Type: {type}</p>
      
    </div>
  );
}
