import { useForm } from "react-hook-form";
import "./style.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";

interface CafFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCaf: (caf: ICafRegister) => void;
}

interface ICafRegister {
  caf: string;
  data: string;
  cards: string;
  exp: string;
  lpt: string;
  volumes: string;
  dev: string;
}

const cafsFormSchema = z.object({
  caf: z.string().min(1, "O número do CAF é obrigatório"),
  data: z
    .string()
    .min(1, "A data é obrigatória")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Data inválida",
    }),
  cards: z.string().min(1, "Informe a quantidade de Cards"),
  exp: z.string().min(1, "Informe a quantidade de EXP"),
  lpt: z.string().min(1, "Informe a quantidade de LPT"),
  volumes: z.string().min(1, "Informe a quantidade de Volumes"),
  dev: z.string().min(1, "Informe a quantidade de Devoluções"),
});

export const CafForm: React.FC<CafFormProps> = ({
  isOpen,
  onClose,
  onAddCaf,
}) => {
  if (!isOpen) return null;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ICafRegister>({
    resolver: zodResolver(cafsFormSchema),
  });

  const cardValue = 1.5;
  const expValue = 3.5;
  const lptValue = 0.8;

  const watchCards = watch("cards") || "0";
  const watchExp = watch("exp") || "0";
  const watchLpt = watch("lpt") || "0";

  const total = parseInt(watchCards) + parseInt(watchExp) + parseInt(watchLpt);

  const valor =
    parseInt(watchCards) * cardValue +
    parseInt(watchExp) * expValue +
    parseInt(watchLpt) * lptValue;

  const onSubmit = handleSubmit((data) => {
    const newCaf = {
      id: uuidv4(),
      ...data,
      data: new Date(data.data).toISOString().split("T")[0],
      total: parseInt(data.cards) + parseInt(data.exp) + parseInt(data.lpt),
      devolucoes: data.dev,
      valor,
    };

    onAddCaf(newCaf);
    reset();
    onClose();
  });

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <h1 className="modal-title">Adicionar CAF</h1>

        <form onSubmit={onSubmit} className="form__container">
          <input type="text" {...register("caf")} placeholder="nº caf" />
          <input type="date" {...register("data")} placeholder="Data" />
          {errors.data && (
            <p className="error-message">{errors.data.message}</p>
          )}

          <input type="number" {...register("cards")} placeholder="Cards" />
          {errors.cards && (
            <p className="error-message">{errors.cards.message}</p>
          )}

          <input type="number" {...register("exp")} placeholder="EXP" />
          {errors.exp && <p className="error-message">{errors.exp.message}</p>}

          <input type="number" {...register("lpt")} placeholder="LPT" />
          {errors.lpt && <p className="error-message">{errors.lpt.message}</p>}

          <div className="calculated-field full-width">
            <span>Total de Entregas: {isNaN(total) ? 0 : total}</span>
          </div>

          <input type="number" {...register("volumes")} placeholder="Volumes" />

          <input type="number" {...register("dev")} placeholder="Devoluções" />

          <div className="calculated-field full-width">
            <span>Valor: R$ {valor.toFixed(2)}</span>
          </div>

          <button type="submit" className="form__submit">
            Registrar CAF
          </button>
        </form>
      </div>
    </div>
  );
};
