"use client";
// import Image from "next/image";
import Menu from "@/components/menu";
export default function Home() {
  return (
    <>
      <header>
        <Menu></Menu>
      </header>
      <h1>Home</h1>
      <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
    </>
  );
}
