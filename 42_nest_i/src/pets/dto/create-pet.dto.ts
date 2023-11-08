export class CreatePetDto {
  _id: string;
  name: string;
  specie: string;
  adopted: boolean;
  birthDate: Date;
  image: string
}
