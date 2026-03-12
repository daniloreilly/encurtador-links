import { useState, useEffect } from 'react';
import { Link } from './types/link';
import { shortenURL } from './handlers/linkHandler';
import { LinkCard } from './components/LinkCard';
import { LinkEmpty } from './components/LinkEmpty';
import logoIcon from './assets/logo.svg';
import abc from './assets/abc.svg';

function App() {
    const [links, setLinks] = useState<Link[]>(() => {
    const savedLinks = localStorage.getItem('url-links');
    return savedLinks ? JSON.parse(savedLinks) : [];
  });
  const [urlInput, setUrlInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('url-links', JSON.stringify(links));
  }, [links]);

  const handleShorten = async () => {
    const urlRegex = /^(https?:\/\/)[^\s$.?#].[^\s]*$/;

    if (!urlRegex.test(urlInput)) {
      alert("Por favor, insira uma URL válida começando com http:// ou https://");
      return;
    }

    setIsLoading(true);

    try {
      const newLink = await shortenURL(urlInput);
      setLinks((prev) => [newLink, ...prev]);
      setUrlInput("");
    } catch (err) {
      alert("Erro ao conectar com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (code: string) => {
    setLinks((prev) => prev.filter(link => link.short_url !== code));
  };

  return (
    <div className="min-h-screen bg-bottom flex flex-col items-center py-12 px-4 font-sans">
      {/* Header */}
      <div className="text-center mb-8">
        <img src={abc} alt="Logo" className="h-28 mx-auto mb-4" />
        <h1 className="text-3xl font-medium text-gray-800 mb-2">Encurtador de URL</h1>
        <p className="text-gray-500">Transforme URLs longas em links curtos</p>
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleShorten();
        }}
        className="w-full max-w-3xl bg-input rounded-full shadow-sm border-17 border-white p-2 flex items-center mb-12"
      >
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Cole seu link aqui..."
          className="flex-1 bg-transparent px-6 py-3 outline-none"
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`px-8 py-3 rounded-full font-medium transition ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {isLoading ? 'Encurtando...' : 'Encurtar'}
        </button>
      </form>

      {/* Lista Dinâmica */}
      <div className="w-full max-w-3xl space-y-4">
        {links.length === 0 ? (
          <LinkEmpty />
        ) : (
          links.map((link) => (
            <LinkCard
              key={link.short_url}
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