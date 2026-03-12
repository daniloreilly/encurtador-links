import { Link } from '../types/link';
import trashIcon from '../assets/trash.svg';
import copyIcon from '../assets/copy.svg';
import logoIcon from '../assets/logo.svg';


interface LinkCardProps {
  link: Link;
  onDelete: (code: string) => void; 
}

export const LinkCard = ({ link, onDelete }: LinkCardProps) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 animate-fade-in">
      <div className="bg-indigo-50 p-3 rounded-xl">
        <span className="text-indigo-600 text-xl font-bold">
          <img src={logoIcon} alt="" />
        </span>
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-1">URL Encurtada</p>
        <a 
          href={`http://localhost:8080/${link.short_url}`} 
          target="_blank" 
          rel="noreferrer"
          className="text-indigo-600 font-medium block mb-4 hover:underline truncate"
        >
          {`localhost:8080/${link.short_url}`}
        </a>
        
        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-1">URL Original</p>
        <p className="text-gray-600 text-sm truncate">{link.original_url}</p>
      </div>

      <div className="flex gap-2">
        <button 
          className="p-2 hover:bg-gray-50 rounded-lg border border-gray-200 text-xs flex items-center gap-1"
          onClick={() => navigator.clipboard.writeText(`localhost:8080/${link.short_url}`)}
        >
          <img src= {copyIcon} alt="Copiar link" />
          Copiar
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