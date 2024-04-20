import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { FormEvent, useEffect, useState } from "react";

import { db } from "../../services/FireBase";
import { setDoc, doc, getDoc } from "firebase/firestore";

export function Networks() {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");

  useEffect(() => {
    function loadLinks() {
        const docsRef = doc(db, "social", "link")

        getDoc(docsRef)
        .then((snapshot) => {
            if(snapshot.data() !== undefined) {
                setFacebook(snapshot.data()?.facebook)
                setInstagram(snapshot.data()?.instagram)
                setYoutube(snapshot.data()?.youtube)
            }
        })
        .catch((error) => {
            console.log(error, "erro ao exibir links")
        })
    }

    loadLinks()
  }, [])

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    setDoc(doc(db, "social", "link"), {
        facebook: facebook,
        instagram: instagram,
        youtube: youtube
    })
    .then(() => {
        alert("Cadastrados com sucesso")
    })
    .catch((error) => {
        console.log(error, "erro ao salvar no banco de dados")
    })
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <h1 className="text-white text-2xl font-medium mt-8 mb-4">
        My social medias
      </h1>

      <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
        <label className="text-white font-medium mt-2 mb-2">Facebook</label>
        <Input
          type="url"
          placeholder="Type your url..."
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-2">instagram</label>
        <Input
          type="url"
          placeholder="Type your url..."
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-2">Youtube</label>
        <Input
          type="url"
          placeholder="Type your url..."
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
        />

        <button
          type="submit"
          className="text-white bg-gradient-to-r from-purple-500 to-pink-400 h-9 rounded-md items-center justify-center flex mb-7 font-medium"
        >
          Save links
        </button>
      </form>
    </div>
  );
}
