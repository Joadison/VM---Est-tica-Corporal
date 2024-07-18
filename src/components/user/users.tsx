"use client";

import * as yup from "yup";
import { useSession } from "next-auth/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { User } from "@prisma/client";
import { updateUser } from "./actions/update-user";
import { isValidCPF } from "@/src/utils/cpf";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  user: User;
}

const FormSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().required().email("E-mail inválido"),
  telephone: yup.string().required("Telefone é obrigatório"),
  date_brith: yup.date().required("Data de Nascimento é obrigatório"),
  marital_status: yup.string().required("Estado civil é obrigatório"),
  cpf: yup.string().test("isValidCPF", "CPF inválido", function (value) {
    return isValidCPF(value);
  }),
  address: yup
    .string()
    .required(
      "Endereço é obrigatório - Preencha assim: Rua 000, casa 00 - Bairro - Cidade - Estado - CEP"
    ),
  emergency_contact: yup.string().required(),
  work: yup.string().required(),

  is_pregnant: yup.boolean(),
  has_children: yup.string(),
  long_sitting: yup.boolean(),
  surgical_history: yup.string(),
  previous_cosmetic: yup.boolean(),
  allergic_history: yup.string(),
  regular_bowel_function: yup.boolean(),
  exercise_duration: yup.string(),
  is_smoker: yup.boolean(),
  alcohol_consumption: yup.boolean(),
  balanced_diet: yup.boolean(),
  water_consumption: yup.boolean(),
  orthopedic_issues: yup.string(),
  medical_treatment: yup.string(),
  skin_acids_usage: yup.string(),
  pacemaker_present: yup.boolean(),
  metal_presence: yup.string(),
  oncologic_history: yup.string(),
  menstrual_cycle: yup.string(),
  contraceptive_method: yup.string(),
  varicose_veins: yup.boolean(),
  lesions_present: yup.boolean(),
  hypertension: yup.boolean(),
  hypotension: yup.boolean(),
  diabetes_type: yup.string(),
  epilepsy: yup.boolean(),
});

interface FormValues {
  name: string;
  email: string;
  telephone: string;
  date_brith: Date;
  marital_status: string;
  cpf: string;
  address: string;
  emergency_contact: string;
  work: string;
  is_pregnant: boolean;
  has_children: string;
  long_sitting: boolean;
  surgical_history: string;
  previous_cosmetic: boolean;
  allergic_history: string;
  regular_bowel_function: boolean;
  exercise_duration: string;
  is_smoker: boolean;
  alcohol_consumption: boolean;
  balanced_diet: boolean;
  water_consumption: boolean;
  orthopedic_issues: string;
  medical_treatment: string;
  skin_acids_usage: string;
  pacemaker_present: boolean;
  metal_presence: string;
  oncologic_history: string;
  menstrual_cycle: string;
  contraceptive_method: string;
  varicose_veins: boolean;
  lesions_present: boolean;
  hypertension: boolean;
  hypotension: boolean;
  diabetes_type: string;
  epilepsy: boolean;
}

