import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { db } from "../../services/FireBase";
import {
  addDoc,
  collection,
  onSnapshot, // tempo real db
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";

interface LinksProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

import { FormEvent, useState, useEffect } from "react";

import { FiTrash } from "react-icons/fi";

export function Admin() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [color, setColor] = useState("");
  const [background, setBackground] = useState("");
  const [links, setLinks] = useState<LinksProps[]>([]);

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      let lista = [] as LinksProps[];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        });
      });

      setLinks(lista);
    });

    return () => {
      unsub();
    };
  }, []);

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (name === "" || url === "") {
      alert("aaaa");

      return;
    }

    addDoc(collection(db, "links"), {
      name: name,
      url: url,
      bg: background,
      color: color,
      created: new Date(),
    })
      .then(() => {
        setName("");
        setUrl("");
      })
      .catch((error) => {
        console.log(error, "error when registering in the database");
      });
  }

  async function handleDeleteLink(id: string) {
    const docRef = doc(db, "links", id);

    await deleteDoc(docRef)
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <form
        className="flex flex-col mt-8 mb-3 w-full max-w-xl"
        onSubmit={handleRegister}
      >
        <label className="text-white font-medium mt-2 mb-2">Name Link</label>
        <Input
          placeholder="Type your link...."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-2">Url Link</label>
        <Input
          type="url"
          placeholder="Type your url...."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <section className="flex my-4 gap-5">
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2">Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2">
              Background 
            </label>
            <input
              type="color"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
            />
          </div>
        </section>

        {name !== "" && (
          <div className="flex items-center justify-start flex-col mb-7 p-1 border-grey-100/25 border rounded-md">
            <label className="text-white font-medium mt-2 mb-3">Preview</label>
            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor: background,
              }}
            >
              <p className="font-medium" style={{ color: color }}>
                {name}
              </p>
            </article>
          </div>
        )}

        <button
          type="submit"
          className="mb-7 bg-gradient-to-r from-purple-500 to-pink-400 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center"
        >
          Create Link
        </button>
      </form>

      <h2 className="font-bold text-white mb-4 text-2xl">My links</h2>

      {links.map((link) => (
        <article
        key={link.id}
          className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
          style={{ backgroundColor: link.bg, color: link.color }}
        >
          <p>{link.name}</p>
          <div>
            <button onClick={ () => handleDeleteLink(link.id)} className="border border-dashed p-1 rounded">
              <FiTrash size={18} color="#fff" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
