"use client";
import { useEffect, useState } from "react";
import { Recipe, columns } from "./columns";
import { DataTable } from "./data-table";
import Link from "next/link";
import Menu from "@/components/menu";

export default function RecipesPage() {
  const [data, setData] = useState<Recipe[]>([
    { id: "", name: "", status: "draft" },
  ]);

  useEffect(() => {
    async function fetchData() {
      const result: any = await fetch("http://localhost:3000/recipe/list").then(
        (res) => res.json()
      );
      console.log("result", result);
      setData(result);
    }

    fetchData();
  }, []);

  if (data === null) {
    // You can return a loading spinner or some other placeholder
    // while the data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <>
      <header>
        <Menu></Menu>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="container mx-auto py-10">
          <Link href="/new">Create New Recipe</Link>
          <DataTable columns={columns} data={data} />
        </div>
      </main>
    </>
  );
}
