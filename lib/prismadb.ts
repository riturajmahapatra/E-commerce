import { PrismaClient } from '@prisma/client';

// The declare keyword will declare the variables inside the object to the global Scope
declare global {
  //  the prisma variable will hold the PrismaClient instance globally
  var prisma: PrismaClient | undefined;
}

// Check if the prisma is exit globally or not
// If not then create a new instance of PrismaClient
const prismadb = globalThis.prisma || new PrismaClient();

// If we are in development mode then assign the global prisma variable to the prismadb
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prismadb;

export default prismadb;
