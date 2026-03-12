import { useState } from 'react';
import type { Link } from '../types/link';
import trashIcon from '../assets/trash.svg';
import copyIcon from '../assets/copy.svg';
import logoIcon from '../assets/logo.svg';
import okIcon from '../assets/check.svg';

interface LinkCardProps {
  link: Link;
  onDelete: (code: string) => void;
}

export const LinkCard = ({ link, onDelete }: LinkCardProps) => {
  const [isCopying, setIsCopying] = useState(false);

  const handleCopy = async () => {
    if (isCopying) return;
    setIsCopying(true);
    try {
      await navigator.clipboard.writeText(`localhost:8080/${link.short_url}`);
      // Feedback por 2 segundos
      setTimeout(() => setIsCopying(false), 2000);
    } catch (err) {
      alert('Erro ao copiar link.');
      setIsCopying(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 animate-fade-in">
      <div className="bg-indigo-50 p-3 rounded-xl">
        <span className="text-indigo-600 text-xl font-bold">
          <img src={logoIcon} alt="Logo" />
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-1">
          URL Encurtada
        </p>
        <a
          href={`http://localhost:8080/${link.short_url}`}
          target="_blank"
          rel="noreferrer"
          className="text-indigo-600 font-medium block mb-4 hover:underline truncate"
        >
          {`localhost:8080/${link.short_url}`}
        </a>

        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-1">
          URL Original
        </p>
        <p className="text-gray-600 text-sm truncate">{link.original_url}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          disabled={isCopying}
          className={`p-2 rounded-lg border text-xs flex items-center gap-1 transition ${isCopying
              ? 'bg-green-50 border-green-200 text-green-600 cursor-default'
              : 'hover:bg-gray-50 border-gray-200 text-gray-700'
            }`}
        >
          <img
            src={isCopying ? okIcon : copyIcon}
            alt={isCopying ? "Copiado" : "Copiar link"}
            className="w-4 h-4"
          />
          {isCopying ? 'Copiado!' : 'Copiar'}
        </button>
        <button
          onClick={() => onDelete(link.short_url)}
          className="p-2 hover:bg-red-50 rounded-lg border border-red-100 text-red-400"
        >
          <img src={trashIcon} alt="Excluir link" />
        </button>
      </div>
    </div>
  );
};