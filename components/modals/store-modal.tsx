'use client';

import { useState } from 'react';
import axios from 'axios'; // 👈 axios for api calls.
import { toast } from 'react-hot-toast';

import { useStoreModal } from '@/hooks/use-store-modal';
import { Modal } from '@/components/ui/modal';

import * as z from 'zod'; // 👈 zod for data validation.
import { zodResolver } from '@hookform/resolvers/zod'; // 👈 zodResolver for react-hook-form.
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// zod schema for data validation to allow only string with min length of 1 and max length of 20.
const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Store name should more than 1 character'
    })
    .max(20, {
      message: 'Store name should less than 20 character'
    })
});

export const StoreModal = () => {
  // useStoreModal is a custom hook used to manage the state of modal component.
  const storeModal = useStoreModal();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      // axios post request to create a new store.
      const response = await axios.post('/api/stores', values);
      console.log(response.data);
      window.location.assign(`${response.data.id}`);
      toast.success('Store created successfully');
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}>
      {/* The below code is children props for modal component*/}
      <div className="space-y-4 py-2 pb-4 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Create new store" {...field}></Input>
                  </FormControl>
                  {/* The FormMessage will pass the zod error message automatically */}
                  <FormMessage />
                </FormItem>
              )}></FormField>
            {/* Buttons for confirm and cancel the storeModel */}
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              {/* Cancel button will run onClose from customHook useStoreModel */}
              <Button disabled={loading} variant="outline" onClick={storeModal.onClose}>
                Cancel
              </Button>
              {/* Continue button will run submit function */}
              <Button disabled={loading} type="submit">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
