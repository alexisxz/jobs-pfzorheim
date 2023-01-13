// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Company, Job, PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const jobs = await prisma.job.findMany({ where: { status: true } })
  res.json(jobs)
}
