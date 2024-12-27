import { revalidatePath } from "next/cache";
import {auth, currentUser} from "@clerk/nextjs/server"


type MockUser = {
  id: number;
  name: string;

};

export default async function MockUsers (){

 const authObj = await auth()
 const userObj = await currentUser()

 console.log ({
   authObj,
   userObj,
 });

  const res = await fetch("https://676d9539df5d7dac1cc89161.mockapi.io/users");
  const users = await res.json ();

  async function addUser(formData: FormData){
    "use server"
    const name = formData.get("name")
    const res = await fetch("https://676d9539df5d7dac1cc89161.mockapi.io/users",{
      method: "POST",
      headers: {
        "content-type": "application/json",
  
      },
      body: JSON.stringify({ name }),
    }
     );
    const newUser = await res.json ();
    revalidatePath("//mock-users")
    console.log (newUser);

 

  }
  
  return (
    <div className="py-10">
      <form action={addUser}>
        <input type="text" name="name" required className="border p-2 mr-2 text-black" />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Add user</button>
      </form>
    <div className="grid grid-cols-4 gap-4 py-10">
      {users.map((user: MockUser) => (
        <div
         key={user.id}
          className="bg-white shadow-md rounded-lg text-black p-4"
          >
          {user.name}
        </div>
      ))}
    </div>
     </div>
  );
}