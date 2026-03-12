import { useState } from 'react';
import { Link } from './types/link'; 
import { shortenURL } from './handlers/linkHandler'; 
import { LinkCard } from './components/LinkCard';  

function App() {
  const [links, setLinks] = useState<Link[]>([]);
  const [urlInput, setUrlInput] = useState<string>("");

  const handleShorten = async () => {
    const urlRegex = /^(https?:\/\/)[^\s$.?#].[^\s]*$/;
    
    if (!urlRegex.test(urlInput)) {
      alert("Por favor, insira uma URL válida começando com http:// ou https://");
      return;
    }
  
    try {
      const newLink = await shortenURL(urlInput);
      setLinks((prev) => [newLink, ...prev]);
      setUrlInput("");
    } catch (err) {
      alert("Erro ao conectar com o servidor.");
    }
  };

  const handleDelete = (code: string) => {
    setLinks((prev) => prev.filter(link => link.short_code !== code));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 font-sans">
      {/* Header omitido para brevidade */}
      
      {/* Input */}
      <div className="w-full max-w-3xl bg-white rounded-full shadow-sm border border-gray-200 p-2 flex items-center mb-12">
        <input 
          type="text" 
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Cole seu link aqui..." 
          className="flex-1 bg-transparent px-6 py-3 outline-none"
        />
        <button 
          onClick={handleShorten} 
          className="bg-indigo-600 text-white px-8 py-3 rounded-full font-medium"
        >
          Encurtar
        </button>
      </div>

      {/* Lista Dinâmica */}
      <div className="w-full max-w-3xl space-y-4">
        {links.length === 0 ? (
          <div className="text-center py-20 opacity-20">
             <p className="text-gray-400 italic">Sua lista de links aparecerá aqui...</p>
          </div>
        ) : (
          links.map((link) => (
            <LinkCard 
              key={link.short_code} 
              link={link} 
              onDelete={handleDelete} 
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;