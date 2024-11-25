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

export type NavigationFormData = z.infer<typeof navigationFormSchema>;

type NavigationFormProps = {
  navigationItem?: NavigationItem | null;
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
    form.reset();
    onSubmit(data);
  };

  const isEdit = !!navigationItem;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
        <div className="flex items-center gap-x-2">
          <Button variant="outline">Anuluj</Button>
          <Button variant="primaryOutline" type="submit">
            {isEdit ? "Zapisz" : "Dodaj"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
