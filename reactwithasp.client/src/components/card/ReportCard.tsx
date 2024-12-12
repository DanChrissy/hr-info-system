import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
import { ReactNode } from 'react';
import { Button } from '../ui/button';

interface Props {
    title: string;
    description: string;
    content: ReactNode;
    onGenerate: () => void;
}
export default function ReportCard({ title, description, content, onGenerate }: Props) {
    return (
        <Card className='bg-black text-white'>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            {content}
          </CardContent>
          <CardFooter>
            <Button size={`sm`} onClick={onGenerate} variant={`secondary`} >Generate</Button>
          </CardFooter>
        </Card>
    )
}