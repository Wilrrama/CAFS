import { useForm } from "react-hook-form";
import "./style.css";

interface CafFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCaf: (caf: ICafRegister) => void;
}

interface ICafRegister {
  caf: string;
  data: Date;
  cards: string;
  exp: string;
  lpt: string;
  volumes: string;
  dev: string;
}

export const CafForm: React.FC<CafFormProps> = ({
  isOpen,
  onClose,
  onAddCaf,
}) => {
  if (!isOpen) return null;

  const { register, handleSubmit, watch, reset } = useForm<ICafRegister>();
  const onSubmit = handleSubmit((data) => {
    const newCaf = {
      id: Date.now(), // Gera um ID único
      ...data,
      total: parseInt(data.cards) + parseInt(data.exp) + parseInt(data.lpt), // Calcula o total
      devolucoes: data.dev,
      valor: 0, // Defina a lógica de cálculo do valor aqui
      insucessos: { cards: 0, exp: 0 }, // Placeholder para insucessos
    };

    onAddCaf(newCaf);
    reset(); // Reseta o formulário após o envio
    onClose(); // Fecha o modal
  });

  // Observe os campos para calcular totais em tempo real
  const watchCards = watch("cards") || "0";
  const watchExp = watch("exp") || "0";
  const watchLpt = watch("lpt") || "0";

  // Calcular total
  const total = parseInt(watchCards) + parseInt(watchExp) + parseInt(watchLpt);

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <h1 className="modal-title">Adicionar CAF</h1>

        <form onSubmit={onSubmit} className="form__container">
          <input
            type="date"
            {...register("data")}
            placeholder="Data"
            className="full-width"
          />

          <input type="text" {...register("caf")} placeholder="nº caf" />

          <input type="number" {...register("cards")} placeholder="Cards" />

          <input type="number" {...register("exp")} placeholder="EXP" />

          <input type="number" {...register("lpt")} placeholder="LPT" />

          <div className="calculated-field full-width">
            <span>Total de Entregas: {isNaN(total) ? 0 : total}</span>
          </div>

          <input type="number" {...register("volumes")} placeholder="Volumes" />

          <input type="number" {...register("dev")} placeholder="Devoluções" />

          <div className="calculated-field full-width">
            <span>Valor: R$ 0,00</span>
          </div>

          <button type="submit" className="form__submit">
            Registrar CAF
          </button>
        </form>
      </div>
    </div>
  );
};
