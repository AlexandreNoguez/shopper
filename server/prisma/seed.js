import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Criação dos carros
  const plymouthValiant = await prisma.car.create({
    data: {
      brand: "Plymouth",
      model: "Valiant",
      year: 1973,
      description: "Rosa e enferrujado",
    },
  });

  const dodgeCharger = await prisma.car.create({
    data: {
      brand: "Dodge",
      model: "Charger R/T",
      year: 1970,
      description: "Modificado",
    },
  });

  const astonMartin = await prisma.car.create({
    data: {
      brand: "Aston Martin",
      model: "DB5",
      year: 1964,
      description: "Clássico",
    },
  });

  // Criação dos motoristas com o vínculo ao carro
  await prisma.driver.create({
    data: {
      name: "Homer Simpson",
      description:
        "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
      ratePerKm: 2.5,
      minKm: 1,
      carId: plymouthValiant.id, // Vincula ao carro criado
    },
  });

  await prisma.driver.create({
    data: {
      name: "Dominic Toretto",
      description:
        "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
      ratePerKm: 5.0,
      minKm: 5,
      carId: dodgeCharger.id, // Vincula ao carro criado
    },
  });

  await prisma.driver.create({
    data: {
      name: "James Bond",
      description:
        "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
      ratePerKm: 10.0,
      minKm: 10,
      carId: astonMartin.id, // Vincula ao carro criado
    },
  });

  console.log("Seed data inserted successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
