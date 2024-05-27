"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { isValidCPF } from "@/src/helpers/cpf";
import { updateUser } from "./actions/update-user";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";

interface Props {
  user: User;
}

const FormSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().required().email("E-mail inválido"),
  telephone: yup.string().required(),
  date_brith: yup.date().required(),
  cpf: yup.string().test("isValidCPF", "CPF inválido", function (value) {
    return isValidCPF(value);
  }),
  address: yup.string().required("Endereço é obrigatório - Preencha assim: Rua 000, casa 00 - Bairro - Cidade - Estado - CEP"),
  emergency_contact: yup.string().required(),
  work: yup.string().required(),
});

interface FormValues {
  name: string;
  email: string;
  telephone: string;
  date_brith: Date;
  cpf: string;
  address: string;
  emergency_contact: string;
  work: string;
}

const Users = ({ user }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver<any>(FormSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      telephone: user.telephone || "",
      date_brith: user.date_brith || new Date(),
      cpf: user.cpf || "",
      address: user.address || "",
      emergency_contact: user.emergency_contact || "",
      work: user.work || "",
    },
  });

  const { data } = useSession();
  if (!data) {
    return redirect("/");
  }

  if (!user?.id || (data.user && user.id !== (data?.user as any).id)) {
    return <p>User not found</p>;
  }

  const onSubmit = async (data: FormValues) => {
     await updateUser(user.id, data);
  };
  
  return (
    <>
      <form
        autoComplete="on"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 mx-4 py-4"
      >
        <div>
          <h1>Nome</h1>
          <Input
            id="name"
            placeholder=""
            {...register("name", { required: true })}
          />
          {errors.name && <span>Este campo é obrigatório.</span>}
        </div>

        <div>
          <h1>Whatsapp</h1>
          <Input
            id="telefone"
            placeholder="(85) 9 9999 - 9999"
            {...register("telephone", { required: true })}
          />
          {errors.telephone && <span>Este campo é obrigatório.</span>}
        </div>

        <div>
          <h1>Email</h1>
          <Input
            id="email"
            placeholder=""
            {...register("email", { required: true })}
          />
          {errors.email && <span>Este campo é obrigatório.</span>}
        </div>

        <div>
          <h1>Endereço</h1>
          <Input 
            id="address" 
            placeholder="Rua 000, casa 00 - Bairro - Cidade - Estado - CEP" {...register("address")} 
            //autoComplete="address-line3"
          />
          {errors.address && <span>{errors.address.message}</span>}
          <p className="text-gray-500">Preencha assim: Rua 000, casa 00 - Bairro - Cidade - Estado - CEP</p>
        </div>

        <div>
          <h1>Data de Nascimento</h1>
          <Input
            id="date_brith "
            type="date"
            placeholder=""
            {...register("date_brith", { required: true })}
          />
          {errors.date_brith  && <span>Este campo é obrigatório.</span>}
        </div>

        <div>
          <h1>Profissão</h1>
          <Input
            id="work"
            placeholder=""
            {...register("work", { required: true })}
          />
           {errors.work && <span>Este campo é obrigatório.</span>}
        </div>

        <div>
          <h1>CPF</h1>
          <Input
            id="cpf"
            placeholder="999.9999.999-99"
            {...register("cpf", { required: true })}
          />
          {errors.cpf && <span>Este campo é obrigatório.</span>}
        </div>

        <div>
          <h1>Telefone de Emergência entrar em contato com:</h1>
          <Input
            id="emergency_contact"
            {...register("emergency_contact", { required: true })} 
          />
           {errors.emergency_contact && <span>Este campo é obrigatório.</span>}
        </div>

        <Button type="submit">Enviar</Button>
      </form>
    </>
  );
};

export default Users;
