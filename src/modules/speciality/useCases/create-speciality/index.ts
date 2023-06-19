import { SpecialityPrismaRepository } from "../../repositories/implementations/speciality.prisma.repository";
import { CreateSpecialityController } from "./create-specality.controller";

const specialityPrismaRepository = new SpecialityPrismaRepository();
const createSpecialityController = new CreateSpecialityController(
  specialityPrismaRepository
);

export { createSpecialityController };
