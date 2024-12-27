"use client"
import { useRouter } from "next/navigation";

export default function About() {
  const router= useRouter ();
  return (
    <div>
     <h1>About us</h1>
     <button onClick={() => router.push ("/")} className="bg-blue-500 text-white rounded-md p-2">Go Home</button>
    </div>
   
   
  
    )
}