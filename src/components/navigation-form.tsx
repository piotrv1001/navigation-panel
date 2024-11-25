"use client";

import { navigationFormSchema } from "@/schemas/navigation-form-schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NavigationItem } from "@/types/navigation-item";

type NavigationFormData = z.infer<typeof navigationFormSchema>;

type NavigationFormProps = {
  navigationItem?: NavigationItem;
  onSubmit: (data: NavigationFormData) => void;
};

export default function NavigationForm({
  navigationItem,
  onSubmit,
}: NavigationFormProps) {
  const form = useForm<NavigationFormData>({
    resolver: zodResolver(navigationFormSchema),
    defaultValues: {
      name: navigationItem?.name ?? "",
      link: navigationItem?.link ?? "",
    },
  });

  const handleSubmit = (data: NavigationFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwa</FormLabel>
              <FormControl>
                <Input placeholder="np. Promocje" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input placeholder="🔎 Wklej lub wyszukaj" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="outline">Anuluj</Button>
        <Button type="submit">Dodaj</Button>
      </form>
    </Form>
  );
}
