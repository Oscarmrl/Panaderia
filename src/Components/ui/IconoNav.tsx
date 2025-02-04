type Props = {
    icon: React.ElementType; // Permite cualquier icono de react-icons
    size?: string; // Para cambiar el tamaño del icono
    label: string; // Texto del span
  };
  
  export default function IconoNav({ icon: Icon, size = "w-6 h-6", label }: Props) {
    return (
      <div className="flex flex-col items-center">
        <Icon className={`${size}`} />
        <span className="btm-nav-label">{label}</span>
      </div>
    );
  }
  
