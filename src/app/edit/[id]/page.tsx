"use client";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import Link from "next/link";
import Menu from "@/components/menu";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
});

// todo redirect to view recipe page once the recipe is updated
// toast icon success

export default function UpdateRecipe({ params }) {
  const { id } = params;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    async function fetchData() {
      const result: any = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/recipe/${id}`
      ).then((res) => res.json());
      console.log("result", result);
    }

    fetchData();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("on submit values", values);
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/recipe/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (result.status === 500) {
        console.error("Server error");
        return;
      }

      console.log("result", result);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  return (
    <>
      <header>
        <Menu></Menu>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit {id}</Button>
          </form>
        </Form>
      </main>
    </>
  );
}