const Users = ({ user }: Props) => {
  const { data } = useSession();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver<any>(FormSchema),
    defaultValues: {
      name: user.name || "",
      telephone: user.telephone || "",
      email: user.email || "",
      address: user.address ? user.address.split(", lat=")[0] : "",
      date_brith: user.date_brith ? new Date(user.date_brith) : undefined,
      marital_status: user.marital_status || "",
      work: user.work || "",
      cpf: user.cpf || "",
      emergency_contact: user.emergency_contact || "",

      is_pregnant: user.is_pregnant || false,
      has_children: user.has_children || "",
      long_sitting: user.long_sitting || false,
      surgical_history: user.surgical_history || "",
      previous_cosmetic: user.previous_cosmetic || false,
      allergic_history: user.allergic_history || "",
      regular_bowel_function: user.regular_bowel_function || false,
      exercise_duration: user.exercise_duration || "",
      is_smoker: user.is_smoker || false,
      alcohol_consumption: user.alcohol_consumption || false,
      balanced_diet: user.balanced_diet || false,
      water_consumption: user.water_consumption || false,
      orthopedic_issues: user.orthopedic_issues || "",
      medical_treatment: user.medical_treatment || "",
      skin_acids_usage: user.skin_acids_usage || "",
      pacemaker_present: user.pacemaker_present || false,
      metal_presence: user.metal_presence || "",
      oncologic_history: user.oncologic_history || "",
      menstrual_cycle: user.menstrual_cycle || "",
      contraceptive_method: user.contraceptive_method || "",
      varicose_veins: user.varicose_veins || false,
      lesions_present: user.lesions_present || false,
      hypertension: user.hypertension || false,
      hypotension: user.hypotension || false,
      diabetes_type: user.diabetes_type || "",
      epilepsy: user.epilepsy || false,
    },
  });

  const booleanQuestions = [
    { key: 'is_pregnant', label: 'É gestante?' },
    { key: 'long_sitting', label: 'Costuma ficar muito tempo sentada?' },
    { key: 'previous_cosmetic', label: 'Realizou tratamento estético anterior?' },
    { key: 'regular_bowel_function', label: 'Funcionamento do intestino regular?' },
    { key: 'is_smoker', label: 'É fumante?' },
    { key: 'alcohol_consumption', label: 'Ingere bebida alcoólica?' },
    { key: 'balanced_diet', label: 'Alimentação balanceada?' },
    { key: 'water_consumption', label: 'Ingere água com frequência?' },
    { key: 'pacemaker_present', label: 'Portador de marca-passo?' },
    { key: "varicose_veins", label: "Varizes?" },
    { key: "lesions_present", label: "Lesões?" },
    { key: "hypertension", label: "Hipertensão?" },
    { key: "hypotension", label: "Hipotensão?" },
    { key: "epilepsy", label: "Epilepsia?" }
  ];

  const textQuestions  = [
    {key: "has_children",label: "Tem filhos?", option: "Quantos filhos?"},
    {key: "surgical_history",label: "Possui antecedentes cirúrgicos?", option: "Qual tipo de cirurgia?"},
    {key: "allergic_history",label: "Antecedentes alérgicos?",option: "Diga ao que seria?"},
    {key: "exercise_duration",label: "Prática atividade física?",option: "Tempo praticando atividade física?"},
    {key: "orthopedic_issues",label: "Tem algum problema ortopédico?",option: "Qual é o problema ortopédico?"},
    {key: "medical_treatment",label: "Faz algum tratamento médico?",option: "Qual é o tratamento médico?"},
    {key: "skin_acids_usage",label: "Usou ou usa ácidos na pele?",option: "Para qual é o tratamento?"},
    {key: "metal_presence", label: "Presença de metais?", option: "Onde?" },
    {key: "oncologic_history",label: "Antecedentes oncológicos?",option: "Qual tipo?"},
    {key: "menstrual_cycle",label: "Você tem ciclo menstrual ?",option:"Como é seu ciclo menstrual ? (Duração do período e intensidade das cólicas)."},
    {key: "contraceptive_method",label: "Usa método anticonceptivo?",option: "Usa método anticonceptivo?"},
    { key: "diabetes_type", label: "Diabetes?", option: "Qual tipo?" }
  ];

  //const address = watch("address");
  //const [selectedPosition, setSelectedPosition] = useState<number[] | null>(null);

  const onSubmit = async (data: FormValues) => {
    await updateUser(user.id, data);
  };

  return (
    <>
      <form
        autoComplete="on"
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto p-6 rounded-lg "
      >
        <div className="my-4">
          <h1 className="block font-bold mb-2">Nome</h1>
          <Input
            id="name"
            placeholder=""
            {...register("name", { required: true })}
          />
          {errors.name && <span>Este campo é obrigatório.</span>}
        </div>

        <div className="my-4">
          <h1 className="block font-bold mb-2">Whatsapp</h1>
          <Input
            id="telefone"
            placeholder="(85) 9 9999 - 9999"
            {...register("telephone", { required: true })}
          />
          {errors.telephone && <span>Este campo é obrigatório.</span>}
        </div>

        <div className="my-4">
          <h1 className="block font-bold mb-2">Email</h1>
          <Input
            id="email"
            placeholder=""
            {...register("email", { required: true })}
          />
          {errors.email && <span>Este campo é obrigatório.</span>}
        </div>

        <div className="my-4">
          <h1 className="block font-bold mb-2">Endereço</h1>
          {/* <Map
            address={address}
            onSelectPosition={setSelectedPosition}
            setAddress={(addr: string) => setValue("address", addr)}
          /> */}
          <Input
            id="address"
            placeholder="Rua 000, casa 00 - Bairro - Cidade - Estado - CEP"
            {...register("address")}
            //autoComplete="address-line3"
          />
          {errors.address && <span>{errors.address.message}</span>}
          <p className="text-gray-500">
            Preencha assim: Rua 000, casa 00 - Bairro - Cidade - Estado - CEP
          </p>
        </div>

        <div className="my-4">
          <h1 className="block font-bold mb-2">Data de Nascimento</h1>
          <Input
            id="date_brith"
            type="date"
            placeholder=""
            {...register("date_brith")}
            value={
              watch("date_brith")
                ? format(new Date(watch("date_brith")), "yyyy-MM-dd")
                : ""
            }
          />
          {errors.date_brith && <span>Este campo é obrigatório.</span>}
        </div>

        <div className="my-4">
          <h1 className="block font-bold mb-2">Estado Civil</h1>
          <Select
            onValueChange={(value) => setValue("marital_status", value)}
            defaultValue={user.marital_status || ""}
          >
            <SelectTrigger className="w-[full]">
              <SelectValue placeholder="Escolha o seu estado civil" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Solteira">Solteira</SelectItem>
              <SelectItem value="Casada">Casada</SelectItem>
              <SelectItem value="Separada Judicialmente">
                Separada Judicialmente
              </SelectItem>
              <SelectItem value="Divorciada">Divorciada</SelectItem>
              <SelectItem value="Viúva">Viúva</SelectItem>
              <SelectItem value="União Estável">União Estável</SelectItem>
            </SelectContent>
          </Select>
          {errors.marital_status && <span>Este campo é obrigatório.</span>}
        </div>

        <div className="my-4">
          <h1 className="block font-bold mb-2">Profissão</h1>
          <Input
            id="work"
            placeholder=""
            {...register("work", { required: true })}
          />
          {errors.work && <span>Este campo é obrigatório.</span>}
        </div>

        <div className="my-4">
          <h1 className="block font-bold mb-2">CPF</h1>
          <Input
            id="cpf"
            placeholder="999.9999.999-99"
            {...register("cpf", { required: true })}
          />
          {errors.cpf && <span>Este campo é obrigatório.</span>}
        </div>

        <div className="my-4">
          <h1 className="block font-bold mb-2">Telefone de Emergência entrar em contato com:</h1>
          <Input
            id="emergency_contact"
            {...register("emergency_contact", { required: true })}
          />
          {errors.emergency_contact && <span>Este campo é obrigatório.</span>}
        </div>

        {textQuestions.map(({ key, label }) => {
          if (!(key in register)) {
            throw new Error(`Chave inválida no formulário: ${key}`);
          }
          return (
            <div key={key} className="my-4">
              <h1 className="block font-bold mb-2">{label}</h1>
              <Input id={key} {...register(key as keyof FormValues)} className="rounded-md p-2 w-full" />
              {errors[key as keyof FormValues] && <span>Este campo é obrigatório.</span>}
            </div>
          );
        })}

      {booleanQuestions.map(({ key, label }) => {
         if (!(key in register)) {
          throw new Error(`Chave inválida no formulário: ${key}`);
        }
        const isChecked = watch(key as keyof FormValues) as boolean;
        return (
          <div key={key} className="my-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register(key as keyof FormValues)}
                checked={isChecked}
                onChange={(e) => setValue(key as keyof FormValues, e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 block font-bold">{label}</span>
            </label>
          </div>
        );
      })}


        <Button type="submit">Enviar</Button>
      </form>
    </>
  );
};

export default Users;
