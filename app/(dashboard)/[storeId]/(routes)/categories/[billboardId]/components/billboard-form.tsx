'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Trash } from 'lucide-react';
import { Billboard } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';

interface BillboardFormProps {
  initialData: Billboard | null;
}

/* remember to change the settings-form data to here by getting the last file  */

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1)
});

type BillboardFormValue = z.infer<typeof formSchema>;

export const BillboardForm: React.FC<BillboardFormProps> = ({ initialData }) => {
  const title = initialData ? 'Edit billboard' : 'Create billboard';
  const description = initialData ? 'Edit billboard' : 'Add a new billboard';
  const toastMessage = initialData ? 'Billboard Updated.' : 'Billboard Created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<BillboardFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: '',
      imageUrl: ''
    }
  });

  return (
    <>
      {/* <AlertModal 
      isOpen={open} 
      onClose={() => setOpen(false)}
      onConfirm={onDelete}
      loading={loading}
    /> */}
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
          /* disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)} */
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full"> */}
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Background image</FormLabel>
              <FormControl>
                {/* <ImageUpload 
                      value={field.value ? [field.value] : []} 
                      disabled={loading} 
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange('')}
                    /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="md:grid md:grid-cols-3 gap-8">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input placeholder="Billboard label" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="ml-auto" type="submit">
          {action}
        </Button>
        {/* </form> */}
      </Form>
    </>
  );
};
