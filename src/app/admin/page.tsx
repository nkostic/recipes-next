"use client";
import { useEffect, useState } from "react";
import { Recipe, columns } from "./columns";
import { DataTable } from "../../components/data-table";
import Link from "next/link";
import Menu from "@/components/menu";
import { Alert } from "@/components/alert";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RecipesPage() {
  const [data, setData] = useState<Recipe[]>([]);
  const [deleteAlert, setDeleteAlert] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");
  let router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  if (data === null) {
    // You can return a loading spinner or some other placeholder
    // while the data is being fetched
    return <div>Loading...</div>;
  }

  async function fetchData() {
    const result: any = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/recipe/list`
    ).then((res) => res.json());
    console.log("result", result);
    setData(result);
  }

  const deleteHandler = (id: string) => {
    setDeleteAlert(true);
    setDeleteId(id);
    console.log("deleteHandler in page", id, deleteAlert, deleteId);
  };

  const deleteRecipe = async (id: string) => {
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/recipe/remove/${id}`,
        {
          method: "DELETE",
        }
      );

      if (result.status === 500) {
        console.error("Server error");
        toast("Server error");
        return;
      }
      toast("Recipe successfully deleted.");
      console.log("result", result);
      resetDeleteLogic();
      fetchData();
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const deleteCancel = () => {
    resetDeleteLogic();
  };

  const resetDeleteLogic = () => {
    setDeleteAlert(false);
    setDeleteId("");
  };

  const viewHandler = (id: string) => {
    router.push(`/view/${id}`);
  };

  const editHandler = (id: string) => {
    router.push(`/edit/${id}`);
  };

  return (
    <>
      <header>
        <Menu></Menu>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="container mx-auto py-10">
          <Link href="/new">Create New Recipe</Link>
          <DataTable
            onView={() => viewHandler}
            onEdit={() => editHandler}
            onDelete={() => deleteHandler}
            columns={columns}
            data={data}
          />
          {deleteAlert ? (
            <Alert
              onCancel={() => deleteCancel()}
              onConfirm={() => deleteRecipe(deleteId)}
            />
          ) : null}
        </div>
      </main>
    </>
  );
}
