import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createUser, findUserByEmail } from '../../../lib/users';

const registerSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(6),
});

export async function POST(request) {
  const body = await request.json();
  const parse = registerSchema.safeParse(body);

  if (!parse.success) {
    return NextResponse.json({ success: false, error: parse.error.issues }, { status: 400 });
  }

  const { name, email, password } = parse.data;

  if (findUserByEmail(email)) {
    return NextResponse.json({ success: false, error: 'Email already registered' }, { status: 409 });
  }

  createUser({ name, email, password });
  return NextResponse.json({ success: true });
}