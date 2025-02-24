import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const RegisterUserSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().min(6),
  name: z.string().nonempty(),
});

export class RegisterAuthenticationDto extends createZodDto(RegisterUserSchema) {}

