"use client";
import Menu from "@/components/menu";
// todo pass the param id
// todo fetch the recipe by id
// todo display the recipe
// add button edit
export default function RecipeView({ params }) {
  const { id } = params;
  return (
    <>
      <header>
        <Menu></Menu>
      </header>
      <div>
        <h1>Recipe View {id} </h1>
      </div>
    </>
  );
}
