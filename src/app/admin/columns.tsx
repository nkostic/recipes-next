"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Alert } from "@/components/alert";
// This interface is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface Recipe {
  id?: number;
  name: string;
  description?: string;
  ingredients?: string;
  instructions?: string;
  status?: string;
  image?: string;
}

async function removeItem(id: string) {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/recipe/delete/${id}`,
      {
        method: "DELETE",
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

const handleDelete = (id: string) => {
  console.log("delete", id);
  return (
    <Alert
      onCancel={() => console.log("cancel")}
      onConfirm={() => removeItem(id)}
    />
  );
};

function handleEdit(id: string) {
  console.log("edit", id);
}

function handleView(id: string) {
  console.log("view", id);
}

export const columns: ColumnDef<Recipe>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} name="Name" />
    ),
    cell: ({ row }) => {
      const formatted = `${row.getValue("name")}`;
      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu </span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleView(row.id)}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEdit(row.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(row.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
